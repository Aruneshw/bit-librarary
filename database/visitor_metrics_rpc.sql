-- ═══════════════════════════════════════════
-- ARC_OS System Metrics / Visitor Count RPC
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

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
