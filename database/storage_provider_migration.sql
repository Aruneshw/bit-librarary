-- ═══════════════════════════════════════════
-- ARC_OS Storage Provider Migration
-- Adds Vercel Blob storage support alongside Supabase
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- Add storage provider columns to admin_posts
ALTER TABLE admin_posts ADD COLUMN IF NOT EXISTS storage_provider TEXT;
ALTER TABLE admin_posts ADD COLUMN IF NOT EXISTS file_url TEXT;
ALTER TABLE admin_posts ADD COLUMN IF NOT EXISTS blob_path TEXT;
ALTER TABLE admin_posts ADD COLUMN IF NOT EXISTS file_size BIGINT;
ALTER TABLE admin_posts ADD COLUMN IF NOT EXISTS mime_type TEXT;

-- Create index for file management queries
CREATE INDEX IF NOT EXISTS idx_admin_posts_storage_provider ON admin_posts(storage_provider);
CREATE INDEX IF NOT EXISTS idx_admin_posts_file_url ON admin_posts(file_url);

-- Create file_metadata table for tracking files independently of posts
CREATE TABLE IF NOT EXISTS file_metadata (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id     UUID REFERENCES admin_posts(id) ON DELETE SET NULL,
  file_name   TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  storage_provider TEXT NOT NULL CHECK (storage_provider IN ('supabase', 'vercel_blob')),
  bucket      TEXT,
  blob_path   TEXT,
  file_size   BIGINT NOT NULL DEFAULT 0,
  mime_type   TEXT,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active   BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE file_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read file metadata"
  ON file_metadata FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage file metadata"
  ON file_metadata FOR ALL
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

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_file_download(file_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE file_metadata
  SET download_count = download_count + 1
  WHERE id = file_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.increment_file_download(UUID) TO authenticated;

-- Update storage stats function to include Vercel Blob tracking
CREATE OR REPLACE FUNCTION get_storage_stats()
RETURNS json AS $$
DECLARE
  result json;
  pdfs_size bigint;
  media_size bigint;
  pdfs_count bigint;
  media_count bigint;
BEGIN
  SELECT COALESCE(SUM((metadata->>'size')::bigint), 0), COUNT(*)
  INTO pdfs_size, pdfs_count
  FROM storage.objects
  WHERE bucket_id = 'pdfs';

  SELECT COALESCE(SUM((metadata->>'size')::bigint), 0), COUNT(*)
  INTO media_size, media_count
  FROM storage.objects
  WHERE bucket_id = 'media';

  SELECT json_build_object(
    'pdfs', json_build_object('size', pdfs_size, 'count', pdfs_count, 'limit', 209715200),
    'media', json_build_object('size', media_size, 'count', media_count, 'limit', 209715200),
    'totalSize', pdfs_size + media_size,
    'totalLimit', 419430400
  ) INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_storage_stats() TO anon, authenticated;
