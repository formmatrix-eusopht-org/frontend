'use client';

import React from 'react';

export interface Column {
    key: string;
    header: string;
    render?: (value: any, row: any) => React.ReactNode;
    className?: string;
    mobilePriority?: boolean;
}

export interface TableProps {
    columns: Column[];
    data: any[];
    loading?: boolean;
    emptyMessage?: string;
    className?: string;
    rowKey?: string;
    mobileCardTitle?: (row: any) => string;
}

export default function ResponsiveTable({
    columns,
    data,
    loading = false,
    emptyMessage = "No data found",
    className = "",
    rowKey = "id",
    mobileCardTitle
}: TableProps) {
    // Default mobile title function if not provided
    const getMobileTitle = mobileCardTitle || ((row: any) => {
        // Try to find a string value to use as title
        for (const col of columns) {
            if (col.mobilePriority && typeof row[col.key] === 'string') {
                return row[col.key];
            }
        }
        // Fallback to first string value
        for (const col of columns) {
            if (typeof row[col.key] === 'string') {
                return row[col.key];
            }
        }
        return "Item";
    });

    return (
        <div className={`rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
            <div className="max-h-[61vh] overflow-y-auto">
                {/* Desktop Table */}
                <table className="hidden md:table min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-4 py-2 text-left font-medium text-gray-700 ${column.className || ''}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-4 text-center text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-4 text-center text-gray-500">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr key={row[rowKey]} className="hover:bg-gray-50">
                                    {columns.map((column) => (
                                        <td
                                            key={`${row[rowKey]}-${column.key}`}
                                            className={`px-4 py-2 ${column.className || ''}`}
                                        >
                                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                                        </td>
                                    ))}
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
                    ) : data.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            {emptyMessage}
                        </div>
                    ) : (
                        data.map((row) => (
                            <div key={row[rowKey]} className="p-4 border-b border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium text-sm truncate max-w-[70%]">
                                        {getMobileTitle(row)}
                                    </h3>
                                    {/* Render mobile priority columns in header area */}
                                    {columns
                                        .filter(col => col.mobilePriority)
                                        .slice(0, 2) // Limit to 2 priority items in header
                                        .map((column) => (
                                            <div key={column.key} className="text-sm">
                                                {column.render ? column.render(row[column.key], row) : row[column.key]}
                                            </div>
                                        ))}
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {columns
                                        .filter(col => !col.mobilePriority)
                                        .map((column) => (
                                            <div key={column.key}>
                                                <p className="text-gray-500 text-xs">{column.header}</p>
                                                <p className="truncate">
                                                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}