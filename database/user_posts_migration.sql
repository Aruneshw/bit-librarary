-- ═══════════════════════════════════════════
-- ARC_OS User Posts Migration
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- Allow all authenticated users to insert into admin_posts
CREATE POLICY "Users can create posts"
  ON admin_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Allow all authenticated users to update their own posts
CREATE POLICY "Users can update own posts"
  ON admin_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);
