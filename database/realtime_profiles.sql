-- ═══════════════════════════════════════════
-- ARC_OS Realtime: profiles table
-- Enables live admin/dashboard metric updates
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

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
