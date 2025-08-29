'use client';

import { useRouter } from "next/navigation";
import React from "react";

interface User {
  _id: number;
  name: string;
  email: string;
  role: string | number;
  status: number;
  planExpiration: string;
}

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const router = useRouter();

  return (
    <div className="p-4 mt-4">
      <div className="flex justify-between my-2">
        <h2 className="text-xl font-semibold">Users</h2>
        <button
          className="px-4 py-2 rounded-sm text-sm bg-black text-white"
          onClick={() => {
            router.push("/add_user");
          }}
        >
          Add User
        </button>
      </div>

      <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* scroll wrapper */}
        <div className="max-h-[61vh] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            {/* Table Head */}
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Email</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Role</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Trial Expires</th>
                <th className="px-4 py-2 text-right font-medium text-gray-700">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      {user.role === 2 ? "Admin" : "User"}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(user.planExpiration).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button className="text-blue-600">Edit</button>
                      {user.status === 1 ? (
                        <button className="ml-3 text-yellow-600">Deactivate</button>
                      ) : (
                        <button className="ml-3 text-gray-600">Activate</button>
                      )}
                      <button className="ml-3 text-red-600">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
