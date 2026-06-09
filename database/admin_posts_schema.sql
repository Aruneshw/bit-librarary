-- ═══════════════════════════════════════════
-- ARC_OS Admin Posts + Subject Stats
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════

CREATE TABLE IF NOT EXISTS admin_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT,
  body        TEXT NOT NULL,
  video_url   TEXT,
  image_url   TEXT,
  created_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active   BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE admin_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active admin posts"
  ON admin_posts FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage admin posts"
  ON admin_posts FOR ALL
  USING (auth.jwt() ->> 'email' IN (
    'aruneshownsty1@gmail.com',
    'harishraghav489@gmail.com',
    'admin@bitsathy.ac.in'
  ))
  WITH CHECK (auth.jwt() ->> 'email' IN (
    'aruneshownsty1@gmail.com',
    'harishraghav489@gmail.com',
    'admin@bitsathy.ac.in'
  ));

CREATE OR REPLACE FUNCTION get_subject_study_stats(target_subject_id UUID)
RETURNS json AS $$
BEGIN
  RETURN json_build_object(
    'studying_count', (
      SELECT COUNT(DISTINCT user_id) FROM question_views
      WHERE subject_id = target_subject_id AND viewed = true
    ),
    'recently_active', (
      SELECT COUNT(DISTINCT user_id) FROM question_views
      WHERE subject_id = target_subject_id AND viewed = true
        AND viewed_at > now() - interval '7 days'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_subject_study_stats(UUID) TO authenticated;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public' AND tablename = 'user_feedbacks'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.user_feedbacks;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public' AND tablename = 'admin_posts'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_posts;
  END IF;
END $$;
