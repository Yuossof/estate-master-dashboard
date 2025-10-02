/* eslint-disable react/prop-types */
import React from 'react'

const TableSkeleton = ({rows = 10, columns}) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-600 table-fixed">
                <thead>
                    <tr>
                        {columns.map((column, i) => (
                            <th
                                key={i}
                                className="px-4 py-2 text-left text-sm font-medium text-gray-400 dark:text-gray-500 border-b border-gray-200 dark:border-gray-600"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex} className="animate-pulse">
                            {columns.map((_, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-4 py-3 border-b border-gray-200 dark:border-gray-600"
                                >
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
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
