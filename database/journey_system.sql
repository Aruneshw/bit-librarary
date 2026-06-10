-- ═══════════════════════════════════════════════════════════
-- BIT LIBRARY — Student Journey, Streak & Title Evolution
-- ═══════════════════════════════════════════════════════════

-- ── 1. JOURNEY STATS ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS journey_stats (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  total_active_days INTEGER NOT NULL DEFAULT 0,
  total_study_seconds BIGINT NOT NULL DEFAULT 0,
  total_downloads INTEGER NOT NULL DEFAULT 0,
  total_resources_viewed INTEGER NOT NULL DEFAULT 0,
  current_title TEXT,
  journey_start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  last_active_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. STUDY SESSIONS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_seconds INTEGER NOT NULL DEFAULT 0,
  session_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- ── 3. TITLE HISTORY ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS title_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  day_number INTEGER NOT NULL,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, title)
);

-- ── 4. ACHIEVEMENTS ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 5. INDEXES ────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_journey_stats_streak ON journey_stats(current_streak DESC);
CREATE INDEX IF NOT EXISTS idx_journey_stats_study ON journey_stats(total_study_seconds DESC);
CREATE INDEX IF NOT EXISTS idx_journey_stats_downloads ON journey_stats(total_downloads DESC);
CREATE INDEX IF NOT EXISTS idx_journey_stats_active_days ON journey_stats(total_active_days DESC);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_date ON study_sessions(user_id, date);
CREATE INDEX IF NOT EXISTS idx_title_history_user ON title_history(user_id, day_number);
CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(user_id, unlocked_at);

-- ── 6. ROW LEVEL SECURITY ─────────────────────────────────
ALTER TABLE journey_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE title_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Users can read own data
CREATE POLICY "users_read_own_journey_stats" ON journey_stats
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users_read_own_study_sessions" ON study_sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users_read_own_title_history" ON title_history
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users_read_own_achievements" ON achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert/update their own journey stats
CREATE POLICY "users_insert_own_journey_stats" ON journey_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_update_own_journey_stats" ON journey_stats
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "users_insert_own_study_sessions" ON study_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_update_own_study_sessions" ON study_sessions
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "users_insert_own_title_history" ON title_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_insert_own_achievements" ON achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin read access on all tables
CREATE POLICY "admin_read_all_journey" ON journey_stats
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND email LIKE '%bitsathy.ac.in')
  );
CREATE POLICY "admin_read_all_study_sessions" ON study_sessions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND email LIKE '%bitsathy.ac.in')
  );
CREATE POLICY "admin_read_all_title_history" ON title_history
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND email LIKE '%bitsathy.ac.in')
  );
CREATE POLICY "admin_read_all_achievements" ON achievements
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND email LIKE '%bitsathy.ac.in')
  );

-- Admin full access
CREATE POLICY "admin_all_journey_stats" ON journey_stats
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND email LIKE '%bitsathy.ac.in')
  );
CREATE POLICY "admin_all_study_sessions" ON study_sessions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND email LIKE '%bitsathy.ac.in')
  );
CREATE POLICY "admin_all_title_history" ON title_history
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND email LIKE '%bitsathy.ac.in')
  );
CREATE POLICY "admin_all_achievements" ON achievements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND email LIKE '%bitsathy.ac.in')
  );

-- ── 7. REALTIME PUBLICATION ───────────────────────────────
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE journey_stats;
EXCEPTION WHEN duplicate_object THEN NULL;
END;
$$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE study_sessions;
EXCEPTION WHEN duplicate_object THEN NULL;
END;
$$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE title_history;
EXCEPTION WHEN duplicate_object THEN NULL;
END;
$$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE achievements;
EXCEPTION WHEN duplicate_object THEN NULL;
END;
$$;

