'use client';

import React, { useState, Suspense } from 'react';
import { Eye, EyeOff, X, ArrowLeft } from 'lucide-react';
import { UserAuth } from '../../Contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

const ChangePasswordContent = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [error, setError] = useState('');

    const { changePassword, loading } = UserAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialEmail = searchParams.get('email') || '';
    const [email, setEmail] = useState(initialEmail);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (!email) {
            setError('Email is required.');
            return;
        }

        try {
            await changePassword(email, oldPassword, newPassword);
            router.push('/');
        } catch (err: any) {
            // Error is handled in context toast, but we can set local error too
            setError(err.message || 'Failed to change password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="max-w-md w-full space-y-6 text-center">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center text-gray-600 hover:text-black transition absolute top-8 left-8"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Login
                </button>

                <div>
                    <h1 className="text-8xl text-black">FormMatic</h1>
                    <p className="mt-2 text-gray-600 text-lg">From Data to Documents in Seconds.</p>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-6">
                    <h2 className="text-2xl font-semibold text-black">Change Password</h2>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <div className="text-left space-y-4">
                        {/* Email Field */}
                        <div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                disabled={!!initialEmail}
                                className={`w-full border-b border-gray-400 focus:outline-none py-1 text-black ${initialEmail ? 'text-gray-500 bg-transparent cursor-not-allowed' : ''}`}
                            />
                        </div>

                        {/* Old Password */}
                        <div className="relative">
                            <input
                                type={showOldPass ? 'text' : 'password'}
                                required
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full border-b border-gray-400 focus:outline-none py-1 pr-10 text-black"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 text-gray-600"
                                onClick={() => setShowOldPass((prev) => !prev)}
                            >
                                {showOldPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* New Password */}
                        <div className="relative">
                            <input
                                type={showNewPass ? 'text' : 'password'}
                                required
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full border-b border-gray-400 focus:outline-none py-1 pr-10 text-black"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 text-gray-600"
                                onClick={() => setShowNewPass((prev) => !prev)}
                            >
                                {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Confirm New Password */}
                        <div className="relative">
                            <input
                                type={showConfirmPass ? 'text' : 'password'}
                                required
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border-b border-gray-400 focus:outline-none py-1 pr-10 text-black"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 text-gray-600"
                                onClick={() => setShowConfirmPass((prev) => !prev)}
                            >
                                {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60"
                    >
                        {loading ? 'Changing Password...' : 'Change Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const ChangePasswordPage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ChangePasswordContent />
        </Suspense>
    );
};

export default ChangePasswordPage;
