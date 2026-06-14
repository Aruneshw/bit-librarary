-- ═══════════════════════════════════════════
-- Presence System Schema
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- Table: user_sessions (persistent presence tracking)
CREATE TABLE IF NOT EXISTS user_sessions (
  user_id    UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  last_seen  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_last_seen
ON user_sessions (last_seen DESC);

-- Enable Row Level Security (RLS) to prevent direct public/anon access
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- RPC: Upsert user session (heartbeat)
CREATE OR REPLACE FUNCTION upsert_user_session(p_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO user_sessions (user_id, last_seen)
  VALUES (p_user_id, NOW())
  ON CONFLICT (user_id)
  DO UPDATE SET last_seen = NOW();
END;
$$;

-- RPC: Get online user count (active within last 2 minutes)
CREATE OR REPLACE FUNCTION get_online_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count integer;
BEGIN
  SELECT COUNT(*) INTO v_count
  FROM user_sessions
  WHERE last_seen > NOW() - INTERVAL '2 minutes';
  RETURN v_count;
END;
$$;

-- RPC: Get online user IDs
CREATE OR REPLACE FUNCTION get_online_user_ids()
RETURNS TABLE (user_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT user_sessions.user_id
  FROM user_sessions
  WHERE last_seen > NOW() - INTERVAL '2 minutes';
END;
$$;

-- RPC: Mark user offline immediately (called on tab close via sendBeacon)
CREATE OR REPLACE FUNCTION mark_user_offline(p_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO user_sessions (user_id, last_seen)
  VALUES (p_user_id, NOW() - INTERVAL '10 minutes')
  ON CONFLICT (user_id)
  DO UPDATE SET last_seen = NOW() - INTERVAL '10 minutes';
END;
$$;

-- RPC: Cleanup old sessions (older than 24 hours)
CREATE OR REPLACE FUNCTION cleanup_old_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM user_sessions
  WHERE last_seen < NOW() - INTERVAL '24 hours';
END;
$$;
