/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { User, SheetIcon, LogOut, Loader2 } from "lucide-react";

const ProfileMenu = ({ showMenu, setShowMenu, handleLogout, isLoading }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, setShowMenu]);

  if (!showMenu) return null;

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900 w-[300px] py-4 px-3 flex flex-col gap-1 absolute top-11 right-3 shadow-lg border border-gray-200 dark:border-slate-800 rounded-lg"
    >
      <div className="flex items-center cursor-pointer duration-300 justify-between rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1.5">
        <span className="text-gray-800 dark:text-gray-100">Profile</span>
        <User className="text-gray-600 dark:text-gray-300" />
      </div>

      <div className="flex items-center cursor-pointer duration-300 justify-between rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1.5">
        <span className="text-gray-800 dark:text-gray-100">Reports</span>
        <SheetIcon className="text-gray-600 dark:text-gray-300" />
      </div>

      <div
        onClick={handleLogout}
        className="flex items-center cursor-pointer duration-300 justify-between rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1.5"
      >
        <span className="text-gray-800 dark:text-gray-100">Logout</span>
        {!isLoading ? (
          <LogOut className="text-gray-600 dark:text-gray-300" />
        ) : (
          <div className="animate-spin transition-all duration-500 text-gray-600 dark:text-gray-400">
            <Loader2 />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileMenu;
