-- Create drivers table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.drivers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  service_description TEXT,
  phone_number TEXT NOT NULL,
  vehicle_photo TEXT,
  location TEXT DEFAULT 'بيوكرى',
  rating NUMERIC(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews INTEGER DEFAULT 0 CHECK (reviews >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_drivers_user_id ON public.drivers(user_id);

-- Create index on vehicle_type for filtering
CREATE INDEX IF NOT EXISTS idx_drivers_vehicle_type ON public.drivers(vehicle_type);

-- Enable Row Level Security
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read (SELECT) drivers
CREATE POLICY IF NOT EXISTS "Allow public read access to drivers"
  ON public.drivers
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert their own driver registration
CREATE POLICY IF NOT EXISTS "Allow authenticated users to insert drivers"
  ON public.drivers
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own driver profile
CREATE POLICY IF NOT EXISTS "Allow users to update their own driver profile"
  ON public.drivers
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own driver registration
CREATE POLICY IF NOT EXISTS "Allow users to delete their own driver registration"
  ON public.drivers
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_drivers_updated_at
  BEFORE UPDATE ON public.drivers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

