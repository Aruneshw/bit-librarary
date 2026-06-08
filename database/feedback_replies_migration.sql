-- ═══════════════════════════════════════════
-- ARC_OS User Feedback Replies Migration
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Add columns for admin replies to user_feedbacks
ALTER TABLE user_feedbacks 
ADD COLUMN IF NOT EXISTS reply TEXT,
ADD COLUMN IF NOT EXISTS replied_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS reply_read BOOLEAN DEFAULT FALSE;

-- 2. Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can read own feedback" ON user_feedbacks;
DROP POLICY IF EXISTS "Users can update own feedback" ON user_feedbacks;
DROP POLICY IF EXISTS "Admin can update feedback" ON user_feedbacks;

-- 3. Create Policy: Users can select/read their own feedbacks (and replies)
CREATE POLICY "Users can read own feedback"
  ON user_feedbacks FOR SELECT
  USING (auth.uid() = user_id);

-- 4. Create Policy: Users can update their own feedbacks (to mark as read)
CREATE POLICY "Users can update own feedback"
  ON user_feedbacks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Create Policy: Admin can update feedback to write replies
CREATE POLICY "Admin can update feedback"
  ON user_feedbacks FOR UPDATE
  USING (auth.jwt() ->> 'email' IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com'));
