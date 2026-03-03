'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowLeft, Settings as SettingsIcon, Lock } from 'lucide-react';
import { UserAuth } from '../../Contexts/AuthContext';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [error, setError] = useState('');

    const { user, changePassword, loading } = UserAuth();
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!user && !loading) {
            router.push('/');
        }
    }, [user, loading, router]);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (!user?.email) {
            setError('Email not found. Please log in again.');
            return;
        }

        try {
            await changePassword(user.email, oldPassword, newPassword);
            // changePassword handles logout and redirect in context if successful
        } catch (err: any) {
            setError(err.message || 'Failed to change password');
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-4">

            <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <SettingsIcon size={32} />
                        Settings
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar/Tabs - Placeholder for future settings */}
                    <div className="space-y-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl font-medium shadow-sm text-blue-600">
                            <Lock size={20} />
                            Security
                        </button>
                        {/* More settings can go here */}
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Lock size={20} className="text-gray-400" />
                                Change Password
                            </h2>

                            <form onSubmit={handleChangePassword} className="space-y-5">
                                {error && (
                                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {/* Old Password */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Old Password</label>
                                        <div className="relative">
                                            <input
                                                type={showOldPass ? 'text' : 'password'}
                                                required
                                                placeholder="Enter current password"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                                onClick={() => setShowOldPass((prev) => !prev)}
                                            >
                                                {showOldPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* New Password */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">New Password</label>
                                        <div className="relative">
                                            <input
                                                type={showNewPass ? 'text' : 'password'}
                                                required
                                                placeholder="Enter new password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                                onClick={() => setShowNewPass((prev) => !prev)}
                                            >
                                                {showNewPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm New Password */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPass ? 'text' : 'password'}
                                                required
                                                placeholder="Repeat new password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                                onClick={() => setShowConfirmPass((prev) => !prev)}
                                            >
                                                {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60 shadow-lg shadow-black/10 flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Processing...' : 'Update Password'}
                                </button>
                            </form>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
                            <div className="p-1 bg-blue-100 rounded-lg text-blue-600">
                                <Lock size={16} />
                            </div>
                            <p className="text-sm text-blue-800">
                                Changing your password will log you out of all sessions. You will need to log in again with your new credentials.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
