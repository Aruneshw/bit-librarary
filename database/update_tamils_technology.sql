-- Update Tamils and Technology subject to be visible to all departments
UPDATE subjects
SET department = ARRAY['CS', 'IT', 'AL', 'AD', 'EEE', 'ECE', 'EIE', 'ME', 'MZ', 'AG', 'BT']
WHERE id = 'a1000000-0000-0000-0000-000000000006';
