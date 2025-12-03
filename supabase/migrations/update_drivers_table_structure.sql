-- Update drivers table to match actual structure
-- Add comments column if it doesn't exist
ALTER TABLE public.drivers 
ADD COLUMN IF NOT EXISTS comments TEXT;

-- Note: updated_at is TEXT in the actual table, not TIMESTAMP
-- If you want to keep it as TEXT, leave it as is
-- If you want to convert it to TIMESTAMP, uncomment below:
-- ALTER TABLE public.drivers 
-- ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE 
-- USING updated_at::TIMESTAMP WITH TIME ZONE;

-- Remove reviews column if it exists (it's not in the actual table structure)
-- ALTER TABLE public.drivers DROP COLUMN IF EXISTS reviews;

