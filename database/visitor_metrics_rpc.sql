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
    'total_visits', COALESCE(SUM(login_count), 0)
  ) INTO result FROM public.profiles;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
