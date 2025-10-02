/* eslint-disable react/prop-types */
import clsx from "clsx"
import React from "react"
const Input = ({ onChange, placeholder, id, type, name,className, value }) => {
    return (
        <input
            onChange={onChange}
            id={id}
            type={type}
            name={name}
            value={value || ""}
            placeholder={placeholder}
            className={clsx(`px-3 py-2 text-sm border w-full rounded-md  mt-2
                    bg-white dark:bg-gray-900 
                    border-gray-300 dark:border-gray-700 
                     shadow-sm hover:border-gray-400 dark:hover:border-gray-600
                    c-focus text-gray-900 dark:text-gray-100`, className)}
        />
    )
}

export default Input