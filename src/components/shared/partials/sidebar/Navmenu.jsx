/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import useMobileMenu from "@/hooks/useMobileMenu";
import Submenu from "./sub-menu";
import MenuItem from "./menu-item";
import SingleMenu from "./single-menu";

const Navmenu = ({ menus }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (i) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const location = useLocation();
  const locationName = location.pathname.replace("/", "");
  const [mobileMenu, setMobileMenu] = useMobileMenu();

  useEffect(() => {
    let submenuIndex = null;
    
    menus.forEach((item, i) => {
      if (!item.child) return;
      
      const ciIndex = item.child.findIndex(
        (ci) => ci.childlink === locationName
      );
      
      if (ciIndex !== -1) {
        submenuIndex = i;
      }
    });
    
    document.title = `Estate Master | ${locationName}`;

    setActiveSubmenu(submenuIndex);
    if (mobileMenu) {
      setMobileMenu(false);
    }
  }, [location, menus]);

  return (
    <ul className="space-y-0.5 px-3">
      {menus.map((item, i) => (
        <li
          key={i}
          className={`single-menu-item 
            ${item.child ? "item-has-children" : ""}
            ${activeSubmenu === i ? "open" : ""}
            ${locationName === item.link ? "menu-item-active" : ""}`}
        >
          {/* single menu with no children */}
          {!item.child && <SingleMenu item={item} />}

          {/* menu with children - dropdown */}
          {item.child && (
            <MenuItem
              activeSubmenu={activeSubmenu}
              item={item}
              i={i}
              toggleSubmenu={toggleSubmenu}
              locationName={locationName}
            />
          )}

          <Submenu
            activeSubmenu={activeSubmenu}
            item={item}
            i={i}
            locationName={locationName}
          />
        </li>
      ))}
    </ul>
  );
};

export default Navmenu;