import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const CancelButton = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname.split("/")[1]

    return (
        <button
            type="button"
            className="mr-2 inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-lg border border-gray-200 dark:border-[var(--border-primary)] text-gray-700 dark:text-slate-300 bg-white dark:bg-[var(--surface-elevated)] hover:bg-gray-50 dark:hover:bg-[var(--surface-hover)] transition-colors md:w-auto w-full"
            onClick={() => navigate(`/${currentPath}`)}
        >
            Cancel
        </button>
    )
}

export default CancelButton