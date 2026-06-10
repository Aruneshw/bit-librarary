-- ═══════════════════════════════════════════
-- ARC_OS Storage Buckets Setup
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- Create storage bucket for PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('pdfs', 'pdfs', false, 104857600, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET file_size_limit = 104857600;

-- Create storage bucket for media (images)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('media', 'media', false, 104857600, ARRAY['image/jpeg', 'image/png'])
ON CONFLICT (id) DO UPDATE SET file_size_limit = 104857600;

-- Storage RLS policy for pdfs bucket
DROP POLICY IF EXISTS "Admin can upload PDFs" ON storage.objects;
CREATE POLICY "Admin can upload PDFs"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'pdfs' AND
    auth.jwt() ->> 'email' IN (
      'aruneshownsty1@gmail.com',
      'harishraghav489@gmail.com',
      'admin@bitsathy.ac.in'
    )
  );

DROP POLICY IF EXISTS "Authenticated users can read PDFs" ON storage.objects;
CREATE POLICY "Authenticated users can read PDFs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pdfs');

DROP POLICY IF EXISTS "Admin can delete PDFs" ON storage.objects;
CREATE POLICY "Admin can delete PDFs"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'pdfs' AND
    auth.jwt() ->> 'email' IN (
      'aruneshownsty1@gmail.com',
      'harishraghav489@gmail.com',
      'admin@bitsathy.ac.in'
    )
  );

-- Storage RLS policy for media bucket
DROP POLICY IF EXISTS "Admin can upload media" ON storage.objects;
CREATE POLICY "Admin can upload media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'media' AND
    auth.jwt() ->> 'email' IN (
      'aruneshownsty1@gmail.com',
      'harishraghav489@gmail.com',
      'admin@bitsathy.ac.in'
    )
  );

DROP POLICY IF EXISTS "Authenticated users can read media" ON storage.objects;
CREATE POLICY "Authenticated users can read media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Admin can delete media" ON storage.objects;
CREATE POLICY "Admin can delete media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'media' AND
    auth.jwt() ->> 'email' IN (
      'aruneshownsty1@gmail.com',
      'harishraghav489@gmail.com',
      'admin@bitsathy.ac.in'
    )
  );

-- Add app_installed column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS app_installed BOOLEAN NOT NULL DEFAULT false;

-- Function to get storage usage stats
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
    'pdfs', json_build_object('size', pdfs_size, 'count', pdfs_count, 'limit', 104857600),
    'media', json_build_object('size', media_size, 'count', media_count, 'limit', 104857600),
    'totalSize', pdfs_size + media_size,
    'totalLimit', 209715200
  ) INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_storage_stats() TO anon, authenticated;
