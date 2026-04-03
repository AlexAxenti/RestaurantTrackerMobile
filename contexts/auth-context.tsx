import { setOnUnauthenticated } from '@/api/client';
import { AuthResponse } from '@/api/dtos/auth/auth-response';
import { User } from '@/api/models/user';
import { useLoginMutation } from '@/hooks/mutations/use-login-mutation';
import { useRegisterMutation } from '@/hooks/mutations/use-register-mutation';
import { useHealthQuery } from '@/hooks/queries/use-health-query';
import { useMeQuery } from '@/hooks/queries/use-me-query';
import { setAccessToken } from '@/services/access-token-store';
import { deleteRefreshToken, getRefreshToken, setRefreshToken } from '@/services/refresh-token-storage';
import { useMutation } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated';

interface AuthContextValue {
  status: AuthStatus;
  user: User | null;
  startupError: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  retryStartup: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:5267';
const STARTUP_TIMEOUT_MS = 30000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('initializing');
  const [user, setUser] = useState<User | null>(null);
  const [startupError, setStartupError] = useState(false);
  const isMountedRef = useRef(true);

  const { refetch: refetchMe } = useMeQuery(false);
  const { refetch: refetchHealth } = useHealthQuery(false);

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  // manual axios to avoid clients interceptor retries
  const startupRefreshMutation = useMutation({
    mutationFn: (refreshToken: string) =>
      axios
        .post<AuthResponse>(
          `${BASE_URL}/api/auth/refresh`,
          { refreshToken },
          { timeout: STARTUP_TIMEOUT_MS }
        )
        .then((r) => r.data),
  });

  useEffect(() => {
    isMountedRef.current = true;

    setOnUnauthenticated(() => {
      if (!isMountedRef.current) return;
      setUser(null);
      setStatus('unauthenticated');
    });

    void runStartup();

    return () => {
      isMountedRef.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const runStartup = async () => {
    const storedToken = await getRefreshToken();

    if (!storedToken) {
      if (isMountedRef.current) setStatus('unauthenticated');

      // wake up server in case of inactivity
      refetchHealth().catch(() => {});
      return;
    }

    if (isMountedRef.current) {
      setStatus('initializing');
      setStartupError(false);
    }

    try {
      const authData = await startupRefreshMutation.mutateAsync(storedToken);
      setAccessToken(authData.accessToken);
      await setRefreshToken(authData.refreshToken);

      await fetchAndSetUser();
    } catch (error) {
      if (!isMountedRef.current) return;

      if (isAxiosError(error) && error.response?.status === 401) {
        setAccessToken(null);
        await deleteRefreshToken();
        setStatus('unauthenticated');
      } else {
        setStartupError(true);
      }
    }
  };

  const fetchAndSetUser = async () => {
    if (isMountedRef.current) {
      setStatus('initializing');
      setStartupError(false);
    }

    const result = await refetchMe();

    if (!isMountedRef.current) return;

    if (result.status === 'success' && result.data) {
      setUser(result.data);
      setStatus('authenticated');
    } else {
      setStartupError(true);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    const data = await loginMutation.mutateAsync({ email, password });
    setAccessToken(data.accessToken);
    await setRefreshToken(data.refreshToken);
    //TODO potential error not awaiting?
    void fetchAndSetUser();
  };

  const register = async (email: string, password: string): Promise<void> => {
    const data = await registerMutation.mutateAsync({ email, password });
    setAccessToken(data.accessToken);
    await setRefreshToken(data.refreshToken);
    void fetchAndSetUser();
  };

  const logout = async (): Promise<void> => {
    setAccessToken(null);
    await deleteRefreshToken();
    setUser(null);
    setStatus('unauthenticated');
  };

  const retryStartup = () => {
    void runStartup();
  };

  return (
    <AuthContext.Provider value={{ status, user, startupError, login, register, logout, retryStartup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
