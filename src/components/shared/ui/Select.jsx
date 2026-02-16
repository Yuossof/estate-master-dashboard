/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Select = ({ label,
  options = [],
  value,
  onChange,
  onEndReached,
  isLoading,
  optionBoxRef,
  onInputChange,
  searchKeySelect,
  noResultMessage,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsDropdownOpen(false);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (onEndReached) onEndReached();
    }
  };

  const handleInputChange = (e) => {
    onInputChange(e.target.value)
  }

  return (
    <div className="w-full">
      <div className="flex-1 flex flex-col min-w-[150px]">
        {label && (
          <label
            htmlFor="select"
            className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
        )}

        <div className="relative mt-2">
          <button
            type="button"
            onClick={() => !isLoading && setIsDropdownOpen(!isDropdownOpen)} 
            disabled={isLoading} 
            className={`px-3 py-2 text-sm border w-full rounded-md flex items-center justify-between text-left 
    bg-white dark:bg-[var(--surface-elevated)] 
    border-gray-200 dark:border-[var(--border-primary)] 
    shadow-sm hover:border-gray-300 dark:hover:border-[var(--border-primary)]
    c-focus
    ${isLoading ? "opacity-60 cursor-not-allowed" : ""} 
  `}
          >
            <span className="text-gray-500 dark:text-gray-400">
              {isLoading ? "Loading..." : value || "Select option"}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                }`}
            />
          </button>


          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                key="dropdown"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute z-50 w-full mt-1 bg-white dark:bg-[var(--surface-elevated)] 
                   border border-gray-200 dark:border-[var(--border-primary)] 
                   rounded-sm shadow-md max-h-[320px] overflow-auto"
                onScroll={handleScroll}
                ref={optionBoxRef}
              >
                <div className="w-full h-9 sticky top-0">
                  <input
                    type="text"
                    onChange={handleInputChange}
                    value={searchKeySelect}
                    placeholder="search..."
                    className="w-full h-full outline-none border-b-[1px] dark:border-[var(--border-primary)] border-gray-200 
                       text-gray-800 dark:bg-[var(--surface-elevated)] dark:text-gray-200 bg-gray-50 px-3 shadow-sm dark:shadow-lg"
                  />
                </div>

                {options.length > 0 && options.map((option, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="w-full px-3 py-2 text-sm text-left 
                       hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)] transition-all
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       text-gray-900 dark:text-gray-100"
                  >
                    {option.label || option.name || option}
                  </button>
                ))}

                {options.length === 0 && !isLoading && (
                  <p className="text-center my-2 text-sm text-gray-500 dark:text-gray-400">{noResultMessage}</p>
                )}

                {isLoading && (
                  <div className="w-full flex justify-center py-2">
                    <Loader2 size={30} className="text-blue-500 animate-spin"/>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Select;
