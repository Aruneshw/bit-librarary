-- ═══════════════════════════════════════════
-- ARC_OS Post Views Tracking
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════

CREATE TABLE IF NOT EXISTS post_views (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id   UUID NOT NULL REFERENCES admin_posts(id) ON DELETE CASCADE,
  user_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can insert their own views
DROP POLICY IF EXISTS "Users can insert their own views" ON post_views;
CREATE POLICY "Users can insert their own views"
  ON post_views FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Anyone can read views (for counting)
DROP POLICY IF EXISTS "Anyone can read views" ON post_views;
CREATE POLICY "Anyone can read views"
  ON post_views FOR SELECT
  USING (true);

-- Add view_count column to admin_posts for fast total count
ALTER TABLE admin_posts ADD COLUMN IF NOT EXISTS view_count INTEGER NOT NULL DEFAULT 0;

-- Function to increment view count (called from API)
CREATE OR REPLACE FUNCTION increment_post_view(post_id UUID, user_id UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO post_views (post_id, user_id) VALUES (post_id, user_id)
  ON CONFLICT (post_id, user_id) DO NOTHING;

  UPDATE admin_posts
  SET view_count = (SELECT COUNT(*) FROM post_views WHERE post_id = increment_post_view.post_id)
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.increment_post_view(UUID, UUID) TO authenticated;

-- Enable realtime for post_views
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public' AND tablename = 'post_views'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.post_views;
  END IF;
END $$;
