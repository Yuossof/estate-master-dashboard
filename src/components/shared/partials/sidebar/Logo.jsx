/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import useSidebar from "@/hooks/useSidebar";

// import images
// import MobileLogo from "@/assets/images/logo/logo-c.svg";
import logo from "@/assets/images/logo/logo.webp";
import { Menu } from "lucide-react";

const SidebarLogo = ({ menuHover }) => {
  const [collapsed, setMenuCollapsed] = useSidebar();
  // semi dark

  return (
    <div
      className={` logo-segment flex justify-between items-center bg-white dark:bg-gray-800 z-[9] py-6  px-4  
      ${menuHover ? "logo-hovered" : ""}
       
      
      `}
    >
      <Link to="/dashboard">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="logo-icon h-[40px]">
      
              <img src={logo} alt="" className=" h-full" />
       
          </div>

          {(!collapsed || menuHover) && (
            <div>
              <h1 className="text-[22px] font-medium  ">Estate master</h1>
            </div>
          )}
        </div>
      </Link>

      {(!collapsed || menuHover) && (
        <div
          onClick={() => setMenuCollapsed(!collapsed)}
          className={` dark:border-gray-700 rounded-full transition-all duration-150 cursor-pointer 
          `}
        >
          <Menu />
        </div>
      )}
    </div>
  );
};

export default SidebarLogo;
