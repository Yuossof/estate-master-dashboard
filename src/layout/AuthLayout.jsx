import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion"

// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Moon, Sun } from "lucide-react";
import useDarkmode from "../hooks/useDarkMode";

const AuthLayout = () => {
  const [isDark, setDarkMode] = useDarkmode()

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [])

  return (
    <div className="auth-wrapper dark:bg-gray-900 bg-gray-50 relative">
      <div onClick={() => setDarkMode(isDark ? false : true)}>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9, rotate: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="cursor-pointer absolute top-5 right-5 z-[100]"
        >
          {isDark ? <Moon /> : <Sun />}
        </motion.div>
      </div>
      <WavyBackground backgroundFill={isDark ? "#161e2a" : "#f3f4f6 "}>
        <div className="auth-page-height ">
          <ToastContainer />
          {<Outlet />}
        </div>
      </WavyBackground>
    </div>
  );
};

export default AuthLayout;
