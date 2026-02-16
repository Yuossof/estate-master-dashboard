/* eslint-disable react/prop-types */
import React from "react";
import { Collapse } from "react-collapse";
import { NavLink } from "react-router-dom";

const Multilevel = ({ activeMultiMenu, j, subItem }) => {
  return (
    <Collapse isOpened={activeMultiMenu === j}>
      <ul className="space-y-0.5 ltr:pl-4 rtl:pr-4 ltr:ml-2 rtl:mr-2 ltr:border-l rtl:border-r border-gray-200 dark:border-[var(--border-primary)] mt-1">
        {subItem?.submenu?.map((item, i) => (
          <li key={i} className="first:pt-1">
            <NavLink to={item.subChildLink}>
              {({ isActive }) => (
                <div
                  className={`text-[13px] flex items-center gap-3 py-1.5 px-3 rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10 font-medium"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  }`}
                >
                  <span
                    className={`h-1 w-1 rounded-full flex-none transition-colors duration-200 ${
                      isActive
                        ? "bg-indigo-500 dark:bg-indigo-400"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                  <span className="flex-1">{item.subChildTitle}</span>
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </Collapse>
  );
};

export default Multilevel;
