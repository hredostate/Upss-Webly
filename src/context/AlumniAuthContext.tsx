import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { alumniApi } from '../api/alumniApi';
import { AlumniProfile } from '../types/alumni';

interface AlumniAuthContextType {
  user: User | null;
  session: Session | null;
  profile: AlumniProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<AlumniProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AlumniAuthContext = createContext<AlumniAuthContextType | undefined>(undefined);

export function AlumniAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AlumniProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await alumniApi.getProfileByUserId(userId);
      if (!error && data) {
        setProfile(data);
      }
    } catch (err) {
      console.error('Error loading alumni profile:', err);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await loadProfile(user.id);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: string, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await alumniApi.login(email, password);
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await alumniApi.register(email, password);
    return { error };
  };

  const signOut = async () => {
    await alumniApi.logout();
    setProfile(null);
  };

  const updateProfile = async (data: Partial<AlumniProfile>) => {
    if (profile) {
      const { data: updatedProfile, error } = await alumniApi.updateProfile(profile.id, data);
      if (!error && updatedProfile) {
        setProfile(updatedProfile);
      }
    }
  };

  return (
    <AlumniAuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AlumniAuthContext.Provider>
  );
}

export const useAlumniAuth = () => {
  const context = useContext(AlumniAuthContext);
  if (!context) {
    throw new Error('useAlumniAuth must be used within AlumniAuthProvider');
  }
  return context;
};
