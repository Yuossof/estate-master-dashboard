/* eslint-disable react/prop-types */
import React from 'react'

const TableSkeleton = ({ rows = 10, columns }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200/80 dark:border-[var(--border-primary)]">
            <table className="min-w-full table-fixed">
                <thead>
                    <tr className="bg-gray-50/80 dark:bg-[var(--surface-elevated)]">
                        {columns.map((column, i) => (
                            <th
                                key={i}
                                className="px-4 sm:px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-400 border-b border-gray-200/80 dark:border-[var(--border-primary)]"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[var(--border-secondary)]">
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((_, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-4 sm:px-5 py-3.5"
                                >
                                    <div
                                        className="h-3.5 bg-gray-100 dark:bg-[var(--surface-elevated)] rounded-md animate-pulse"
                                        style={{ width: `${50 + Math.random() * 40}%` }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableSkeleton
