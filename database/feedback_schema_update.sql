-- ═══════════════════════════════════════════
-- ARC_OS User Feedback Schema Update
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Create the user_feedbacks table
CREATE TABLE IF NOT EXISTS user_feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE user_feedbacks ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Any authenticated user can insert their own feedback
CREATE POLICY "Users can insert own feedback"
  ON user_feedbacks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 4. Policy: Admin can read all feedback
CREATE POLICY "Admin can read all feedback"
  ON user_feedbacks FOR SELECT
  USING (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com'));

-- 5. Policy: Admin can delete feedback
CREATE POLICY "Admin can delete feedback"
  ON user_feedbacks FOR DELETE
  USING (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com'));
