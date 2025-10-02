/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import Loading from "./Loading";
import { companyMenuItems } from "../mocks/company-menu-items";
import { menuItems as adminMenuItems } from "../mocks/data";

const roles = {
  admin: "admin",
  company_admin: "company-admin-role"
}

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useAuthContext();

  const routes = useMemo(() => {
    const extractRoutes = (menuItems) => {
      const allRoutes = [];
      
      menuItems.forEach(item => {
        if (item.child && Array.isArray(item.child)) {
          item.child.forEach(childItem => {
            if (childItem.childlink) {
              allRoutes.push(`/${childItem.childlink}`);
            }
          });
        }

        if (item.link) {
          allRoutes.push(`/${item.link}`);
        }
      });
      
      return allRoutes;
    };

    if (user?.role === roles.company_admin) {
      return extractRoutes(companyMenuItems);
    }
    if (user?.role === roles.admin) {
      return extractRoutes(adminMenuItems);
    }
    return [];
  }, [user?.role]);

  if (isLoading) {
    return (
      <div className="mt-32">
        <Loading size={200} />
      </div>
    );
  }

  if (!user || !user.name || !user.id) {
    return <Navigate to="/login" />;
  }

  if (
    (user.role === roles.company_admin || user.role === roles.admin) &&
    !routes.some(route => location.pathname.startsWith(route))
  ) {
    return <Navigate to="/" />;
  }

  return children;
};