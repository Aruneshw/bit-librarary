-- ═══════════════════════════════════════════
-- ARC_OS Admin Schema Update
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Create System Notices Table
CREATE TABLE IF NOT EXISTS system_notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE system_notices ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active notices
CREATE POLICY "Anyone can read active system notices"
  ON system_notices FOR SELECT
  USING (is_active = true);

-- Allow only the admin to insert/update/delete notices
CREATE POLICY "Admin can manage system notices"
  ON system_notices FOR ALL
  USING (auth.jwt() ->> 'email' = 'aruneshownsty1@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'aruneshownsty1@gmail.com');

-- Insert initial default notice if table is empty
INSERT INTO system_notices (message)
SELECT 'Here you will get AI based questions soon same as college question'
WHERE NOT EXISTS (SELECT 1 FROM system_notices);

-- 2. Update Profiles RLS for Admin
-- Allow admin to read all profiles
CREATE POLICY "Admin can read all profiles"
  ON profiles FOR SELECT
  USING (auth.jwt() ->> 'email' = 'aruneshownsty1@gmail.com');

-- Allow admin to delete profiles (if needed for user management)
CREATE POLICY "Admin can delete profiles"
  ON profiles FOR DELETE
  USING (auth.jwt() ->> 'email' = 'aruneshownsty1@gmail.com');

-- 3. Update Questions RLS for Admin
-- Allow admin to insert, update, and delete questions
CREATE POLICY "Admin can manage questions"
  ON questions FOR ALL
  USING (auth.jwt() ->> 'email' = 'aruneshownsty1@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'aruneshownsty1@gmail.com');

-- Note: The subjects table already allows "Authenticated users read subjects". 
-- If you need admin to add subjects, you can run:
CREATE POLICY "Admin can manage subjects"
  ON subjects FOR ALL
  USING (auth.jwt() ->> 'email' = 'aruneshownsty1@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'aruneshownsty1@gmail.com');
