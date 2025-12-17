import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Create a lightweight fallback client so the UI can still load
 * even when Supabase environment variables are missing. The
 * fallback mimics the minimal shape of the client used throughout
 * the app and surfaces helpful errors instead of crashing at
 * import-time.
 */
const createFallbackClient = () => {
  const errorResponse = (message: string) => ({
    data: null,
    error: { message } as any,
  });

  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => errorResponse('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'),
      signOut: async () => ({ error: null }),
      onAuthStateChange: (_callback: any) => ({
        data: { subscription: { unsubscribe: () => undefined } },
      }),
    },
    from: () => ({
      select: async () => errorResponse('Supabase is not configured.'),
      insert: async () => errorResponse('Supabase is not configured.'),
      update: async () => errorResponse('Supabase is not configured.'),
      delete: async () => errorResponse('Supabase is not configured.'),
      order: () => ({ select: async () => errorResponse('Supabase is not configured.') }),
      eq: () => ({ select: async () => errorResponse('Supabase is not configured.') }),
    }),
  } as any;
};

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : createFallbackClient();

