-- ═══════════════════════════════════════════════════════════
-- BIT LIBRARY — Feature Notice System
-- ═══════════════════════════════════════════════════════════

-- 1. Enhance system_notices table for feature notices
ALTER TABLE system_notices ADD COLUMN IF NOT EXISTS notice_type TEXT NOT NULL DEFAULT 'system' CHECK (notice_type IN ('system', 'feature'));
ALTER TABLE system_notices ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]';
ALTER TABLE system_notices ADD COLUMN IF NOT EXISTS duration_seconds INTEGER NOT NULL DEFAULT 5;
ALTER TABLE system_notices ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- 2. Update RLS for feature notices (anyone can read active, admin can manage all)
DROP POLICY IF EXISTS "Anyone can read active system notices" ON system_notices;
CREATE POLICY "Anyone can read active notices"
  ON system_notices FOR SELECT
  USING (is_active = true);

-- 3. Insert default feature notice if none exists
INSERT INTO system_notices (notice_type, message, features, duration_seconds, is_active)
SELECT
  'feature',
  'New Features Available',
  jsonb_build_array(
    jsonb_build_object('title', 'Study Time Tracking', 'description', 'Your active study time is now tracked automatically. Idle periods are ignored.'),
    jsonb_build_object('title', '100-Title Progression', 'description', 'Earn titles as you learn, from Traveller to BIT Library Immortal.'),
    jsonb_build_object('title', 'Streak System', 'description', 'Maintain daily streaks and track your longest learning run.'),
    jsonb_build_object('title', 'Student Journey Hub', 'description', 'View your complete journey stats, title archive, and leaderboard.'),
    jsonb_build_object('title', 'Poll Creation & Voting', 'description', 'Admins can create polls. Vote and see live results.'),
    jsonb_build_object('title', 'Dual Storage Upload', 'description', 'Choose Supabase or Vercel Blob when publishing media posts.'),
    jsonb_build_object('title', 'Analytics Dashboard', 'description', '10-slide analytics carousel with realtime charts for admins.'),
    jsonb_build_object('title', 'Download Tracking', 'description', 'File downloads are tracked for engagement analytics.')
  ),
  5,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM system_notices WHERE notice_type = 'feature' AND is_active = true
);

-- 4. Index for faster queries
CREATE INDEX IF NOT EXISTS idx_system_notices_type_active ON system_notices(notice_type, is_active);
