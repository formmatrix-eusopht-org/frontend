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
    subscriptions: any;
    onCancel: () => void;
    loading?: boolean;
}

export default function SubscriptionTable({
    subscriptions,
    onCancel,
    loading,
}: SubscriptionTableProps) {
    const subData = subscriptions?.subscriptions || {};

    return (
        <div className="p-4 mt-4 w-full">
            <div className="flex justify-between my-2">
                <h2 className="text-xl font-semibold">Subscriptions</h2>
                <button
                    className={`px-4 py-2 rounded-sm text-sm bg-black text-white ${loading || subData.status !== "active" ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    onClick={() => {
                        if (!loading && subData.status === "active") {
                            onCancel();
                        }
                    }}
                >
                    {subData.status === "active" ? "Cancel Subscription" : "Subscription Canceled"}
                </button>
            </div>

            <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="max-h-[61vh] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Plan
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Price
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Start Date
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    End Date
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Resubscribe
                                </th>
                                <th className="px-4 py-2 text-right font-medium text-gray-700">
                                    Invioce
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            <tr key={subData._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 font-medium">{subData.planType}</td>
                                <td className="px-4 py-2">${subData.Price}.00</td>
                                <td className="px-4 py-2">
                                    {new Date(subData.currentPeriodStart).toLocaleDateString(
                                        "en-US"
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {new Date(subData.currentPeriodEnd).toLocaleDateString(
                                        "en-US"
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${subData.status === "active"
                                            ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-600"
                                            }`}
                                    >
                                        {subData.status === "active" ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-right">
                                    {subData?.invoiceUrl ? (
                                        <a
                                            href={subData.invoiceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 "
                                        >
                                            View Invoice
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">No Invoice</span>
                                    )}
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