-- ── 8. GET TITLE FOR DAY RPC ──────────────────────────────
CREATE OR REPLACE FUNCTION get_title_for_day(p_days INTEGER)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  RETURN CASE
    WHEN p_days >= 365 THEN 'BIT Library Immortal'
    WHEN p_days >= 364 THEN 'Guardian of Wisdom'
    WHEN p_days >= 363 THEN 'Keeper of Knowledge'
    WHEN p_days >= 362 THEN 'Master of Time'
    WHEN p_days >= 361 THEN 'Digital Emperor'
    WHEN p_days >= 360 THEN 'Library Emperor'
    WHEN p_days >= 358 THEN 'Academic Emperor'
    WHEN p_days >= 356 THEN 'Knowledge Emperor'
    WHEN p_days >= 354 THEN 'Wisdom Emperor'
    WHEN p_days >= 352 THEN 'Archive Master'
    WHEN p_days >= 350 THEN 'Chronicle Keeper'
    WHEN p_days >= 345 THEN 'Eternal Legend'
    WHEN p_days >= 340 THEN 'Eternal Guardian'
    WHEN p_days >= 335 THEN 'Eternal Researcher'
    WHEN p_days >= 330 THEN 'Eternal Architect'
    WHEN p_days >= 325 THEN 'Eternal Mentor'
    WHEN p_days >= 320 THEN 'Eternal Sage'
    WHEN p_days >= 315 THEN 'Eternal Scholar'
    WHEN p_days >= 310 THEN 'Mythic Legend'
    WHEN p_days >= 305 THEN 'Mythic Guardian'
    WHEN p_days >= 300 THEN 'Mythic Researcher'
    WHEN p_days >= 295 THEN 'Mythic Architect'
    WHEN p_days >= 290 THEN 'Mythic Sage'
    WHEN p_days >= 285 THEN 'Mythic Scholar'
    WHEN p_days >= 280 THEN 'Supreme Legend'
    WHEN p_days >= 275 THEN 'Supreme Guardian'
    WHEN p_days >= 270 THEN 'Supreme Researcher'
    WHEN p_days >= 265 THEN 'Supreme Architect'
    WHEN p_days >= 260 THEN 'Supreme Mentor'
    WHEN p_days >= 255 THEN 'Supreme Sage'
    WHEN p_days >= 250 THEN 'Supreme Scholar'
    WHEN p_days >= 245 THEN 'Master of Academics'
    WHEN p_days >= 240 THEN 'Master of Research'
    WHEN p_days >= 235 THEN 'Master of Knowledge'
    WHEN p_days >= 230 THEN 'Master of Wisdom'
    WHEN p_days >= 225 THEN 'Master of Learning'
    WHEN p_days >= 220 THEN 'Digital Legend'
    WHEN p_days >= 215 THEN 'Academic Legend'
    WHEN p_days >= 210 THEN 'Wisdom Legend'
    WHEN p_days >= 205 THEN 'Knowledge Legend'
    WHEN p_days >= 200 THEN 'Library Legend'
    WHEN p_days >= 195 THEN 'Legendary Mentor'
    WHEN p_days >= 190 THEN 'Legendary Researcher'
    WHEN p_days >= 185 THEN 'Legendary Sage'
    WHEN p_days >= 180 THEN 'Legendary Scholar'
    WHEN p_days >= 175 THEN 'Wisdom Champion'
    WHEN p_days >= 170 THEN 'Academic Champion'
    WHEN p_days >= 165 THEN 'Learning Champion'
    WHEN p_days >= 160 THEN 'Knowledge Champion'
    WHEN p_days >= 155 THEN 'Grand Sage'
    WHEN p_days >= 150 THEN 'Master Scholar'
    WHEN p_days >= 145 THEN 'Elite Researcher'
    WHEN p_days >= 140 THEN 'Master Researcher'
    WHEN p_days >= 135 THEN 'Wisdom Architect'
    WHEN p_days >= 130 THEN 'Digital Sage'
    WHEN p_days >= 125 THEN 'Library Guardian'
    WHEN p_days >= 120 THEN 'Knowledge Keeper'
    WHEN p_days >= 115 THEN 'Wisdom Keeper'
    WHEN p_days >= 110 THEN 'Academic Guardian'
    WHEN p_days >= 105 THEN 'Grand Scholar'
    WHEN p_days >= 100 THEN 'Elite Scholar'
    WHEN p_days >= 95 THEN 'Knowledge Architect'
    WHEN p_days >= 90 THEN 'Architect'
    WHEN p_days >= 85 THEN 'Visionary'
    WHEN p_days >= 80 THEN 'Master Guide'
    WHEN p_days >= 75 THEN 'Guide'
    WHEN p_days >= 70 THEN 'Mentor'
    WHEN p_days >= 65 THEN 'Academic Sage'
    WHEN p_days >= 60 THEN 'Sage'
    WHEN p_days >= 55 THEN 'Problem Solver'
    WHEN p_days >= 50 THEN 'Thinker'
    WHEN p_days >= 45 THEN 'Strategist'
    WHEN p_days >= 40 THEN 'Analyst'
    WHEN p_days >= 35 THEN 'Knowledge Hunter'
    WHEN p_days >= 30 THEN 'Scholar'
    WHEN p_days >= 26 THEN 'Researcher'
    WHEN p_days >= 22 THEN 'Adventurer'
    WHEN p_days >= 18 THEN 'Scout'
    WHEN p_days >= 14 THEN 'Pathfinder'
    WHEN p_days >= 10 THEN 'Seeker'
    WHEN p_days >= 7 THEN 'Explorer'
    WHEN p_days >= 4 THEN 'Wanderer'
    WHEN p_days >= 2 THEN 'Traveller'
    ELSE 'Newcomer'
  END;
