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
    return <div className="h-full w-[280px] bg-white dark:bg-gray-800"></div>;
  }

  return (
    <div className={isSemiDark ? "dark" : ""}>
      <div
        className={`${className} fixed top-0 h-full w-[280px] bottom-0
        bg-white dark:bg-gray-800/80
        backdrop-blur-md shadow-lg border-r border-gray-200 dark:border-gray-700
        transition-colors duration-300`}
      >
        {/* --- Logo Section --- */}
        <div
          className="logo-segment flex justify-between items-center 
          bg-white dark:bg-gray-800
          backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 
          z-[9] h-[85px] px-4"
        >
          <Link to="/dashboard">
            <div className="flex items-center space-x-4">
              <div className="logo-icon">
                <img src={logo} alt="" className="w-10 h-10 rounded-sm" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  DashSpace
                </h1>
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="cursor-pointer text-gray-900 dark:text-white text-2xl"
          >
            <Icon icon="heroicons:x-mark" />
          </button>
        </div>

        {/* --- Shadow overlay when scrolling --- */}
        <div
          className={`h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
            scroll ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow:
              "0px 10px 15px -10px rgba(0, 0, 0, 0.1)"
          }}
        ></div>

        {/* --- Sidebar Content --- */}
        <SimpleBar
          className="sidebar-menu h-[calc(100%-80px)]"
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
