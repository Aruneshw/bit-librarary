-- ═══════════════════════════════════════════
-- ARC_OS Database Migration: Events Table
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.events (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT NOT NULL,
  organizer             TEXT,
  registration_deadline TEXT,
  event_dates           TEXT,
  prizes                TEXT,
  registration_link     TEXT,
  status                TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow any client (including anonymous visitors) to read events.
-- This ensures they automatically show up on the website.
CREATE POLICY "Allow public read access"
  ON public.events FOR SELECT
  USING (true);

-- Insert sample events matching the "AI Hackathon Tracker" Google Sheet
-- to populate the database initially.
INSERT INTO public.events (name, organizer, registration_deadline, event_dates, prizes, registration_link, status)
VALUES 
  (
    'The AI Hack', 
    'Department of Computer Science and Engineering', 
    'Jun 01, 2026', 
    'May 09 - Jun 01, 2026', 
    '5 non-cash prizes', 
    'https://the-ai-hack.devpost.com/', 
    'NEW - [2026-06-01]'
  ),
  (
    'AI Season of Code', 
    'Vertex Coding Club', 
    'Jun 01, 2026', 
    'May 30 - Jun 01, 2026', 
    '5 non-cash prizes', 
    'https://ai-season-of-code.devpost.com/', 
    'NEW - [2026-06-01]'
  ),
  (
    'NACOS x GDG AI Hackathon', 
    'Google Developer Group LMU', 
    'Jun 30, 2026', 
    'Apr 01 - Jun 30, 2026', 
    '3 non-cash prizes', 
    'https://nacos-x-gdg-ai-hackathon.devpost.com/', 
    'NEW - [2026-06-01]'
  ),
  (
    'Global AI Hackathon Series with Qwen Cloud', 
    'Alibaba Cloud', 
    'Jul 09, 2026', 
    'May 26 - Jul 09, 2026', 
    '$45,000', 
    'https://qwencloud-hackathon.devpost.com/', 
    'NEW - [2026-06-01]'
  ),
  (
    'Build the Future with AI - From Code to No-Code', 
    'Innovation Hacks', 
    'Jun 30, 2026', 
    'May 31 - Jun 30, 2026', 
    '7 non-cash prizes', 
    'https://build-the-future-with-ai.devpost.com/', 
    'NEW - [2026-06-01]'
  ),
  (
    'Google Cloud Rapid Agent Hackathon', 
    'Google', 
    'Jun 11, 2026', 
    'May 05 - Jun 11, 2026', 
    '$50,000', 
    'https://rapid-agent.devpost.com/', 
    'NEW - [2026-06-01]'
  ),
  (
    'Build with Gemini XPRIZE', 
    'XPRIZE', 
    'Aug 17, 2026', 
    'May 19 - Aug 17, 2026', 
    '$2,000,000', 
    'https://xprize.devpost.com/', 
    'NEW - [2026-06-01]'
  ),
  (
    'AI Nexus', 
    'SRM Connects', 
    'Ongoing', 
    'Ongoing', 
    'Not specified', 
    'https://unstop.com/hackathons/ai-nexus-srm-connects', 
    'NEW - [2026-06-01]'
  );
