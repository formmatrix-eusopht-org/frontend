'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { UserAuth } from '../Contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { emailSignIn, isLoggingIn } = UserAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await emailSignIn(email, password);
    } catch (err: any) {
      setError('Login failed. Please check your credentials.');
      // console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div>
          <h1 className="text-8xl text-black">FormMatic</h1>
          <p className="mt-2 text-gray-600 text-lg">From Data to Documents in Seconds.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <h2 className="text-2xl font-semibold text-black">Sign In</h2>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="text-left space-y-4">
            <div>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-400 focus:outline-none py-1 text-black"
              />
            </div>

            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-400 focus:outline-none py-1 pr-10 text-black"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-600"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-black text-white py-2 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {isLoggingIn ? 'Logging In...' : 'Log In'}
          </button>

          <p className="text-sm text-gray-600 hover:underline cursor-pointer">Forgot Password?</p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
