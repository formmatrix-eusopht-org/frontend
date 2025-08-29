'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from '../Actions/cookie';

interface User {
  _id: string;
  name: string;
  email: string;
  role: number;
  plan: string;
  planExpiration: string;
}

interface AuthContextType {
  user: User | null;
  emailSignIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isLoggingIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Session Check with Backend Cookie
  const checkSession = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/checksession`,
        { withCredentials: true }
      );

      if (data.user) {
        setUser(data.user);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("planExpiration", data.user.planExpiration);
        localStorage.setItem("uid", data.user._id);

        // Redirect if user is at `/`
        if (window.location.pathname === '/') {
          if (data.user.role === 1) {
            router.push('/home');
          } else {
            router.push('/dashboard');
          }
        }
      } else {
        await logout();
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setSessionChecked(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // ✅ Role-based navigation
  useEffect(() => {
    const role = localStorage.getItem("userRole") || "";

    if (role === "0") {
      if (pathname !== "/dashboard" && pathname !== "/add_user") {
        router.replace("/dashboard");
      }
    } else if (role === "1") {
      if (pathname === "/dashboard" || pathname === "/add_user") {
        router.replace("/home");
      }
    } else if (role === "") {
      if (pathname !== "/") {
        router.replace("/");
      }
    }
  }, [pathname, router]);

  // ✅ Email/Password Login (MongoDB API)
  const emailSignIn = async (email: string, password: string) => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        setUser(data.userData);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('trialExpires', data.userData.trialExpires);
        localStorage.setItem('uid', data.userData._id);

        if (data.role === 1) {
          router.push('/home');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
      setIsLoggingIn(false);
    }
  };

  // ✅ Logout (MongoDB API)
  const logout = async () => {
    try {
      setLoading(true);
      const sessionId = getCookie('sessionId');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
        { sessionId },
        { withCredentials: true }
      );
      setUser(null);
      localStorage.clear();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!sessionChecked) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, emailSignIn, logout, loading, isLoggingIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('UserAuth must be used inside AuthContextProvider');
  return context;
};
