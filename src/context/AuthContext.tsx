import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ADMIN_EMAIL = import.meta.env.VITE_DEMO_ADMIN_EMAIL || 'admin@upss.edu.ng';
const DEMO_ADMIN_PASSWORD = import.meta.env.VITE_DEMO_ADMIN_PASSWORD || 'upssdemo123';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      const stored = localStorage.getItem('upss-demo-admin');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setSession({} as Session);
        } catch (err: any) {
          console.warn('Unable to parse stored admin session', err);
          localStorage.removeItem('upss-demo-admin');
        }
      }
      setLoading(false);
      return;
    }

    const hydrate = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (err: any) {
        setError(err?.message || 'Failed to restore session');
      } finally {
        setLoading(false);
      }
    };

    hydrate();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: string, nextSession: Session | null) => {
        setSession(nextSession);
        setUser(nextSession?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      if (email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
        const demoUser = {
          id: 'demo-admin',
          email,
          role: 'admin',
        } as unknown as User;
        localStorage.setItem('upss-demo-admin', JSON.stringify(demoUser));
        setUser(demoUser);
        setSession({} as Session);
        return { error: null };
      }
      return { error: { message: 'Invalid credentials. Use the demo admin login provided.' } as AuthError };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      setSession(data.session);
      setUser(data.user);
      setError(null);
      return { error: null };
    } catch (err: any) {
      setError(err?.message || 'Unable to sign in');
      return { error: err as AuthError };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      localStorage.removeItem('upss-demo-admin');
      setUser(null);
      setSession(null);
      return;
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {error && import.meta.env.DEV && (
        <div className="bg-amber-100 text-amber-900 px-4 py-2 text-sm text-center">
          {error}
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
