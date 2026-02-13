'use client';

import React from "react";

export interface Subscription {
    subscriptionId: string;
    status: string;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    priceId: string;
    Price: string;
    planType: string;
    cancelAtPeriodEnd: boolean;
}

export interface Payment {
    invoiceId: string;
    amountPaid: number;
    currency: string;
    status: string;
    hosted_invoice_url: string;
    invoice_pdf: string;
    date: string;
    periodStart: string;
    periodEnd: string;
}

interface SubscriptionTableProps {
    subscriptions: {
        subscriptions?: Subscription[];
        payments?: Payment[];
    };
    onCancel: () => void;
    loading?: boolean;
}

export default function SubscriptionTable({
    subscriptions,
    onCancel,
    loading,
}: SubscriptionTableProps) {
    const subList = subscriptions?.subscriptions || [];
    const paymentList = subscriptions?.payments || [];

    // Find if there's any active subscription to enable/disable the cancel button
    const activeSubscription = subList.find(sub => sub.status === "active" && sub.cancelAtPeriodEnd === false);
    const isCancelDisabled = loading || !activeSubscription;

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="p-4 md:p-8 mt-4 w-full max-w-7xl mx-auto space-y-10">
            {/* Subscriptions Section */}
            <section>
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Subscriptions</h2>
                        <p className="text-gray-500 mt-1">Manage your active plans and billing cycles.</p>
                    </div>
                    <button
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform active:scale-95 shadow-sm ${isCancelDisabled
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-red-600 border-2 border-red-100 hover:border-red-600 hover:bg-red-50"
                            }`}
                        onClick={() => {
                            if (!isCancelDisabled) onCancel();
                        }}
                        disabled={isCancelDisabled}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-red-600" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Processing...
                            </span>
                        ) : activeSubscription ? (
                            "Cancel Subscription"
                        ) : (
                            "No Active Plans"
                        )}
                    </button>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 text-sm">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-5 text-left font-bold text-gray-500 uppercase tracking-wider">Plan Name</th>
                                    <th className="px-6 py-5 text-left font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-5 text-left font-bold text-gray-500 uppercase tracking-wider">Billing Period</th>
                                    <th className="px-6 py-5 text-left font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {subList.length > 0 ? (
                                    subList.map((sub) => (
                                        <tr key={sub.subscriptionId} className="hover:bg-gray-50/80 transition-colors">
                                            <td className="px-6 py-6">
                                                <div className="font-bold text-gray-900 text-base">{sub.planType}</div>
                                                <div className="text-gray-400 text-xs mt-1 font-mono">{sub.subscriptionId}</div>
                                            </td>
                                            <td className="px-6 py-6 text-gray-700 font-semibold text-base">
                                                ${sub.Price}.00
                                                <span className="text-gray-400 text-xs font-normal ml-1">/ mo</span>
                                            </td>
                                            <td className="px-6 py-6 text-gray-600">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Next Billing</span>
                                                    <span className="mt-0.5">{formatDate(sub.currentPeriodStart)} — {formatDate(sub.currentPeriodEnd)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${sub.status === "active"
                                                    ? "bg-green-50 text-green-700 ring-green-600/20"
                                                    : sub.status === "canceled"
                                                        ? "bg-red-50 text-red-700 ring-red-600/20"
                                                        : "bg-amber-50 text-amber-700 ring-amber-600/20"
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${sub.status === "active" ? "bg-green-600" : sub.status === "canceled" ? "bg-red-600" : "bg-amber-600"
                                                        }`} />
                                                    {sub.status.toUpperCase()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">
                                            No subscription record found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden divide-y divide-gray-100">
                        {subList.length > 0 ? (
                            subList.map((sub) => (
                                <div key={sub.subscriptionId} className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900">{sub.planType}</h3>
                                            <p className="text-gray-400 text-[10px] font-mono mt-1">{sub.subscriptionId}</p>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ring-1 ring-inset ${sub.status === "active" ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-red-50 text-red-700 ring-red-600/20"
                                            }`}>
                                            {sub.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Price</p>
                                            <p className="text-gray-900 font-semibold">${sub.Price}.00</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">End Date</p>
                                            <p className="text-gray-700 font-medium">{formatDate(sub.currentPeriodEnd)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center text-gray-400 italic">No subscriptions.</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Billing History Section */}
            <section>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Billing History</h2>
                    <p className="text-gray-500 mt-1">Access your previous invoices and receipts.</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 text-sm">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-5 text-left font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-5 text-left font-bold text-gray-500 uppercase tracking-wider">Amount Paid</th>
                                    <th className="px-6 py-5 text-left font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-5 text-left font-bold text-gray-500 uppercase tracking-wider">Billing Period</th>
                                    <th className="px-6 py-5 text-right font-bold text-gray-500 uppercase tracking-wider">Download</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {paymentList.length > 0 ? (
                                    paymentList.map((payment) => (
                                        <tr key={payment.invoiceId} className="hover:bg-gray-50/80 transition-colors">
                                            <td className="px-6 py-6">
                                                <div className="font-bold text-gray-900">{formatDate(payment.date)}</div>
                                            </td>
                                            <td className="px-6 py-6 font-bold text-gray-900">
                                                ${payment.amountPaid.toFixed(2)}
                                                <span className="text-gray-400 text-[10px] font-normal ml-1 tracking-widest">{payment.currency}</span>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-tight">
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-gray-500 text-xs">
                                                {formatDate(payment.periodStart)} - {formatDate(payment.periodEnd)}
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <a
                                                        href={payment.invoice_pdf}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors group"
                                                        title="Download PDF"
                                                    >
                                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </a>
                                                    <a
                                                        href={payment.hosted_invoice_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors group"
                                                        title="View Invoice"
                                                    >
                                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                                            No billing history found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