END;
$$;

-- ── 9. PROCESS HEARTBEAT RPC ──────────────────────────────
CREATE OR REPLACE FUNCTION process_journey_heartbeat(
  p_user_id UUID,
  p_seconds INTEGER
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_today DATE := CURRENT_DATE;
  v_stats journey_stats%ROWTYPE;
  v_session study_sessions%ROWTYPE;
  v_prev_active_date DATE;
  v_was_yesterday BOOLEAN;
  v_new_title TEXT;
  v_old_title TEXT;
  v_title_unlocked JSONB := NULL;
  v_result JSONB;
BEGIN
  -- Upsert journey_stats
  INSERT INTO journey_stats (user_id, current_streak, longest_streak, total_active_days, total_study_seconds, journey_start_date, last_active_date, updated_at)
  VALUES (p_user_id, 1, 1, 1, p_seconds, v_today, v_today, NOW())
  ON CONFLICT (user_id) DO UPDATE SET
    total_study_seconds = journey_stats.total_study_seconds + p_seconds,
    updated_at = NOW()
  RETURNING * INTO v_stats;

  -- If this is a new day, handle streak and active days
  IF v_stats.last_active_date IS DISTINCT FROM v_today THEN
    v_prev_active_date := v_stats.last_active_date;
    v_was_yesterday := (v_prev_active_date = v_today - INTERVAL '1 day');

    UPDATE journey_stats SET
      last_active_date = v_today,
      total_active_days = total_active_days + 1,
      current_streak = CASE
        WHEN v_was_yesterday THEN current_streak + 1
        ELSE 1
      END,
      longest_streak = CASE
        WHEN (CASE WHEN v_was_yesterday THEN current_streak + 1 ELSE 1 END) > longest_streak
        THEN (CASE WHEN v_was_yesterday THEN current_streak + 1 ELSE 1 END)
        ELSE longest_streak
      END
    WHERE user_id = p_user_id
    RETURNING * INTO v_stats;

    -- Check title unlock
    v_old_title := v_stats.current_title;
    v_new_title := get_title_for_day(v_stats.total_active_days);

    IF v_new_title IS DISTINCT FROM v_old_title THEN
      UPDATE journey_stats SET current_title = v_new_title WHERE user_id = p_user_id;

      INSERT INTO title_history (user_id, title, day_number)
      VALUES (p_user_id, v_new_title, v_stats.total_active_days)
      ON CONFLICT (user_id, title) DO NOTHING;

      INSERT INTO achievements (user_id, achievement_type, title, description, metadata)
      VALUES (
        p_user_id,
        'title_unlock',
        v_new_title,
        'Unlocked ' || v_new_title || ' on Day ' || v_stats.total_active_days,
        jsonb_build_object('day', v_stats.total_active_days, 'old_title', v_old_title, 'new_title', v_new_title)
      );

      v_title_unlocked := jsonb_build_object(
        'title', v_new_title,
        'day', v_stats.total_active_days,
        'isNew', true
      );
    END IF;
  END IF;

  -- Upsert today's study session
  INSERT INTO study_sessions (user_id, date, total_seconds, session_count)
  VALUES (p_user_id, v_today, p_seconds, 1)
  ON CONFLICT (user_id, date) DO UPDATE SET
    total_seconds = study_sessions.total_seconds + p_seconds,
    session_count = study_sessions.session_count + 1,
    updated_at = NOW()
  RETURNING * INTO v_session;

  -- Build result
  v_result := jsonb_build_object(
    'current_streak', v_stats.current_streak,
    'longest_streak', v_stats.longest_streak,
    'total_active_days', v_stats.total_active_days,
    'total_study_seconds', v_stats.total_study_seconds,
    'current_title', COALESCE(v_stats.current_title, get_title_for_day(v_stats.total_active_days)),
    'today_seconds', v_session.total_seconds,
    'title_unlocked', v_title_unlocked
  );

  RETURN v_result;
END;
$$;

-- ── 10. GET LEADERBOARD RPC ────────────────────────────────
CREATE OR REPLACE FUNCTION get_journey_leaderboard(
  p_limit INTEGER DEFAULT 20,
  p_offset INTEGER DEFAULT 0
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSONB;
BEGIN
  SELECT jsonb_agg(row_to_json(t))
  INTO v_result
  FROM (
    SELECT
      p.id,
      p.name,
      p.department,
      COALESCE(js.current_streak, 0) AS current_streak,
      COALESCE(js.longest_streak, 0) AS longest_streak,
      COALESCE(js.total_study_seconds, 0) AS total_study_seconds,
      COALESCE(js.total_active_days, 0) AS total_active_days,
      COALESCE(js.total_downloads, 0) AS total_downloads,
      COALESCE(js.current_title, get_title_for_day(COALESCE(js.total_active_days, 0))) AS title,
      COALESCE(js.total_resources_viewed, 0) AS total_resources_viewed,
      js.journey_start_date
    FROM profiles p
    LEFT JOIN journey_stats js ON js.user_id = p.id
    WHERE p.name IS NOT NULL
    ORDER BY js.total_study_seconds DESC NULLS LAST
    LIMIT p_limit
    OFFSET p_offset
  ) t;

  RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- ── 11. GET USER JOURNEY STATS RPC ──────────────────────────
CREATE OR REPLACE FUNCTION get_user_journey_stats(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_stats journey_stats%ROWTYPE;
  v_today DATE := CURRENT_DATE;
  v_session study_sessions%ROWTYPE;
  v_title_history JSONB;
  v_achievements JSONB;
  v_result JSONB;
  v_title TEXT;
  v_name TEXT;
BEGIN
  -- Get or create journey stats
  SELECT * INTO v_stats FROM journey_stats WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    v_title := get_title_for_day(0);
    INSERT INTO journey_stats (user_id, current_streak, longest_streak, total_active_days, current_title, journey_start_date)
    VALUES (p_user_id, 0, 0, 0, v_title, v_today)
    RETURNING * INTO v_stats;
  ELSE
    v_title := COALESCE(v_stats.current_title, get_title_for_day(v_stats.total_active_days));
  END IF;

  -- Get today's session
  SELECT * INTO v_session FROM study_sessions
  WHERE user_id = p_user_id AND date = v_today;

  -- Get title history
  SELECT jsonb_agg(jsonb_build_object(
    'title', th.title,
    'day_number', th.day_number,
    'unlocked_at', th.unlocked_at
  ) ORDER BY th.day_number)
  INTO v_title_history
  FROM title_history th
  WHERE th.user_id = p_user_id;

  -- Get achievements
  SELECT jsonb_agg(jsonb_build_object(
    'achievement_type', a.achievement_type,
    'title', a.title,
    'description', a.description,
    'metadata', a.metadata,
    'unlocked_at', a.unlocked_at
  ) ORDER BY a.unlocked_at DESC)
  INTO v_achievements
  FROM achievements a
  WHERE a.user_id = p_user_id;

  -- Get user name
  SELECT name INTO v_name FROM profiles WHERE id = p_user_id;

  v_result := jsonb_build_object(
    'name', v_name,
    'current_streak', v_stats.current_streak,
    'longest_streak', v_stats.longest_streak,
    'total_active_days', v_stats.total_active_days,
    'total_study_seconds', v_stats.total_study_seconds,
    'total_downloads', v_stats.total_downloads,
    'total_resources_viewed', v_stats.total_resources_viewed,
    'current_title', v_title,
    'journey_start_date', v_stats.journey_start_date,
    'last_active_date', v_stats.last_active_date,
    'today_seconds', COALESCE(v_session.total_seconds, 0),
    'today_session_count', COALESCE(v_session.session_count, 0),
    'title_history', COALESCE(v_title_history, '[]'::jsonb),
    'achievements', COALESCE(v_achievements, '[]'::jsonb)
  );

  RETURN v_result;
END;
$$;

-- ── 12. INCREMENT JOURNEY STAT RPC ──────────────────────────
CREATE OR REPLACE FUNCTION increment_journey_stat(
  p_user_id UUID,
  p_column TEXT,
  p_amount INTEGER DEFAULT 1
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE format(
    'INSERT INTO journey_stats (user_id, %I)
     VALUES ($1, $2)
     ON CONFLICT (user_id) DO UPDATE SET %I = journey_stats.%I + $2, updated_at = NOW()',
    p_column, p_column, p_column
  ) USING p_user_id, p_amount;
END;
$$;
