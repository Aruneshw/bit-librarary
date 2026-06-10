-- ============================================================
-- Analytics Enhancement Migration
-- Adds device tracking, analytics indexes, and realtime
-- ============================================================

-- 1. Device tracking columns
ALTER TABLE user_access_log ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE user_access_log ADD COLUMN IF NOT EXISTS device_type TEXT;

-- 2. Updated log_daily_access with user_agent support (backward compatible)
CREATE OR REPLACE FUNCTION log_daily_access(target_user_id UUID, p_user_agent TEXT DEFAULT NULL)
RETURNS void AS $$
BEGIN
  INSERT INTO user_access_log (user_id, access_date, accessed_at, user_agent, device_type)
  VALUES (
    target_user_id,
    CURRENT_DATE,
    NOW(),
    p_user_agent,
    CASE
      WHEN p_user_agent IS NULL THEN NULL
      WHEN p_user_agent ILIKE '%android%' OR p_user_agent ILIKE '%iphone%' OR p_user_agent ILIKE '%ipod%' THEN 'mobile'
      WHEN p_user_agent ILIKE '%ipad%' OR p_user_agent ILIKE '%tablet%' OR p_user_agent ILIKE '%playbook%' OR p_user_agent ILIKE '%silk%' THEN 'tablet'
      WHEN p_user_agent ILIKE '%mobi%' OR p_user_agent ILIKE '%opera mini%' THEN 'mobile'
      ELSE 'desktop'
    END
  )
  ON CONFLICT (user_id, access_date) DO UPDATE SET
    accessed_at = NOW(),
    user_agent = CASE WHEN EXCLUDED.user_agent IS NOT NULL THEN EXCLUDED.user_agent ELSE user_access_log.user_agent END,
    device_type = CASE WHEN EXCLUDED.device_type IS NOT NULL THEN EXCLUDED.device_type ELSE user_access_log.device_type END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Analytics performance indexes
CREATE INDEX IF NOT EXISTS idx_post_views_viewed_at ON post_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_post_reactions_type ON post_reactions(reaction_type);
CREATE INDEX IF NOT EXISTS idx_file_metadata_downloads ON file_metadata(download_count DESC);
CREATE INDEX IF NOT EXISTS idx_file_metadata_provider ON file_metadata(storage_provider);
CREATE INDEX IF NOT EXISTS idx_user_access_log_device ON user_access_log(device_type);
CREATE INDEX IF NOT EXISTS idx_user_access_log_accessed_at ON user_access_log(accessed_at);
CREATE INDEX IF NOT EXISTS idx_profiles_department ON profiles(department);

-- 4. Ensure realtime is enabled for analytics tables
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE file_metadata;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE user_access_log;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 5. RLS policy for admins to read user_access_log
DROP POLICY IF EXISTS "Admins can read all access logs" ON user_access_log;
CREATE POLICY "Admins can read all access logs" ON user_access_log
  FOR SELECT
  USING (auth.email() IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'));

-- 6. RLS policy for admins to read file_metadata
DROP POLICY IF EXISTS "Admin can manage file metadata" ON file_metadata;
CREATE POLICY "Admin can manage file metadata" ON file_metadata
  FOR ALL
  USING (auth.email() IN ('aruneshownsty1@gmail.com', 'harishraghav489@gmail.com', 'admin@bitsathy.ac.in'));
