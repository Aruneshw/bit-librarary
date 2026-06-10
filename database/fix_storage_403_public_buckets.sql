-- ═══════════════════════════════════════════
-- Fix 403 errors: make storage buckets public
-- Run this if files return 403 when accessed
-- ═══════════════════════════════════════════

-- Make pdfs bucket public
UPDATE storage.buckets
SET public = true, file_size_limit = 209715200
WHERE name = 'pdfs';

-- Make media bucket public
UPDATE storage.buckets
SET public = true, file_size_limit = 209715200
WHERE name = 'media';

-- Ensure public can select from objects in these buckets
DROP POLICY IF EXISTS "Anyone can read PDFs" ON storage.objects;
CREATE POLICY "Anyone can read PDFs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pdfs');

DROP POLICY IF EXISTS "Anyone can read media" ON storage.objects;
CREATE POLICY "Anyone can read media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- Service role can insert via API (no auth needed since we use service_role_key)
DROP POLICY IF EXISTS "Service role upload PDFs" ON storage.objects;
CREATE POLICY "Service role upload PDFs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'pdfs');

DROP POLICY IF EXISTS "Service role upload media" ON storage.objects;
CREATE POLICY "Service role upload media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media');

-- Verify
SELECT id, name, public, file_size_limit FROM storage.buckets WHERE name IN ('pdfs', 'media');
