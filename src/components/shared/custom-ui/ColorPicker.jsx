/* eslint-disable react/prop-types */
import React from "react"
import { useState } from "react"
import clsx from "clsx"

export function ColorPicker({
  value = "#000000",
  onChange,
  className,
  disabled = false,
}) {
  const [color, setColor] = useState(value)

  const handleColorChange = (newColor) => {
    setColor(newColor)
    onChange?.(newColor)
  }

  return (
    <div className={clsx("flex flex-col gap-2 w-full", className)}>
      <div className="relative w-full">
        {/* Hidden color input */}
        <input
          type="color"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          disabled={disabled}
          className="sr-only"
          id="color-input"
        />

        {/* Styled input-like label */}
        <label
          htmlFor="color-input"
          className={clsx(
            `flex items-center justify-between px-3 py-2 text-sm border w-full rounded-md 
             bg-white dark:bg-[var(--surface-elevated)] 
             border-gray-300 dark:border-[var(--border-primary)] 
             shadow-sm hover:border-gray-400 dark:hover:border-[var(--border-primary)] 
             focus:outline-none focus:ring-2 focus:ring-blue-500
             text-gray-900 dark:text-gray-100 cursor-pointer select-none`,
            disabled && "opacity-50 cursor-not-allowed hover:bg-white dark:hover:bg-gray-900"
          )}
        >
          <span className="font-mono">{color.toUpperCase()}</span>
          <span
            className="w-6 h-6 rounded border border-gray-300 dark:border-[var(--border-primary)] shadow-sm"
            style={{ backgroundColor: color }}
          />
        </label>
      </div>
    </div>
  )
}
