import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://kjvkbhdhzedsarmahphg.supabase.co';
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqdmtiaGRoemVkc2FybWFocGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MjQyODQsImV4cCI6MjA3NzAwMDI4NH0.xGvH6KNlXXpZf923ycQi2rIgGZag5Fy01Vv5-yjlq9M';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);