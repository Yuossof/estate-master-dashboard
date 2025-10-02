/* eslint-disable react/prop-types */
import React from "react";

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
        <div className="flex items-center gap-2 flex-wrap">
            <button
                disabled={current_page === 1 || isLoading}
                onClick={() => onPageChange(current_page - 1)}
                className="px-3 py-1 border-[1px] dark:text-gray-300 dark:hover:bg-gray-700 dark:border-slate-700 border-slate-200 rounded-full dark:bg-gray-800 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                Prev
            </button>

            {visiblePages.map((page, idx) =>
                page === "..." ? (
                    <span key={idx} className="px-2 text-gray-500">…</span>
                ) : (
                    <button
                        key={idx}
                        disabled={isLoading}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-full transition border-[1px] dark:border-slate-700 border-slate-200 ${current_page === page
                                ? "bg-blue-500 text-white"
                                : "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                disabled={current_page === last_page || isLoading}
                onClick={() => onPageChange(current_page + 1)}
                className="px-3 py-1 border-[1px] dark:text-gray-300 dark:border-slate-700 dark:hover:bg-gray-700 border-slate-200 rounded-full dark:bg-gray-800 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
