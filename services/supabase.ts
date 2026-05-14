import { createClient } from '@supabase/supabase-js';

// Use environment variables for security - credentials should be in .env.local file
// Example .env.local:
// VITE_SUPABASE_URL=https://your-project.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key-here

// Development fallback values (for local development only)
// In production, always use environment variables
const DEV_SUPABASE_URL = 'https://uuajupocsfqjhekdsnwz.supabase.co';
const DEV_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1YWp1cG9jc2Zxamhla2Rzbnd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NjY4ODMsImV4cCI6MjA5NDM0Mjg4M30.swTKxn-jJ88fJKnj26OltG4Hogzse-oEAotlhHRCQ4w';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEV_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEV_SUPABASE_ANON_KEY;

// Note: In production, ensure environment variables are set
if (!import.meta.env.VITE_SUPABASE_URL && import.meta.env.PROD) {
    console.warn(
        'Supabase credentials not found in environment variables. ' +
        'Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.'
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);