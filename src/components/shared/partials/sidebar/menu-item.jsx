/* eslint-disable react/prop-types */
import React from "react";
import Icon from "@/components/shared/ui/Icon";
import { ChevronRight } from "lucide-react";

const MenuItem = ({ activeSubmenu, i, item, toggleSubmenu, locationName }) => {
  const isActive =
    item.child && item.child.some((child) => child.childlink === locationName);

  return (
    <div
      className={`menu-link ${
        activeSubmenu === i ? "parent_active not-collapsed" : "collapsed"
      } ${isActive ? "menu-item-active" : ""}`}
      onClick={() => toggleSubmenu(i)}
    >
      <div className="flex-1 flex items-center">
        <span className="menu-icon">
          <Icon icon={item.icon} />
        </span>
        <div
          className={`text-box ${
            isActive ? "text-indigo-600 dark:text-indigo-400 font-medium" : ""
          }`}
        >
          {item.title}
        </div>
      </div>
      <div className="flex-shrink-0">
        <ChevronRight
          className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
            activeSubmenu === i ? "rotate-90" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default MenuItem;