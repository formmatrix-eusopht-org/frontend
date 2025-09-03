'use client';

import React from "react";

interface Subscription {
    _id: string;
    planType: string;
    Price: number;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    status: "active" | "expired" | "canceled" | "pending";
    invoiceUrl?: string;
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
            <div className="flex justify-between items-center my-2 flex-wrap gap-2">
                <h2 className="text-xl font-semibold">Subscriptions</h2>
                <button
                    className={`px-4 py-2 rounded-sm text-sm bg-black text-white ${loading || subData.status !== "active" ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    onClick={() => {
                        if (!loading && subData.status === "active") {
                            onCancel();
                        }
                    }}
                    disabled={loading || subData.status !== "active"}
                >
                    {loading ? "Processing..." : subData.status === "active" ? "Cancel Subscription" : "Subscription Canceled"}
                </button>
            </div>

            <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="max-h-[61vh] overflow-y-auto">
                    {/* Desktop Table */}
                    <table className="hidden md:table min-w-full divide-y divide-gray-200 text-sm">
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
                                    Status
                                </th>
                                <th className="px-4 py-2 text-right font-medium text-gray-700">
                                    Invoice
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            <tr key={subData._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 font-medium max-w-xs truncate" title={subData.planType}>
                                    {subData.planType}
                                </td>
                                <td className="px-4 py-2">${subData.Price}.00</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    {subData.currentPeriodStart ? new Date(subData.currentPeriodStart).toLocaleDateString("en-US") : "N/A"}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    {subData.currentPeriodEnd ? new Date(subData.currentPeriodEnd).toLocaleDateString("en-US") : "N/A"}
                                </td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${subData.status === "active"
                                            ? "bg-green-100 text-green-700" 
                                            : subData.status === "pending"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-yellow-100 text-yellow-600"
                                            }`}
                                    >
                                        {subData.status ? subData.status.charAt(0).toUpperCase() + subData.status.slice(1) : "N/A"}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-right">
                                    {subData?.invoiceUrl ? (
                                        <a
                                            href={subData.invoiceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline whitespace-nowrap"
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

                    {/* Mobile Cards */}
                    <div className="md:hidden">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-medium text-sm truncate max-w-[60%]" title={subData.planType}>
                                    {subData.planType || "No plan"}
                                </h3>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${subData.status === "active"
                                        ? "bg-green-100 text-green-700" 
                                        : subData.status === "pending"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-yellow-100 text-yellow-600"
                                        }`}
                                >
                                    {subData.status ? subData.status.charAt(0).toUpperCase() + subData.status.slice(1) : "N/A"}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs">Price</p>
                                    <p>${subData.Price || "0"}.00</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Start Date</p>
                                    <p className="whitespace-nowrap">
                                        {subData.currentPeriodStart ? new Date(subData.currentPeriodStart).toLocaleDateString("en-US") : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">End Date</p>
                                    <p className="whitespace-nowrap">
                                        {subData.currentPeriodEnd ? new Date(subData.currentPeriodEnd).toLocaleDateString("en-US") : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Invoice</p>
                                    {subData?.invoiceUrl ? (
                                        <a
                                            href={subData.invoiceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm whitespace-nowrap"
                                        >
                                            View Invoice
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 text-sm">No Invoice</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}