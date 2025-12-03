-- Rename 'name' column to 'full_name' in drivers table
-- This migration is safe if the table already exists with 'name' column

DO $$
BEGIN
  -- Check if 'name' column exists and 'full_name' doesn't exist
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'drivers' 
    AND column_name = 'name'
  ) AND NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'drivers' 
    AND column_name = 'full_name'
  ) THEN
    ALTER TABLE public.drivers RENAME COLUMN name TO full_name;
  END IF;
END $$;

