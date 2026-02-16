import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Sun, Moon } from "lucide-react";

const SwitchDark = () => {
  const [isDark, setDarkMode] = useDarkMode();

  return (
    <button
      className="p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)] transition-colors duration-200"
      onClick={() => setDarkMode(!isDark)}
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default SwitchDark;
