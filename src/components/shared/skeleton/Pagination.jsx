import React from "react";

const PaginationSkeleton = () => {
    const pages = Array.from({ length: 5 });

    return (
        <div className="flex items-center gap-2 animate-pulse">
            <div className="w-12 h-8 bg-gray-200 rounded"></div>

            {pages.map((_, index) => (
                <div
                    key={index}
                    className="w-8 h-8 bg-gray-200 rounded"
                ></div>
            ))}

            <div className="w-12 h-8 bg-gray-200 rounded"></div>
        </div>
    );
};

export default PaginationSkeleton;
