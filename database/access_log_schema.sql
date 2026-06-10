-- Daily Access Log for analytics graph
-- Tracks unique daily user access to power the admin analytics chart

CREATE TABLE IF NOT EXISTS user_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  access_date DATE NOT NULL DEFAULT CURRENT_DATE,
  accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, access_date)
);

CREATE INDEX IF NOT EXISTS idx_user_access_log_date ON user_access_log(access_date);
CREATE INDEX IF NOT EXISTS idx_user_access_log_user_date ON user_access_log(user_id, access_date);

-- RPC: log daily access (upsert so 1 row per user per day)
CREATE OR REPLACE FUNCTION log_daily_access(target_user_id UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO user_access_log (user_id, access_date, accessed_at)
  VALUES (target_user_id, CURRENT_DATE, NOW())
  ON CONFLICT (user_id, access_date)
  DO UPDATE SET accessed_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.log_daily_access(UUID) TO anon, authenticated;

-- RPC: get daily unique access counts for a date range
-- Returns JSON array: [{date: "2026-06-01", count: 5}, ...]
CREATE OR REPLACE FUNCTION get_daily_access_counts(
  p_start_date DATE,
  p_end_date DATE
)
RETURNS JSONB AS $$
DECLARE result JSONB;
BEGIN
  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'date', to_char(date_series.day, 'YYYY-MM-DD'),
    'count', COALESCE(daily_counts.cnt, 0),
    'dayName', to_char(date_series.day, 'Dy')
  ) ORDER BY date_series.day), '[]'::JSONB)
  INTO result
  FROM generate_series(p_start_date, p_end_date, '1 day'::INTERVAL) AS date_series(day)
  LEFT JOIN (
    SELECT access_date, COUNT(DISTINCT user_id) as cnt
    FROM user_access_log
    WHERE access_date >= p_start_date AND access_date <= p_end_date
    GROUP BY access_date
  ) daily_counts ON date_series.day = daily_counts.access_date;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_daily_access_counts(DATE, DATE) TO anon, authenticated;

-- Enable RLS
ALTER TABLE user_access_log ENABLE ROW LEVEL SECURITY;

-- Everyone can insert their own access log
CREATE POLICY "Users can insert their own access log"
  ON user_access_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only admins can read access logs
CREATE POLICY "Admins can read all access logs"
  ON user_access_log FOR SELECT
  USING (
    auth.email() IN (
      'aruneshownsty1@gmail.com',
      'harishraghav489@gmail.com',
      'admin@bitsathy.ac.in'
    )
  );
