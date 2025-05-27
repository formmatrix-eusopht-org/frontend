'use client';
import React, { useContext, createContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import Loading from '../components/pages/Loading';
import { doc, onSnapshot, getFirestore, deleteDoc } from 'firebase/firestore';
import { auth, initFirebase } from '../firebase-config';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { deleteUser, getAuth } from 'firebase/auth';
import { getCookie } from '@/utils/cookie';

const app = initFirebase();

export interface AuthContextType {
  user: User | null;
  emailSignIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isSubscribed: boolean;
  loading: boolean;
  isLoggingIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const checkSession = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/checksession`,
        {
          withCredentials: true,
        },
      );
      // const response = await axios.get('/api/checkSession', {
      //   withCredentials: true
      // });

      if (response.data.user && auth.currentUser) {
        console.log('Session valid, user found', response.data.user);
        setUser(auth.currentUser);
      } else if (auth.currentUser) {
        console.log('Session invalid, logging out');
        await logout();
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setSessionChecked(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const emailSignIn = async (email: string, password: string) => {
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(true);

      // const response = await axios.post('/api/login', { token }, {
      //   withCredentials: true,
      // });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        { token },
        { withCredentials: true }, // ← crucial for cookies
      );
      if (response.data.success) {
        setUser(userCredential.user);
        localStorage.setItem('userRole', JSON.stringify(response.data.role));
        // setTimeout(() => {
          router.push('/home');
        // }, 100);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
      setIsLoggingIn(false); // Always reset login state when done
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const currentSessionId = getCookie('sessionId');
      console.log('Current session ID ia:', currentSessionId);
      // if (currentSessionId) {
      //   await axios.post(
      //     '/api/logout',
      //     { sessionId: currentSessionId },
      //     {
      //       withCredentials: true,
      //     },
      //   );
      // }
      await axios.post(
        // if using rewrite: '/api/logout'
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
        { sessionId: currentSessionId },
        { withCredentials: true },
      );

      await auth.signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser && !user && !isLoggingIn) {
          setUser(firebaseUser);
        } else if (!firebaseUser && user) {
          setUser(null);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user, isLoggingIn]);

  useEffect(() => {
    if (!sessionChecked || !user?.uid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const creationTime = user.metadata?.creationTime;
    if (!creationTime) {
      setLoading(false);
      return;
    }

    const userCreationDate = new Date(creationTime);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - userCreationDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const db = getFirestore(app);
    const userRef = doc(db, 'users', user.uid);

    if (diffDays < 7) {
      setIsSubscribed(true);
      setLoading(false);
      return;
    }

    const unsubscribeSnapshot = onSnapshot(userRef, async (userDoc) => {
      try {
        if (userDoc.exists()) {
          const userData = userDoc.data();

          if (!userData.isSubscribed && diffDays >= 14) {
            await deleteDoc(userRef);
            const currentUser = getAuth().currentUser;
            if (currentUser) {
              await deleteUser(currentUser);
            }
            await logout();
            return;
          }

          setIsSubscribed(userData.isSubscribed);
          if (!userData.isSubscribed) {
            router.push('/signUp');
          }
        } else {
          setIsSubscribed(false);
          router.push('/signUp');
        }
      } catch (error) {
        console.error('Error in subscription check:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribeSnapshot();
  }, [user, sessionChecked, router]);

  if (!sessionChecked) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, emailSignIn, isSubscribed, logout, loading, isLoggingIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
