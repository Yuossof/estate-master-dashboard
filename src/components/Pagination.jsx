/* eslint-disable react/prop-types */
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pagination, onPageChange, isLoading }) => {
    const { current_page, last_page } = pagination;

    const visiblePages = [];
    for (let i = 1; i <= last_page; i++) {
        if (
            i === 1 ||
            i === last_page ||
            (i >= current_page - 1 && i <= current_page + 1)
        ) {
            visiblePages.push(i);
        } else if (
            visiblePages[visiblePages.length - 1] !== "..."
        ) {
            visiblePages.push("...");
        }
    }

    return (
        <div className="flex items-center gap-1">
            <button
                disabled={current_page === 1 || isLoading}
                onClick={() => onPageChange(current_page - 1)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {visiblePages.map((page, idx) =>
                page === "..." ? (
                    <span key={idx} className="px-1 text-gray-400 dark:text-slate-500 text-xs select-none">...</span>
                ) : (
                    <button
                        key={idx}
                        disabled={isLoading}
                        onClick={() => onPageChange(page)}
                        className={`min-w-[32px] h-8 text-xs font-medium rounded-md transition-colors ${
                            current_page === page
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/50"
                        }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                disabled={current_page === last_page || isLoading}
                onClick={() => onPageChange(current_page + 1)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;
