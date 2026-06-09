-- ═══════════════════════════════════════════
-- ARC_OS Database Migration: Events Self-Healing & Realtime
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Clean up existing duplicate events, keeping only the latest one
WITH duplicates AS (
  SELECT id,
         ROW_NUMBER() OVER (
           PARTITION BY name, COALESCE(organizer, ''), COALESCE(registration_link, '') 
           ORDER BY created_at DESC, id DESC
         ) as rn
  FROM public.events
)
DELETE FROM public.events
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- 2. Create trigger function to handle duplicate inserts as updates (self-healing)
CREATE OR REPLACE FUNCTION public.handle_duplicate_events()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if an event with the same name and organizer/link already exists
  IF EXISTS (
    SELECT 1 FROM public.events 
    WHERE name = NEW.name AND (organizer = NEW.organizer OR registration_link = NEW.registration_link)
  ) THEN
    -- Update the existing event with the new details
    UPDATE public.events
    SET 
      registration_deadline = NEW.registration_deadline,
      event_dates = NEW.event_dates,
      prizes = NEW.prizes,
      registration_link = NEW.registration_link,
      status = NEW.status,
      created_at = COALESCE(NEW.created_at, now())
    WHERE name = NEW.name AND (organizer = NEW.organizer OR registration_link = NEW.registration_link);
    
    RETURN NULL; -- Skip the insert since we updated the existing one
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS trigger_handle_duplicate_events ON public.events;

-- Create the trigger
CREATE TRIGGER trigger_handle_duplicate_events
BEFORE INSERT ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.handle_duplicate_events();

-- 3. Enable Realtime for events table safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
      and schemaname = 'public' 
      and tablename = 'events'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
  END IF;
END $$;
