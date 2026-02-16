/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Multilevel from "./multi-lavel";

const Submenu = ({ activeSubmenu, item, i }) => {
  const [activeMultiMenu, setMultiMenu] = useState(null);

  const toggleMultiMenu = (j) => {
    if (activeMultiMenu === j) {
      setMultiMenu(null);
    } else {
      setMultiMenu(j);
    }
  };

  function LockLink({ to, children, subItem }) {
    if (subItem.badge) {
      return (
        <span className="text-[13px] flex items-center gap-3 transition-all duration-200 cursor-not-allowed py-1.5 px-3 rounded-md">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-none" />
          <div className="flex-1 text-gray-400 dark:text-gray-500">
            {subItem.childtitle}
            <span className="ml-2 text-[11px] font-medium px-1.5 py-0.5 rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">
              {subItem.badge}
            </span>
          </div>
        </span>
      );
    } else {
      return (
        <NavLink to={to} end>
          {children}
        </NavLink>
      );
    }
  }

  return (
    <Collapse isOpened={activeSubmenu === i}>
      <ul className="sub-menu relative ltr:ml-[22px] rtl:mr-[22px] ltr:pl-4 rtl:pr-4 ltr:border-l rtl:border-r border-gray-200 dark:border-[var(--border-primary)] mt-1 mb-1 space-y-0.5">
        {item.child?.map((subItem, j) => (
          <li
            key={j}
            className="block relative first:pt-1 last:pb-1 capitalize"
          >
            {subItem?.submenu ? (
              <div>
                <div
                  className="has-multilevel-menu text-[13px] flex items-center gap-3 transition-all duration-200 cursor-pointer py-1.5 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  onClick={() => toggleMultiMenu(j)}
                >
                  <span className="flex-none h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                  <span className="flex-1 text-gray-600 dark:text-gray-400">
                    {subItem.childtitle}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform duration-300 ease-in-out ${
                      activeMultiMenu === j ? "rotate-90" : ""
                    }`}
                  />
                </div>
                <Multilevel
                  activeMultiMenu={activeMultiMenu}
                  j={j}
                  subItem={subItem}
                />
              </div>
            ) : (
              <LockLink to={subItem.childlink} subItem={subItem}>
                {({ isActive }) => (
                  <div
                    className={`text-[13px] flex items-center gap-3 transition-all duration-200 py-1.5 px-3 rounded-md ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10 font-medium"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full flex-none transition-colors duration-200 ${
                        isActive
                          ? "bg-indigo-500 dark:bg-indigo-400"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                    <span className="flex-1">
                      {subItem.childtitle}
                      {subItem.badge && (
                        <span className="ml-2 text-[11px] font-medium px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                          {subItem.badge}
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </LockLink>
            )}
          </li>
        ))}
      </ul>
    </Collapse>
  );
};

export default Submenu;