import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import { menuItems as adminMenuItems } from "../../../../mocks/data";
import { companyMenuItems } from "../../../../mocks/company-menu-items";
import SimpleBar from "simplebar-react";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import clsx from "clsx";
import { useAuthContext } from "../../../../context/AuthProvider";
import NavmenuSkeleton from "./skeleton/NavmenuSkeleton";

const Sidebar = () => {
  const { user, isLoading: L } = useAuthContext()

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

  const [collapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState(false);

  // semi dark option
  const [isSemiDark] = useSemiDark();


  return (
    <div className={isSemiDark ? "dark" : ""}>
      <div
        className={clsx(
          " sidebar-wrapper bg-white dark:bg-gray-800  shadow-base  ",
          {
            "w-[72px] close_sidebar": collapsed,
            "w-[280px]": !collapsed,
            "sidebar-hovered": menuHover,
          }
        )}
        onMouseEnter={() => {
          setMenuHover(true);
        }}
        onMouseLeave={() => {
          setMenuHover(false);
        }}
      >
        <SidebarLogo menuHover={menuHover} />
        <div
          className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${scroll ? " opacity-100" : " opacity-0"
            }`}
        ></div>

        <SimpleBar
          className="sidebar-menu  h-[calc(100%-80px)]"
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          {L && (
            <NavmenuSkeleton />
          )}
          {user && !L && (
            <Navmenu menus={user.role === "admin" ? adminMenuItems : user.role === "company-admin-role" ? companyMenuItems : adminMenuItems}/>
          )}
        </SimpleBar>
      </div>
    </div>
  );
};

export default Sidebar;
