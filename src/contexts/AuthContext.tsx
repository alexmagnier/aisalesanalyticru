import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
  const [initialized, setInitialized] = useState(false);

  const fetchPartner = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching partner:', error);
        setPartner(null);
      } else {
        setPartner(data);
      }
    } catch (err) {
      console.error('Exception fetching partner:', err);
      setPartner(null);
    }
  }, []);

  const checkAdminRole = useCallback(async (userId: string) => {
    try {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();
      
      setIsAdmin(!!data);
    } catch {
      setIsAdmin(false);
    }
  }, []);

  const clearAuthState = useCallback(() => {
    setUser(null);
    setSession(null);
    setPartner(null);
    setIsAdmin(false);
  }, []);

  const refreshPartner = async () => {
    if (user) {
      await fetchPartner(user.id);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Получаем начальную сессию
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (error) {
          console.error('Error getting session:', error);
          clearAuthState();
          setLoading(false);
          setInitialized(true);
          return;
        }

        if (session?.user) {
          setSession(session);
          setUser(session.user);
          await Promise.all([
            fetchPartner(session.user.id),
            checkAdminRole(session.user.id)
          ]);
        } else {
          clearAuthState();
        }
      } catch (err) {
        console.error('Exception initializing auth:', err);
        clearAuthState();
      } finally {
        if (mounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    initializeAuth();

    // Слушаем изменения авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state change:', event);

        // При выходе сразу очищаем состояние
        if (event === 'SIGNED_OUT') {
          clearAuthState();
          setLoading(false);
          return;
        }

        // При входе загружаем данные
        if (event === 'SIGNED_IN' && session?.user) {
          setSession(session);
          setUser(session.user);
          setLoading(true);
          
          try {
            await Promise.all([
              fetchPartner(session.user.id),
              checkAdminRole(session.user.id)
            ]);
          } catch (err) {
            console.error('Error loading user data:', err);
          } finally {
            setLoading(false);
          }
          return;
        }

        // Обновление токена
        if (event === 'TOKEN_REFRESHED' && session?.user) {
          setSession(session);
          setUser(session.user);
          return;
        }

        // Для других событий
        if (session?.user) {
          setSession(session);
          setUser(session.user);
        } else {
          clearAuthState();
        }
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchPartner, checkAdminRole, clearAuthState]);

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
    // Сначала очищаем локальное состояние
    clearAuthState();
    
    try {
      // Выходим с scope: 'global' чтобы очистить сессию везде
      await supabase.auth.signOut({ scope: 'global' });
    } catch (error) {
      console.error('Error signing out:', error);
    }
    
    // Очищаем localStorage от Supabase данных
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
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

