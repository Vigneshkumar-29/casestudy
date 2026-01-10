import { createClient } from '@supabase/supabase-js';

// Use environment variables for security - credentials should be in .env.local file
// Example .env.local:
// VITE_SUPABASE_URL=https://your-project.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key-here

// Development fallback values (for local development only)
// In production, always use environment variables
const DEV_SUPABASE_URL = 'https://qkcrnnlravoizvgmgpze.supabase.co';
const DEV_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrY3JubmxyYXZvaXp2Z21ncHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzM0NTUsImV4cCI6MjA3OTkwOTQ1NX0.KHv5KF3CWt2zlXrCCSF1Den63F-DQaRVpjEhoqRuJmc';

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