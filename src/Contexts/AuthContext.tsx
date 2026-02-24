'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, User, deleteUser, getAuth, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { doc, onSnapshot, getFirestore, deleteDoc } from 'firebase/firestore';
import { auth, initFirebase } from '../../firebase-config';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from '../Actions/cookie';
import toast from 'react-hot-toast';

initFirebase(); // Ensure Firebase is initialized once

interface AuthContextType {
  user: User | null;
  emailSignIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isSubscribed: boolean;
  loading: boolean;
  isLoggingIn: boolean;
  checkSession: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (email: string, oldPass: string, newPass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  // ✅ Session Check with Backend Cookie
  // ✅ Modify checkSession
  const checkSession = async () => {
    try {
      setLoading(true);

      // Wait until Firebase restores user
      await new Promise<void>((resolve) => {
        const unsub = onAuthStateChanged(auth, () => {
          unsub();
          resolve();
        });
      });

      // Now Firebase is ready
      const publicRoutes = ['/', '/change-password'];
      if (!auth.currentUser) {
        if (!publicRoutes.includes(window.location.pathname)) {
          await logout();
        }
        return;
      }

      // Check backend session
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/checksession`,
        { withCredentials: true }
      );

      const role = await localStorage.getItem("userRole");

      if (data.user && auth.currentUser) {
        setUser(data.userData);
        if (window.location.pathname === '/') {
          if (role == "1") router.push('/home');
          else if (role == "2") router.push('/dashboard');
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
  useEffect(() => {
    const role = localStorage.getItem("userRole") || "";

    if (role === "2") {
      // role 2 can only see dashboard, add_user, and change-password
      if (pathname !== "/dashboard" && pathname !== "/add_user" && pathname !== "/change-password") {
        router.replace("/dashboard");
      }
    } else if (role === "1") {
      // role 1 can see everything except dashboard and adduser
      if (pathname === "/dashboard" || pathname === "/add_user") {
        router.replace("/home");
      }
    } else if (role === "0" || !role) {
      // if not logged in, only allow landing page and change-password
      const publicRoutes = ['/', '/change-password'];
      if (!publicRoutes.includes(pathname)) {
        router.replace("/");
      }
    }
  }, [pathname, router]);

  // ✅ Email/Password Login
  const emailSignIn = async (email: string, password: string) => {
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const token = await userCredential.user.getIdToken(true);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        { token },
        { withCredentials: true }
      );

      if (data.success) {
        setUser(data.userData);
        localStorage.setItem('userRole', JSON.stringify(data.userData.role));
        localStorage.setItem('planExpiration', data.userData.planExpiration);
        localStorage.setItem('uid', userCredential.user.uid);
        if (data.userData.role == "1") {
          router.push('/home')
        } else {
          router.push('/dashboard')
        }
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error && (error.code === 'auth/user-disabled' || (error.response && error.response.status === 403))) {
        toast.error("Account Deactivated. Contact Admin for Help");
      }
      else {
        toast.error("Login Failed " + (error.message || ""));
      }
      throw error;
    } finally {
      setLoading(false);
      setIsLoggingIn(false);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      setLoading(true);
      const sessionId = getCookie('sessionId');

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
        { sessionId },
        { withCredentials: true }
      );
      await auth.signOut();
      setUser(null);
      localStorage.clear()
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Track Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Subscription Logic from Firestore
  useEffect(() => {
    if (!sessionChecked || !user?.uid) return;

    const creationTime = user.metadata.creationTime;
    if (!creationTime) return;

    const accountAgeInDays =
      (Date.now() - new Date(creationTime).getTime()) / (1000 * 60 * 60 * 24);

    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);

    if (accountAgeInDays < 7) {
      setIsSubscribed(true);
      return;
    }

    const unsubscribe = onSnapshot(userRef, async (docSnap) => {
      try {
        if (!docSnap.exists()) {
          setIsSubscribed(false);
          router.push('/');
          return;
        }

        const { isSubscribed } = docSnap.data();
        setIsSubscribed(isSubscribed);

        if (!isSubscribed && accountAgeInDays >= 14) {
          await deleteDoc(userRef);
          const currentUser = getAuth().currentUser;
          if (currentUser) await deleteUser(currentUser);
          await logout();
        } else if (!isSubscribed && pathname !== "/change-password") {
          router.push('/');
        }
      } catch (err) {
        console.error('Subscription check failed:', err);
      }
    });

    return () => unsubscribe();
  }, [user, sessionChecked, router]);

  // ✅ Password Reset
  const resetPassword = async (email: string) => {
    console.log("Attempting to send reset email to:", email);
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Firebase reported success for reset email.");
      toast.success('Password reset email sent! Check your inbox (and spam).');
    } catch (error: any) {
      console.error('Reset password failed:', error);
      toast.error('Failed to send reset email: ' + (error.message || ''));
      throw error;
    }
  };

  // ✅ Password Change
  const changePassword = async (email: string, oldPass: string, newPass: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, oldPass);
      await updatePassword(userCredential.user, newPass);
      await auth.signOut();
      setUser(null);
      localStorage.clear();
      toast.success('Password changed successfully! Please login with your new password.');
    } catch (error: any) {
      console.error('Change password failed:', error);
      toast.error('Failed to change password: ' + (error.message || ''));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (!sessionChecked) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, emailSignIn, logout, isSubscribed, loading, isLoggingIn, checkSession, resetPassword, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('UserAuth must be used inside AuthContextProvider');
  return context;
};
