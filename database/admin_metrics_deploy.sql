-- ═══════════════════════════════════════════
-- ARC_OS Admin Metrics — full deploy bundle
-- Run once in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Login tracking column + increment RPC
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS login_count INT DEFAULT 0;

CREATE OR REPLACE FUNCTION increment_login_count(target_user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET login_count = COALESCE(login_count, 0) + 1
  WHERE id = target_user_id
    AND email NOT IN (
      'aruneshownsty1@gmail.com',
      'harishraghav489@gmail.com',
      'admin@bitsathy.ac.in'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.increment_login_count(UUID) TO anon, authenticated;

-- 2. System metrics RPC (Users Entered + System Access)
CREATE OR REPLACE FUNCTION get_system_metrics()
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'total_users', COUNT(*),
    'total_visits', COALESCE(SUM(
      CASE WHEN email NOT IN (
        'aruneshownsty1@gmail.com',
        'harishraghav489@gmail.com',
        'admin@bitsathy.ac.in'
      ) THEN login_count ELSE 0 END
    ), 0)
  ) INTO result FROM public.profiles;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_system_metrics() TO anon, authenticated;

-- 3. Realtime on profiles for live admin/dashboard updates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'profiles'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
  END IF;
END $$;
