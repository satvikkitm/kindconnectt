// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, AuthError, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type AuthErrorType = 
  | 'invalid_credentials'
  | 'email_not_confirmed'
  | 'weak_password'
  | 'user_exists'
  | 'network_error'
  | 'unknown_error';

interface AuthContextType {
  user: User | null;
  initialLoading: boolean;
  authLoading: boolean;
  error: AuthErrorType | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<AuthErrorType | null>(null);

  const handleAuthError = useCallback((error: AuthError): AuthErrorType => {
    console.error('Auth Error:', error.message);
    
    switch (error.message) {
      case 'Invalid login credentials':
        return 'invalid_credentials';
      case 'Email not confirmed':
        return 'email_not_confirmed';
      case 'Password should be at least 6 characters':
        return 'weak_password';
      case 'User already registered':
        return 'user_exists';
      default:
        return error.message.includes('fetch') ? 'network_error' : 'unknown_error';
    }
  }, []);

  const sessionHandler = useCallback((session: Session | null) => {
    setUser(session?.user ?? null);
    setInitialLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (isMounted) sessionHandler(session);
      } catch (error) {
        if (isMounted) setError('network_error');
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) sessionHandler(session);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [sessionHandler]);

  const signIn = useCallback(async (email: string, password: string) => {
    setAuthLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      setError(handleAuthError(err as AuthError));
      throw err;
    } finally {
      setAuthLoading(false);
    }
  }, [handleAuthError]);

  const signUp = useCallback(async (email: string, password: string) => {
    setAuthLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      return { needsConfirmation: true };
    } catch (err) {
      const errorType = handleAuthError(err as AuthError);
      setError(errorType);
      return { needsConfirmation: false };
    } finally {
      setAuthLoading(false);
    }
  }, [handleAuthError]);

  const signOut = useCallback(async () => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    } catch (err) {
      setError(handleAuthError(err as AuthError));
      throw err;
    } finally {
      setAuthLoading(false);
    }
  }, [handleAuthError]);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        initialLoading,
        authLoading,
        error,
        signIn,
        signUp,
        signOut,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const resetPassword = async (email: string) => {
  try {
    // If using Supabase
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};