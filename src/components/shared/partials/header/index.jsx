/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import Icon from "@/components/shared/ui/Icon";
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
import { Loader2, LogOut, SheetIcon, User } from "lucide-react";
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
      className={clsx(
        className,
        "transition-all duration-300 has-sticky-header"
      )}
    >
      <div
        className={clsx(
          "app-header md:px-6 px-[15px] transition-all duration-300 backdrop-blur-[6px]",
          {
            "bg-transparent": !sticky && menuType === "vertical",
            "bg-white dark:bg-gray-800 shadow-base": sticky,
            "horizontal_menu bg-white dark:bg-gray-800 shadow-base":
              menuType === "horizontal" && width > breakpoints.xl,
            "vertical_menu": menuType === "vertical",
            "pt-6": menuType === "vertical" && !sticky,
            "py-3": menuType === "vertical" && sticky,
          }
        )}
      >
        <div className="flex justify-between items-center h-full relative">
          {/* -------- Vertical Menu -------- */}
          {menuType === "vertical" && (
            <div className="flex items-center md:space-x-4 space-x-2 rtl:space-x-reverse">
              {width < breakpoints.xl && <Logo />}
              <SearchBox />
            </div>
          )}

          {/* -------- Horizontal Menu -------- */}
          {menuType === "horizontal" && (
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Logo />
              {width <= breakpoints.xl && (
                <div
                  className="cursor-pointer text-gray-900 dark:text-white text-2xl"
                  onClick={handleOpenMobileMenu}
                >
                  <Icon icon="heroicons-outline:menu-alt-3" />
                </div>
              )}
            </div>
          )}

          {/* -------- Horizontal Main Menu -------- */}
          {menuType === "horizontal" && width >= breakpoints.xl ? (
            <HorizentalMenu />
          ) : null}

          {/* -------- Tools Section -------- */}
          <div className="nav-tools flex items-center lg:space-x-6 space-x-3 rtl:space-x-reverse">
            <SwitchDark />
            <div className="flex items-center gap-2">
              <p>{user?.name}</p>
              <div className="relative">
                <div
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="rounded-full border-gray-700 border cursor-pointer"
                >
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://res.cloudinary.com/db1lfazhq/image/upload/v1753718587/exq2mqln9mhym43xuoxi.jpg"
                    alt="avatar"
                  />
                </div>

                {/* -------- Dropdown Menu -------- */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      ref={menuRef}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="bg-white dark:bg-gray-900 w-[250px] py-4 px-3 flex flex-col gap-1 absolute top-11 md:right-3 -right-2 shadow-lg border border-gray-200 dark:border-slate-800 rounded-lg"
                    >
                      <div className="flex items-center cursor-pointer justify-between rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1.5">
                        <span className="text-gray-800 dark:text-gray-100">
                          Profile
                        </span>
                        <User className="text-gray-600 dark:text-gray-300" />
                      </div>

                      <div className="flex items-center cursor-pointer justify-between rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1.5">
                        <span className="text-gray-800 dark:text-gray-100">
                          Reports
                        </span>
                        <SheetIcon className="text-gray-600 dark:text-gray-300" />
                      </div>

                      <div
                        onClick={handleLogout}
                        className="flex items-center cursor-pointer justify-between rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1.5"
                      >
                        <span className="text-gray-800 dark:text-gray-100">
                          Logout
                        </span>
                        {!isLoading ? (
                          <LogOut className="text-gray-600 dark:text-gray-300" />
                        ) : (
                          <div className="animate-spin text-gray-600 dark:text-gray-400">
                            <Loader2 />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* -------- Mobile Menu Button -------- */}
            <div
              className="cursor-pointer text-gray-900 dark:text-white text-2xl xl:hidden block"
              onClick={handleOpenMobileMenu}
            >
              <Icon icon="heroicons-outline:menu-alt-3" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
