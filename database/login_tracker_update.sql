-- ═══════════════════════════════════════════
-- ARC_OS Login Tracker Schema Update
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Add login_count column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS login_count INT DEFAULT 0;

-- 2. Create RPC function to securely increment login count
-- This bypasses RLS so we can increment it securely from the server
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
