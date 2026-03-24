import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';
import { getProfile, login as loginRequest, register as registerRequest, updateProfile } from '../services/auth.service.js';

const AuthContext = createContext(null);
const TOKEN_KEY = 'finely_token';

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem(TOKEN_KEY);
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const syncProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch {
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    syncProfile();
  }, [token]);

  const login = async (payload) => {
    const response = await loginRequest(payload);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  };

  const register = async (payload) => {
    const response = await registerRequest(payload);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  };

  const saveProfile = async (payload) => {
    const updatedUser = await updateProfile(payload);
    setUser(updatedUser);
    return updatedUser;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      saveProfile,
    }),
    [loading, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
