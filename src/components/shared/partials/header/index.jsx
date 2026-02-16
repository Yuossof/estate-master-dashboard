/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import SwitchDark from "./Tools/SwitchDark";
import HorizentalMenu from "./Tools/HorizentalMenu";
import useWidth from "@/hooks/useWidth";
import useMenulayout from "@/hooks/useMenulayout";
import Logo from "./Tools/Logo";
import SearchBox from "./Tools/SearchBox";
import useMobileMenu from "@/hooks/useMobileMenu";
import clsx from "clsx";
import { useAuthContext } from "../../../../context/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, LogOut, SheetIcon, User, ChevronDown, Menu } from "lucide-react";
import useAuthStore from "../../../../zustand/useAuthStore";

const Header = ({ className = "custom-class" }) => {
  const { user } = useAuthContext();
  const { setToken } = useAuthStore();

  const [sticky, setSticky] = useState(true);
  const { width, breakpoints } = useWidth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menuType] = useMenulayout();
  const [mobileMenu, setMobileMenu] = useMobileMenu();

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setToken(null);
      setIsLoading(false);
    }, 600);
  };

  return (
    <header
      className={clsx(className, "transition-all duration-300 has-sticky-header")}
    >
      <div
        className={clsx(
          "app-header md:px-6 px-4 transition-all duration-300",
          {
            "bg-transparent": !sticky && menuType === "vertical",
            "bg-white/80 dark:bg-[rgba(17,24,39,0.8)] backdrop-blur-xl border-b border-gray-200/60 dark:border-[var(--border-primary)] shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]":
              sticky,
            "horizontal_menu bg-white/80 dark:bg-[rgba(17,24,39,0.8)] backdrop-blur-xl border-b border-gray-200/60 dark:border-[var(--border-primary)]":
              menuType === "horizontal" && width > breakpoints.xl,
            vertical_menu: menuType === "vertical",
            "pt-5": menuType === "vertical" && !sticky,
            "py-2.5": menuType === "vertical" && sticky,
          }
        )}
      >
        <div className="flex justify-between items-center h-full">
          {/* -------- Left: Logo + Search -------- */}
          {menuType === "vertical" && (
            <div className="flex items-center gap-3">
              {width < breakpoints.xl && <Logo />}
              <SearchBox />
            </div>
          )}

          {/* -------- Horizontal Menu -------- */}
          {menuType === "horizontal" && (
            <div className="flex items-center gap-4">
              <Logo />
              {width <= breakpoints.xl && (
                <button
                  className="p-1.5 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)] transition-colors"
                  onClick={handleOpenMobileMenu}
                >
                  <Menu size={20} />
                </button>
              )}
            </div>
          )}

          {menuType === "horizontal" && width >= breakpoints.xl ? (
            <HorizentalMenu />
          ) : null}

          {/* -------- Right: Tools -------- */}
          <div className="flex items-center gap-2">
            <SwitchDark />

            {/* -------- User Profile -------- */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={clsx(
                  "flex items-center gap-2.5 py-1.5 pl-1.5 pr-3 rounded-xl transition-all duration-200",
                  "hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)]",
                  {
                    "bg-gray-100 dark:bg-[var(--surface-hover)]": isOpen,
                  }
                )}
              >
                <img
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-gray-200/80 dark:ring-slate-600/50"
                  src="https://res.cloudinary.com/db1lfazhq/image/upload/v1753718587/exq2mqln9mhym43xuoxi.jpg"
                  alt="avatar"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-slate-200 hidden md:block max-w-[120px] truncate">
                  {user?.name}
                </span>
                <ChevronDown
                  size={14}
                  className={clsx(
                    "text-gray-400 dark:text-slate-500 transition-transform duration-200 hidden md:block",
                    { "rotate-180": isOpen }
                  )}
                />
              </button>

              {/* -------- Dropdown Menu -------- */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className={clsx(
                      "absolute top-[calc(100%+8px)] right-0 z-50",
                      "w-[220px] p-1.5 rounded-xl",
                      "bg-white dark:bg-[var(--surface-card)]",
                      "border border-gray-200/80 dark:border-[var(--border-primary)]",
                      "shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                    )}
                  >
                    {/* User info header */}
                    <div className="px-3 py-2.5 mb-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 truncate">
                        {user?.email || "Administrator"}
                      </p>
                    </div>

                    <div className="h-px bg-gray-100 dark:bg-[var(--border-secondary)] mx-1.5 mb-1" />

                    {/* Menu items */}
                    <DropdownItem icon={<User size={16} />} label="Profile" />
                    <DropdownItem icon={<SheetIcon size={16} />} label="Reports" />

                    <div className="h-px bg-gray-100 dark:bg-[var(--border-secondary)] mx-1.5 my-1" />

                    <DropdownItem
                      icon={
                        isLoading ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <LogOut size={16} />
                        )
                      }
                      label="Logout"
                      onClick={handleLogout}
                      danger
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* -------- Mobile Menu Button -------- */}
            {menuType === "vertical" && (
              <button
                className="p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)] transition-colors xl:hidden"
                onClick={handleOpenMobileMenu}
              >
                <Menu size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

/* -------- Dropdown Item -------- */
const DropdownItem = ({ icon, label, onClick, danger = false }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150",
        danger
          ? "text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
          : "text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[var(--surface-hover)]"
      )}
    >
      <span className="flex-shrink-0 opacity-70">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default Header;
