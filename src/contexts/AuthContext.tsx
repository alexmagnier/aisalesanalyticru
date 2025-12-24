import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Partner } from '@/integrations/supabase/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  partner: Partner | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, userData: Partial<Partner>) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshPartner: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPartner = async (userId: string) => {
    const { data } = await supabase
      .from('partners')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    setPartner(data);
  };

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single();
    
    setIsAdmin(!!data);
  };

  const refreshPartner = async () => {
    if (user) {
      await fetchPartner(user.id);
    }
  };

  useEffect(() => {
    // Получаем начальную сессию
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchPartner(session.user.id);
        checkAdminRole(session.user.id);
      }
      setLoading(false);
    });

    // Слушаем изменения авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchPartner(session.user.id);
          await checkAdminRole(session.user.id);
        } else {
          setPartner(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, userData: Partial<Partner>) => {
    // 1. Регистрируем пользователя
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return { error: authError as Error };
    }

    // 2. Создаём запись партнёра
    if (authData.user) {
      const { error: partnerError } = await supabase
        .from('partners')
        .insert({
          user_id: authData.user.id,
          email: email,
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          phone: userData.phone,
          telegram: userData.telegram,
          referral_code: userData.referral_code || generateReferralCode(),
          source: userData.source,
        });

      if (partnerError) {
        return { error: partnerError as unknown as Error };
      }
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setPartner(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      partner,
      isAdmin,
      loading,
      signIn,
      signUp,
      signOut,
      refreshPartner,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Генерация реферального кода
function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

