/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ToggleSelect = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex-1 flex flex-col min-w-[150px]">
        {label && (
          <label
            htmlFor="toggle-select"
            className="px-1 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
        )}

        <div className="relative mt-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`px-3 py-2 text-sm border w-full rounded-md flex items-center justify-between text-left 
              bg-white dark:bg-gray-900 
              border-gray-200 dark:border-gray-700 
              shadow-sm hover:border-gray-300 dark:hover:border-gray-600
              c-focus`}
          >
            <span className="text-gray-800 dark:text-gray-200">
              {value ? "Active" : "Inactive"}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 
                  border border-gray-200 dark:border-gray-700 
                  rounded-sm shadow-md"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(1)}
                  className="w-full px-3 py-2 text-sm text-left 
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    text-gray-900 dark:text-gray-100"
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect(0)}
                  className="w-full px-3 py-2 text-sm text-left 
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    text-gray-900 dark:text-gray-100"
                >
                  Inactive
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ToggleSelect;
