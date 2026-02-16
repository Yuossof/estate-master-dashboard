import React, { useRef, useEffect } from "react";
import Icon from "@/components/shared/ui/Icon";
import { motion } from "framer-motion";

const Checkbox = ({
  checked = false,
  value,
  onChange,
  disabled = false,
  indeterminate = false,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      className={`flex items-center group ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <input
        ref={ref}
        type="checkbox"
        className="hidden"
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span
        className={`h-5 w-5 border flex-none checkbox-control items-center justify-center text-white
        inline-flex ltr:mr-3 rtl:ml-3 relative transition-all duration-200 group-hover:shadow-checkbox rounded
        ${
          checked
            ? "bg-indigo-500 dark:bg-[var(--surface-elevated)] border-indigo-500"
            : "bg-gray-50 dark:bg-gray-600 dark:border-[var(--border-primary)] border-gray-200"
        }
        ${!checked ? "group-hover:bg-white dark:group-hover:bg-gray-500" : ""}
        ${disabled ? "opacity-50" : ""}`}
      >
        <motion.span
          animate={{ scale: checked ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon
            icon="fa6-solid:check"
            className={`text-[12px] transition-all duration-100 ${
              checked ? "scale-100" : "scale-0"
            }`}
          />
        </motion.span>
      </span>
    </label>
  );
};

export default Checkbox;
