/* eslint-disable react/prop-types */
"use client"

import * as React from "react"

export default function PureCalendar({ value, onChange, label = "Date" }) {
  const [open, setOpen] = React.useState(false)
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const today = new Date()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ]
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const selectDate = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    const formattedDate = selectedDate.toISOString().split("T")[0]

    onChange?.(formattedDate)
    setOpen(false)
  }

  const renderCalendarDays = () => {
    const days = []

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        value &&
        new Date(value).getDate() === day &&
        new Date(value).getMonth() === currentMonth.getMonth() &&
        new Date(value).getFullYear() === currentMonth.getFullYear()

      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth.getMonth() &&
        today.getFullYear() === currentMonth.getFullYear()

      days.push(
        <button
          key={day}
          onClick={() => selectDate(day)}
          className={`w-8 h-8 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400
            ${isSelected
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : isToday
                ? "bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
        >
          {day}
        </button>
      )
    }

    return days
  }

  return (
    <div className="flex flex-col gap-3 lg:w-[50%] w-full lg:min-w-[220px]">
      <label htmlFor="date" className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <div className="relative w-full">
        <button
          id="date"
          onClick={() => setOpen(!open)}
          className="px-3 py-2 text-sm border w-full rounded-md flex items-center justify-between text-left 
            bg-white dark:bg-gray-900 
            border-gray-200 dark:border-gray-700 
            shadow-sm hover:border-gray-300 dark:hover:border-gray-600 c-focus
            "
        >
          <span className={value ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}>
            {value ? new Date(value).toLocaleDateString() : "Select date"}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-10 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
            <div className="p-3">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={previousMonth}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>

                <button
                  onClick={nextMonth}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="w-8 h-6 text-xs font-medium text-gray-500 dark:text-gray-400 text-center">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
            </div>
          </div>
        )}
      </div>

      {open && <div className="fixed inset-0 z-0" onClick={() => setOpen(false)} />}
    </div>
  )
}
