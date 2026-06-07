-- ═══════════════════════════════════════════
-- ARC_OS Seed Data
-- Run AFTER schema.sql
-- ═══════════════════════════════════════════

-- Insert subjects with department mapping
INSERT INTO subjects (id, department, subject_name, icon) VALUES
  ('a1000000-0000-0000-0000-000000000001', ARRAY['CS','IT','AL','AD','EEE','EIE','ME','MZ','AG','BT'], 'Engineering Mathematics II', '∑'),
  ('a1000000-0000-0000-0000-000000000002', ARRAY['CS','IT','AL','AD','EEE','EIE','ME','MZ','AG','BT'], 'Electromagnetism and Modern Physics', '⚛'),
  ('a1000000-0000-0000-0000-000000000003', ARRAY['CS','IT','AL','AD','EEE','EIE','ME','MZ','AG','BT'], 'Engineering Chemistry II', '🧪'),
  ('a1000000-0000-0000-0000-000000000004', ARRAY['CS','IT','AL','AD','EEE','EIE','ME','MZ','AG','BT'], 'Computational Problem Solving', '<>'),
  ('a1000000-0000-0000-0000-000000000005', ARRAY['CS','IT','AL','AD'], 'Digital Computer Electronics', '🖥'),
  ('a1000000-0000-0000-0000-000000000006', ARRAY['CS','IT','AL','AD','AG','BT'], 'Tamils and Technology', '🏛'),
  ('a1000000-0000-0000-0000-000000000007', ARRAY[]::TEXT[], 'Basics of Electrical Engineering', '⚡'),
  ('a1000000-0000-0000-0000-000000000008', ARRAY['EEE','EIE','ME','MZ','AG','BT'], 'Basics of Electronics Engineering', '🔌');

-- ═══════════════════════════════════════════
-- Questions
-- Add your questions and answers directly via the Supabase Dashboard
-- ═══════════════════════════════════════════
