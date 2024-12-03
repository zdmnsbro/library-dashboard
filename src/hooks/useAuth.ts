import { useState, useEffect } from 'react';
import { Admin, AuthState } from '../types/auth';

const ADMIN_CREDENTIALS = {
  username: 'TBADMIN',
  password: 'website#123489' // In a real app, this would be properly hashed and stored securely
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const saved = localStorage.getItem('library-auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, isAdmin: false };
  });

  useEffect(() => {
    localStorage.setItem('library-auth', JSON.stringify(authState));
  }, [authState]);

  const login = (credentials: Admin) => {
    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      setAuthState({ isAuthenticated: true, isAdmin: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, isAdmin: false });
  };

  return { authState, login, logout };
}