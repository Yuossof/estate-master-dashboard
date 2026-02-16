/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";

import Navmenu from "./Navmenu";
import { menuItems as adminMenuItems } from "../../../../mocks/data";
import { companyMenuItems } from "../../../../mocks/company-menu-items";
import SimpleBar from "simplebar-react";
import useSemiDark from "@/hooks/useSemiDark";
import { Link } from "react-router-dom";
import useMobileMenu from "@/hooks/useMobileMenu";
import Icon from "@/components/shared/ui/Icon";
import { useAuthContext } from "../../../../context/AuthProvider";

// import images
import logo from "@/assets/images/logo/logo.webp";

const MobileMenu = ({ className = "custom-class" }) => {
  const { user, isLoading: L } = useAuthContext();

  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (!scrollableNodeRef.current) return;

    const handleScroll = () => {
      setScroll(scrollableNodeRef.current.scrollTop > 0);
    };

    const node = scrollableNodeRef.current;
    node.addEventListener("scroll", handleScroll);

    return () => {
      node.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isSemiDark] = useSemiDark();
  const [mobileMenu, setMobileMenu] = useMobileMenu();

  if (L) {
    return <div className="h-full w-[280px] bg-white dark:bg-[var(--surface-sidebar)]"></div>;
  }

  return (
    <div className={isSemiDark ? "dark" : ""}>
      <div
        className={`${className} fixed top-0 h-full w-[280px] bottom-0
        bg-white dark:bg-[var(--surface-sidebar)]
        shadow-xl border-r border-gray-200/80 dark:border-[var(--border-primary)]
        transition-colors duration-300`}
      >
        {/* --- Logo Section --- */}
        <div
          className="logo-segment flex justify-between items-center
          bg-white dark:bg-[var(--surface-sidebar)]
          z-[9] h-[80px] px-4 border-b border-gray-100 dark:border-[var(--border-primary)]"
        >
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="logo-icon">
              <img
                src={logo}
                alt="Estate Master"
                className="w-[38px] h-[38px] rounded-lg object-contain"
              />
            </div>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
              Estate Master
            </h1>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
          >
            <Icon icon="heroicons:x-mark" />
          </button>
        </div>

        {/* --- Shadow overlay when scrolling --- */}
        <div
          className={`h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-300 pointer-events-none ${
            scroll ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* --- Sidebar Content --- */}
        <SimpleBar
          className="sidebar-menu h-[calc(100%-80px)] py-2"
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          {user && (
            <Navmenu
              menus={
                user.role === "admin"
                  ? adminMenuItems
                  : user.role === "company-admin-role"
                  ? companyMenuItems
                  : adminMenuItems
              }
            />
          )}
        </SimpleBar>
      </div>
    </div>
  );
};

export default MobileMenu;
