'use client';

import { useRouter } from "next/navigation";
import React from "react";

interface User {
    _id: number;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive";
}

interface UserTableProps {
    users: User[];
}

export default function UserTable({ users }: UserTableProps) {
    console.log(users);
    const router = useRouter()

    return (
        <div className="p-4 mt-4">
            <div className="flex justify-between my-2">
                <h2 className="text-xl font-semibold ">Users</h2>
                <button
                    className="px-4 py-2 rounded-sm text-sm bg-black text-white"
                    onClick={() => { router.push("/add_user") }}
                >
                    Add User
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Name</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Email</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Role</th>
                            {/* <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th> */}
                            <th className="px-4 py-2 text-right font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 font-medium">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.role == '1' ? "User" : "Admin"}</td>
                                    {/* <td className="px-4 py-2">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td> */}
                                    <td className="px-4 py-2 text-right">
                                        <button className="text-blue-600 hover:underline">Edit</button>
                                        <button className="ml-3 text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr key='0'>
                                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
