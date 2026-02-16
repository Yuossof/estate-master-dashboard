/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import useSidebar from "@/hooks/useSidebar";

import logo from "@/assets/images/logo/logo.webp";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const SidebarLogo = ({ menuHover }) => {
  const [collapsed, setMenuCollapsed] = useSidebar();

  return (
    <div
      className={`logo-segment flex justify-between items-center bg-white dark:bg-[var(--surface-sidebar)] z-[9] h-[80px] px-4 border-b border-gray-100 dark:border-[var(--border-primary)] ${
        menuHover ? "logo-hovered" : ""
      }`}
    >
      <Link to="/dashboard" className="flex items-center gap-3 min-w-0">
        <div className="logo-icon h-[38px] w-[38px] flex-shrink-0">
          <img
            src={logo}
            alt="Estate Master"
            className="h-full w-full object-contain rounded-lg"
          />
        </div>

        {(!collapsed || menuHover) && (
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate tracking-tight">
            Estate Master
          </h1>
        )}
      </Link>

      {(!collapsed || menuHover) && (
        <button
          onClick={() => setMenuCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)] transition-all duration-200 flex-shrink-0"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-[18px] h-[18px]" />
          ) : (
            <PanelLeftClose className="w-[18px] h-[18px]" />
          )}
        </button>
      )}
    </div>
  );
};

export default SidebarLogo;
