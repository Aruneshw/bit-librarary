-- ═══════════════════════════════════════════
-- ARC_OS Update ECE, EEE, EIE Department Mappings
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Drop existing check constraints on department column of profiles table
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN
        SELECT constraint_name 
        FROM information_schema.constraint_column_usage 
        WHERE table_name = 'profiles' AND column_name = 'department'
    LOOP
        EXECUTE 'ALTER TABLE profiles DROP CONSTRAINT ' || quote_ident(r.constraint_name);
    END LOOP;
END $$;

-- 2. Re-create the check constraint with ECE included
ALTER TABLE profiles 
ADD CONSTRAINT profiles_department_check 
CHECK (department IN ('CS','IT','AL','AD','EEE','ECE','EIE','ME','MZ','AG','BT'));

-- 3. Update existing profiles: map ec to ECE, ee to EEE, ei to EIE
UPDATE profiles
SET department = 'ECE'
WHERE email ~ '\.ec[0-9]*@';

UPDATE profiles
SET department = 'EEE'
WHERE email ~ '\.ee[0-9]*@';

UPDATE profiles
SET department = 'EIE'
WHERE email ~ '\.ei[0-9]*@';

-- 4. Update the subjects table: add ECE to the department array of relevant subjects
-- Common subjects visible to everyone (including ECE)
UPDATE subjects
SET department = ARRAY['CS', 'IT', 'AL', 'AD', 'EEE', 'ECE', 'EIE', 'ME', 'MZ', 'AG', 'BT']
WHERE id IN (
  'a1000000-0000-0000-0000-000000000001', -- Engineering Mathematics II
  'a1000000-0000-0000-0000-000000000002', -- Electromagnetism and Modern Physics
  'a1000000-0000-0000-0000-000000000003', -- Engineering Chemistry II
  'a1000000-0000-0000-0000-000000000004'  -- Computational Problem Solving
);

-- Basics of Electrical Engineering: visible to CS, IT, AL, AD, ECE
UPDATE subjects
SET department = ARRAY['CS', 'IT', 'AL', 'AD', 'ECE']
WHERE id = 'a1000000-0000-0000-0000-000000000007';

-- Basics of Electronics Engineering: visible to EEE, EIE, ME, MZ, AG, BT (ECE studies BEEE instead)
UPDATE subjects
SET department = ARRAY['EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT']
WHERE id = 'a1000000-0000-0000-0000-000000000008';
