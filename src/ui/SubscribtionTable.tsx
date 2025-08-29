'use client';

import React from "react";

interface Subscription {
    _id: string;
    planName: string;
    price: number;
    billingCycle: string;
    startDate: string;
    endDate: string;
    status: "active" | "expired" | "canceled" | "pending";
}

interface SubscriptionTableProps {
    subscriptions: Subscription[];
    onCancel: () => void;
    loading?: boolean;
}

export default function SubscriptionTable({ subscriptions, onCancel, loading }: SubscriptionTableProps) {

    return (
        <div className="p-4 mt-4 w-full">
            <div className="flex justify-between my-2">
                <h2 className="text-xl font-semibold">Subscriptions</h2>
                <button className={`px-4 py-2 rounded-sm text-sm bg-black text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => { loading ? null : onCancel() }}>Cancel Subscription</button>
            </div>

            {/* <div className="rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Plan</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Price</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Billing Cycle</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Start Date</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">End Date</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
                            <th className="px-4 py-2 text-right font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                </table>

                <div className="max-h-[61vh] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <tbody className="divide-y divide-gray-100">
                            {subscriptions && subscriptions.length > 0 ? (
                                subscriptions.map((sub) => (
                                    <tr key={sub._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 font-medium">{sub.planName}</td>
                                        <td className="px-4 py-2">${sub.price}.00</td>
                                        <td className="px-4 py-2 capitalize">{sub.billingCycle}</td>
                                        <td className="px-4 py-2">
                                            {new Date(sub.startDate).toLocaleDateString("en-US")}
                                        </td>
                                        <td className="px-4 py-2">
                                            {new Date(sub.endDate).toLocaleDateString("en-US")}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${sub.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : sub.status === "expired"
                                                        ? "bg-gray-100 text-gray-600"
                                                        : sub.status === "canceled"
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-yellow-100 text-yellow-600"
                                                    }`}
                                            >
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            {sub.status === "active" ? (
                                                <button className="text-red-600">Cancel</button>
                                            ) : (
                                                <button className="text-blue-600">Renew</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-6 text-center text-gray-500"
                                    >
                                        No subscriptions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div> */}
        </div>
    );
}
