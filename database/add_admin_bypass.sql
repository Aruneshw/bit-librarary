-- ═══════════════════════════════════════════
-- ARC_OS Add admin@bitsathy.ac.in Admin Policy Update
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Update system_notices table policies
DROP POLICY IF EXISTS "Admin can manage system notices" ON system_notices;
CREATE POLICY "Admin can manage system notices"
  ON system_notices FOR ALL
  USING (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'))
  WITH CHECK (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'));

-- 2. Update profiles table policies
DROP POLICY IF EXISTS "Admin can read all profiles" ON profiles;
CREATE POLICY "Admin can read all profiles"
  ON profiles FOR SELECT
  USING (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'));

DROP POLICY IF EXISTS "Admin can delete profiles" ON profiles;
CREATE POLICY "Admin can delete profiles"
  ON profiles FOR DELETE
  USING (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'));

-- 3. Update questions table policies
DROP POLICY IF EXISTS "Admin can manage questions" ON questions;
CREATE POLICY "Admin can manage questions"
  ON questions FOR ALL
  USING (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'))
  WITH CHECK (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'));

-- 4. Update subjects table policies
DROP POLICY IF EXISTS "Admin can manage subjects" ON subjects;
CREATE POLICY "Admin can manage subjects"
  ON subjects FOR ALL
  USING (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'))
  WITH CHECK (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'));

-- 5. Update user_feedbacks table policies
DROP POLICY IF EXISTS "Admin can read all feedback" ON user_feedbacks;
CREATE POLICY "Admin can read all feedback"
  ON user_feedbacks FOR SELECT
  USING (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'));

DROP POLICY IF EXISTS "Admin can delete feedback" ON user_feedbacks;
CREATE POLICY "Admin can delete feedback"
  ON user_feedbacks FOR DELETE
  USING (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'));
