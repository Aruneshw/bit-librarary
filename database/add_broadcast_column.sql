-- 1. Add is_broadcast column to user_feedbacks
ALTER TABLE user_feedbacks 
ADD COLUMN IF NOT EXISTS is_broadcast BOOLEAN DEFAULT FALSE;

-- 2. Drop existing SELECT policy
DROP POLICY IF EXISTS "Users can read own feedback" ON user_feedbacks;

-- 3. Create updated SELECT policy allowing users to read their own feedback OR any broadcasted feedback
CREATE POLICY "Users can read own feedback"
  ON user_feedbacks FOR SELECT
  USING (auth.uid() = user_id OR is_broadcast = true);
