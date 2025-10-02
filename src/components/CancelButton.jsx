import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const CancelButton = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname.split("/")[1]
    return (
        <button
            type="button"
            className='bg-red-600 mr-2 hover:bg-red-700 transition text-white flex items-center gap-3 justify-center h-9 px-3 rounded-md md:w-auto w-full'
            onClick={() => {
                navigate(`/${currentPath}`)
            }}
        >
            <span>Cancel</span>
        </button>
    )
}

export default CancelButton