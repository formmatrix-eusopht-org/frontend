'use client';

import { useRouter } from "next/navigation";
import React from "react";

interface User {
  _id: number;
  name: string;
  email: string;
  role: string | number;
  status: number;
  activeStatus?: boolean;
  planExpiration: string;
}

interface UserTableProps {
  users: User[];
  onRefresh: () => void;
}

import toast from "react-hot-toast";

export default function UserTable({ users, onRefresh }: UserTableProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleStatusChange = async (id: number, currentStatus: boolean | undefined) => {
    try {
      // If currentStatus is explicitly false, we want to activate (true). 
      // If it's true or undefined, we want to deactivate (false).
      const newStatus = currentStatus === false ? true : false;
      const confirmMsg = newStatus ? "Are you sure you want to activate this user?" : "Are you sure you want to deactivate this user?";

      if (!window.confirm(confirmMsg)) return;

      const url = newStatus
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/activate/${id}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/deactivate/${id}`;

      const body = newStatus ? {} : { activeStatus: false };

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        onRefresh();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4 mt-4 w-full">
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
          {/* Desktop Table */}
          <table className="hidden md:table min-w-full divide-y divide-gray-200 text-sm">
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
                      {formatDate(user.planExpiration)}
                    </td>
                    <td className="px-4 py-2 text-right space-x-3 whitespace-nowrap">
                      {/* edit delete button commented in admin */}
                      {/* <button className="text-blue-600 hover:underline">Edit</button> */}
                      {user.activeStatus !== false ? (
                        <button
                          className="text-yellow-600 hover:underline"
                          onClick={() => handleStatusChange(user._id, user.activeStatus)}
                        >
                          Deactivate
                        </button>
                      ) : (
                        //--button to activate deactivate user status activestatus
                        <button
                          className="text-gray-600 hover:underline"
                          onClick={() => handleStatusChange(user._id, user.activeStatus)}
                        >
                          Activate
                        </button>
                      )}
                      {/* <button className="text-red-600 hover:underline">Delete</button> */}
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

          {/* Mobile Cards */}
          <div className="md:hidden">
            {users && users.length > 0 ? (
              users.map((user) => (
                <div key={user._id} className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="flex space-x-3">

                      <button className="text-blue-600 hover:underline text-sm">Edit</button>
                      {user.activeStatus !== false ? (
                        <button
                          className="text-yellow-600 hover:underline text-sm"
                          onClick={() => handleStatusChange(user._id, user.activeStatus)}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="text-gray-600 hover:underline text-sm"
                          onClick={() => handleStatusChange(user._id, user.activeStatus)}
                        >
                          Activate
                        </button>
                      )}
                      <button className="text-red-600 hover:underline text-sm">Delete</button>
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm mb-1 truncate" title={user.email}>
                    {user.email}
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{user.role === 2 ? "Admin" : "User"}</span>
                    <span>Expires: {formatDate(user.planExpiration)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No users found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}