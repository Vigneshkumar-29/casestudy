import { createClient } from '@supabase/supabase-js';

// Supabase credentials MUST be provided via environment variables.
// Add the following to your .env.local file:
//   VITE_SUPABASE_URL=https://your-project.supabase.co
//   VITE_SUPABASE_ANON_KEY=your-anon-key-here
//
// IMPORTANT: Never hardcode credentials in source code.
// Get these values from your Supabase Dashboard → Project Settings → API.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing Supabase credentials.\n\n' +
        'Please create a .env.local file in the project root with:\n' +
        '  VITE_SUPABASE_URL=https://your-project.supabase.co\n' +
        '  VITE_SUPABASE_ANON_KEY=your-anon-key-here\n\n' +
        'You can find these values in your Supabase Dashboard → Project Settings → API.'
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);