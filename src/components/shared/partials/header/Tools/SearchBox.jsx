import React from "react";
import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm text-gray-400 dark:text-slate-500 hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)] transition-colors duration-200">
      <Search size={16} className="flex-shrink-0" />
      <span className="hidden xl:block">Search...</span>
      <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 dark:text-slate-500 bg-gray-100 dark:bg-[var(--surface-elevated)] border border-gray-200/80 dark:border-[var(--border-primary)] rounded">
        ⌘K
      </kbd>
    </button>
  );
};

export default SearchBox;
