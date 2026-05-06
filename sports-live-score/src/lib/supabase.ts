import { createClient } from '@supabase/supabase-js';

// Initialize database client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.info('[Supabase] Initializing with URL:', supabaseUrl);

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '[Supabase] Environment variables are not configured. The app will use fallback data. ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key',
  {
    auth: {
      persistSession: false,
    },
  }
);

// Test connectivity
if (supabaseUrl && supabaseKey) {
  supabase.auth
    .getSession()
    .then(() => {
      console.info('[Supabase] Connected successfully');
    })
    .catch((err) => {
      console.warn('[Supabase] Connection issue (this is expected if offline):', err.message);
    });
}

export { supabase };
