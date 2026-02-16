/* eslint-disable react/prop-types */
import React from "react"
import { Plus } from "lucide-react"

export default function PageHeader({
    title,
    subtitle,
    total,
    entityName,
    icon,
    actionLabel,
    onActionClick,
}) {
    const description =
        total != null && entityName
            ? `${total} ${total === 1 ? entityName : entityName + "s"} registered`
            : subtitle

    return (
        <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-3 min-w-0">

                <div className="shrink-0 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {icon}
                </div>

                <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                            {description}
                        </p>
                    )}
                </div>

            </div>

            {onActionClick && (
                <button
                    onClick={onActionClick}
                    className="
            shrink-0
            inline-flex items-center justify-center gap-2
            h-9 w-9 sm:h-10 sm:w-auto
            rounded-full sm:rounded-lg
            bg-indigo-600 hover:bg-indigo-700
            text-white text-sm font-medium
            shadow-sm hover:shadow transition-all
            px-0 sm:px-4
          "
                >
                    <Plus size={16} />
                    <span className="hidden sm:inline">
                        {actionLabel}
                    </span>
                </button>
            )}
        </div>
    )
}

