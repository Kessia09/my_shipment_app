'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: User & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/me`, {
          withCredentials: true
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, {
        withCredentials: true
      });
      setUser(response.data);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData: User & { password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData, {
        withCredentials: true
      });
      setUser(response.data);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/logout`, {
        withCredentials: true
      });
      setUser(null);
      router.push('/login');
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
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

export const authService = {
  async signup(userData: any) {
    const response = await axios.post(`${API_URL}/signup`, userData);
    const { token } = response.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
  },
  async login(credentials: any) {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token } = response.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
  },
  async logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }
}; 