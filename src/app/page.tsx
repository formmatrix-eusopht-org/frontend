'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { UserAuth } from '../Contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { emailSignIn, isLoggingIn, resetPassword } = UserAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    try {
      await resetPassword(resetEmail);
      setShowForgotModal(false);
      setResetEmail('');
    } catch (err) {
      // Error is handled in context
    }
  };

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

          <p
            className="text-sm text-gray-600 hover:underline cursor-pointer"
            onClick={() => setShowForgotModal(true)}
          >
            Forgot Password?
          </p>
        </form>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm relative text-left">
              <button
                onClick={() => setShowForgotModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                type="button"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold mb-4 text-black">Reset Password</h3>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <p className="text-sm text-gray-600">Enter your email address to receive a password reset link.</p>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black text-black"
                />
                <button type="submit" className="w-full bg-black text-white py-2 rounded hover:opacity-90">
                  Send Reset Link
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
