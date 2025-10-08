import React from "react";
import { Link } from "react-router-dom";
import MobileLogo from "@/assets/images/logo/logo.webp";

const Logo = () => {

  return (
    <div>
      <Link to="/dashboard">
          <img src={MobileLogo} alt="logo-2" className="w-11 h-11 rounded-md"/>
      </Link>
    </div>
  );
};

export default Logo;
