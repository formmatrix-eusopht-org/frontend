'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // 👈 install lucide-react for icons
import { useRouter } from 'next/navigation';

interface FormData {
    name: string;
    address: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function UserRegistrationForm() {
    const [form, setForm] = useState<FormData>({
        name: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // 👇 states to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "trialPeriod" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        if (form.password !== form.confirmPassword) {
            setMessage('❌ Passwords do not match!');
            return;
        }

        setLoading(true);
        const uid = localStorage.getItem("uid");
        console.log("TRIAL_PERIOD", process.env.NEXT_PUBLIC_TRIAL_PERIOD);

        const data = {
            ...form,
            createdBy: uid,
            trialPeriod: process.env.NEXT_PUBLIC_TRIAL_PERIOD
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/adduser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setMessage('User registered successfully!');
                setForm({ name: '', address: '', email: '', password: '', confirmPassword: '' });
            } else {
                const error = await res.json();
                setMessage(`Error: ${error.message || 'Something went wrong'}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('❌ Error: Could not register user');
        } finally {
            setLoading(false);
            router.push('/dashboard');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Add User</h2>

                {message && (
                    <p className="mb-4 text-center text-sm font-medium text-red-500">{message}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                            placeholder="Enter your address"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition pr-10"
                                placeholder="Enter a strong password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition pr-10"
                                placeholder="Re-enter password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Trial Period */}
                    {/* <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Trial Period (days)</label>
                        <input
                            type="number"
                            name="trialPeriod"
                            value={form.trialPeriod}
                            onChange={handleChange}
                            required
                            min={1}
                            max={60}
                            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                            placeholder="Enter trial period in days"
                        />
                    </div> */}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}
