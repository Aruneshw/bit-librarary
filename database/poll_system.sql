-- ═══════════════════════════════════════════
-- Poll / Voting System
-- ═══════════════════════════════════════════

-- 1. polls
CREATE TABLE IF NOT EXISTS polls (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question    TEXT NOT NULL,
  created_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date    TIMESTAMPTZ,
  multiple_choice BOOLEAN NOT NULL DEFAULT false,
  anonymous   BOOLEAN NOT NULL DEFAULT false,
  show_live_results BOOLEAN NOT NULL DEFAULT true,
  status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','closed'))
);

-- 2. poll_options
CREATE TABLE IF NOT EXISTS poll_options (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id     UUID NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  sort_order  INT NOT NULL DEFAULT 0
);

-- 3. poll_votes
CREATE TABLE IF NOT EXISTS poll_votes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id     UUID NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_id   UUID NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (poll_id, user_id, option_id)
);

-- Allow multiple votes per option per poll in multiple_choice mode (unique on poll+user only)
-- We alter the constraint for multiple_choice later in the application layer

-- Indexes
CREATE INDEX IF NOT EXISTS idx_poll_options_poll ON poll_options(poll_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_poll_votes_poll ON poll_votes(poll_id);
CREATE INDEX IF NOT EXISTS idx_poll_votes_user ON poll_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_poll_votes_option ON poll_votes(option_id);
CREATE INDEX IF NOT EXISTS idx_poll_votes_poll_user ON poll_votes(poll_id, user_id);
CREATE INDEX IF NOT EXISTS idx_polls_status ON polls(status);
CREATE INDEX IF NOT EXISTS idx_polls_created ON polls(created_at DESC);

-- RLS
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;

-- Anyone can read active polls + options
CREATE POLICY "Anyone can read polls" ON polls FOR SELECT USING (
  status = 'active' OR auth.email() IN ('aruneshownsty1@gmail.com','harishraghav489@gmail.com','admin@bitsathy.ac.in')
);
CREATE POLICY "Anyone can read poll options" ON poll_options FOR SELECT USING (true);

-- Votes: users can read all votes (for results), insert own
CREATE POLICY "Anyone can read poll votes" ON poll_votes FOR SELECT USING (true);
CREATE POLICY "Users can vote" ON poll_votes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin management
CREATE POLICY "Admin manage polls" ON polls FOR ALL USING (
  auth.email() IN ('aruneshownsty1@gmail.com','harishraghav489@gmail.com','admin@bitsathy.ac.in')
);
CREATE POLICY "Admin manage poll options" ON poll_options FOR ALL USING (
  auth.email() IN ('aruneshownsty1@gmail.com','harishraghav489@gmail.com','admin@bitsathy.ac.in')
);
CREATE POLICY "Admin manage poll votes" ON poll_votes FOR ALL USING (
  auth.email() IN ('aruneshownsty1@gmail.com','harishraghav489@gmail.com','admin@bitsathy.ac.in')
);

-- Realtime
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE polls; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE poll_options; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE poll_votes; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Function: get poll results
CREATE OR REPLACE FUNCTION get_poll_results(p_poll_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'poll_id', p_poll_id,
    'total_votes', (SELECT COUNT(*) FROM poll_votes WHERE poll_id = p_poll_id),
    'options', (
      SELECT jsonb_agg(jsonb_build_object(
        'option_id', po.id,
        'option_text', po.option_text,
        'votes', COALESCE(v.c, 0),
        'percentage', CASE WHEN (SELECT COUNT(*) FROM poll_votes WHERE poll_id = p_poll_id) > 0
          THEN ROUND((COALESCE(v.c, 0)::numeric / (SELECT COUNT(*) FROM poll_votes WHERE poll_id = p_poll_id)) * 100)
          ELSE 0 END
      ) ORDER BY po.sort_order)
      FROM poll_options po
      LEFT JOIN (SELECT option_id, COUNT(*) AS c FROM poll_votes WHERE poll_id = p_poll_id GROUP BY option_id) v ON v.option_id = po.id
      WHERE po.poll_id = p_poll_id
    ),
    'user_vote', (SELECT jsonb_agg(jsonb_build_object('option_id', option_id)) FROM poll_votes WHERE poll_id = p_poll_id AND user_id = auth.uid())
  ) INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
