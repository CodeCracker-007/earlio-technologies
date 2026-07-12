import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if credentials are present
export const isSupabaseConfigured = !!(supabaseUrl && supabaseUrl !== 'https://your-project-id.supabase.co' && supabaseAnonKey);

// Create client or return null if not configured
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.warn(
    'Earlio Platform Notice: Supabase URL and Anon Key are missing or use default placeholders. Running in mock/local-storage fallback mode.'
  );
}
