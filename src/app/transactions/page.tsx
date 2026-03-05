'use client';

import LoadingOverlay from "@/Components/LoadingOverlay";
import { UserAuth } from "@/Contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TransactionTable() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { user }: { user: any } = UserAuth();
    const route = useRouter()
    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get_user_transactions?userId=${user?._id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const data = await res.json();
            setTransactions(data.transactions || []);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            toast.error("Failed to load transactions");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (user?._id) fetchTransactions();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });
    };

    const [openingEdit, setOpeningEdit] = useState(false);
    const onEdit = (transaction: any) => {
        setOpeningEdit(true);
        localStorage.setItem(
            "senerio",
            JSON.stringify(transaction.transactionType)
        );

        const key = transaction.transactionType?.includes("Multiple Transfer")
            ? "multipleTransferStates"
            : "formStates";

        localStorage.setItem(key, JSON.stringify(transaction.formData));
        localStorage.setItem("isEditAndId", transaction._id);

        route.push("/home");
    };
    const onDelete = async (id: string) => {
        try {

            const loadingToast = toast.loading("Deleting transaction...");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delete/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            toast.success("Transaction deleted successfully!", {
                id: loadingToast,
                duration: 1500,
            });

            // Remove from UI without reloading
            setTransactions((prev: any[]) =>
                prev.filter((tx) => tx._id !== id)
            );

        } catch (error) {
            console.error("Delete error:", error);

            toast.error("Failed to delete transaction.", {
                duration: 3000,
            });
        }
    };

    return (
        <>
            <LoadingOverlay show={openingEdit} message="Opening transaction..." />
            <div className="p-4 mt-4 w-full">
                <div className="flex justify-between my-2">
                    <h2 className="text-xl font-semibold">Transactions History</h2>
                </div>

                <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="max-h-[61vh] overflow-y-auto">
                        {/* Desktop Table */}
                        <table className="hidden md:table min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">
                                        Date
                                    </th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">
                                        Type
                                    </th>
                                    <th className="px-4 py-2 text-right font-medium text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                                            No transactions found
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((tx) => (
                                        <tr key={tx._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 font-medium">
                                                {formatDate(tx.createdAt)}
                                            </td>
                                            <td className="px-4 py-2 max-w-xs truncate" title={Array.isArray(tx.transactionType) ? tx.transactionType.join(", ") : tx.transactionType}>
                                                {Array.isArray(tx.transactionType) ? tx.transactionType.join(", ") : tx.transactionType}
                                            </td>
                                            <td className="px-4 py-2 text-right space-x-3 whitespace-nowrap">
                                                <button className="text-blue-600 hover:underline" onClick={() => onEdit(tx)}>
                                                    Edit
                                                </button>
                                                <button className="text-red-600 hover:underline" onClick={() => onDelete(tx._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Mobile Cards */}
                        <div className="md:hidden">
                            {loading ? (
                                <div className="p-4 text-center text-gray-500">
                                    Loading...
                                </div>
                            ) : transactions.length === 0 ? (
                                <div className="p-4 text-center text-gray-500">
                                    No transactions found
                                </div>
                            ) : (
                                transactions.map((tx) => (
                                    <div key={tx._id} className="p-4 border-b border-gray-200">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-medium text-sm">
                                                {formatDate(tx.createdAt)}
                                            </div>
                                            <div className="flex space-x-3">
                                                <button className="text-blue-600 hover:underline text-sm" onClick={() => onEdit(tx)}>
                                                    Edit
                                                </button>
                                                <button className="text-red-600 hover:underline text-sm">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-gray-600 text-sm truncate" title={Array.isArray(tx.transactionType) ? tx.transactionType.join(", ") : tx.transactionType}>
                                            {Array.isArray(tx.transactionType) ? tx.transactionType.join(", ") : tx.transactionType}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}