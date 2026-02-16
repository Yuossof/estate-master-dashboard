/* eslint-disable react/prop-types */
import React from "react";
import Icon from "@/components/shared/ui/Icon";
import { NavLink } from "react-router-dom";

const SingleMenu = ({ item }) => {
  return (
    <NavLink className="menu-link" to={item.link}>
      <span className="menu-icon flex-grow-0">
        <Icon icon={item.icon} />
      </span>
      <div className="text-box flex-grow">{item.title}</div>
    </NavLink>
  );
};

export default SingleMenu;
