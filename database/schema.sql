-- ═══════════════════════════════════════════
-- ARC_OS Database Schema
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════
-- Table: profiles
-- ═══════════════════════════════════════════
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT UNIQUE NOT NULL,
  name        TEXT,
  department  TEXT CHECK (department IN ('CS','IT','AL','AD','EEE','ECE','EIE','ME','MZ','AG','BT')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ═══════════════════════════════════════════
-- Table: subjects
-- ═══════════════════════════════════════════
CREATE TABLE subjects (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department    TEXT[] NOT NULL,
  subject_name  TEXT NOT NULL,
  icon          TEXT
);

ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users read subjects"
  ON subjects FOR SELECT
  USING (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════
-- Table: questions
-- ═══════════════════════════════════════════
CREATE TABLE questions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id  UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  image_url   TEXT,
  "references" TEXT,
  notes       TEXT,
  order_index INT NOT NULL DEFAULT 0
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users read questions"
  ON questions FOR SELECT
  USING (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════
-- Table: question_views
-- ═══════════════════════════════════════════
CREATE TABLE question_views (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject_id  UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  viewed      BOOLEAN NOT NULL DEFAULT false,
  viewed_at   TIMESTAMPTZ,
  UNIQUE(user_id, question_id)
);

ALTER TABLE question_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own views"
  ON question_views FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own views"
  ON question_views FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own views"
  ON question_views FOR UPDATE
  USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════
-- Table: settings
-- ═══════════════════════════════════════════
CREATE TABLE settings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  tutorial_seen BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own settings"
  ON settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own settings"
  ON settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own settings"
  ON settings FOR UPDATE
  USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════
-- Trigger: Auto-create profile + settings on signup
-- ═══════════════════════════════════════════
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name'
  );

  INSERT INTO public.settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
