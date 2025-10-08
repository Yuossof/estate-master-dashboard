import React, { Suspense } from "react";
import {  Outlet, useLocation } from "react-router-dom";
import Header from "@/components/shared/partials/header";
import Sidebar from "@/components/shared/partials/sidebar";
import useWidth from "@/hooks/useWidth";
import useSidebar from "@/hooks/useSidebar";
import useContentWidth from "@/hooks/useContentWidth";
import useMenulayout from "@/hooks/useMenulayout";
import useMenuHidden from "@/hooks/useMenuHidden";
import Footer from "@/components/shared/partials/footer";
import MobileMenu from "../components/shared/partials/sidebar/MobileMenu";
import useMobileMenu from "@/hooks/useMobileMenu";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import Spinner from "../components/Loading";
// import { CustomCursor } from "../components/ui/PointerV2";
const Layout = () => {
  const { width, breakpoints } = useWidth();
  const [collapsed] = useSidebar();

  const switchHeaderClass = () => {
    if (menuType === "horizontal" || menuHidden) {
      return "ltr:ml-0 rtl:mr-0";
    } else if (collapsed) {
      return "ltr:ml-[72px] rtl:mr-[72px]";
    } else {
      return "ltr:ml-[280px] rtl:mr-[280px]";
    }
  };

  // content width
  const [contentWidth] = useContentWidth();
  const [menuType] = useMenulayout();
  const [menuHidden] = useMenuHidden();
  // mobile menu
  const [mobileMenu, setMobileMenu] = useMobileMenu();
  const location = useLocation();


    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={localStorage.getItem("darkMode") === "true" ? "dark" : "light"}
        />
        <Header className={width > breakpoints.xl ? switchHeaderClass() : ""} />
        {menuType === "vertical" && width > breakpoints.xl && !menuHidden && (
          <Sidebar />
        )}

        <MobileMenu
          className={`${width < breakpoints.xl && mobileMenu
            ? "left-0 visible opacity-100  z-[9999]"
            : "left-[-300px] invisible opacity-0  z-[-999] "
            }`}
        />
        {/* mobile menu overlay*/}
        {width < breakpoints.xl && mobileMenu && (
          <div
            className="overlay bg-gray-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999] left-0 top-0 right-0 bottom-0"
            onClick={() => setMobileMenu(false)}
          ></div>
        )}

        <div
          className={`content-wrapper transition-all duration-150 ${width > 1280 ? switchHeaderClass() : ""
            }`}
        >
          {/* md:min-h-screen will h-full*/}
          <div className="page-content   page-min-height  ">
            <div
              className={
                contentWidth === "boxed" ? "container mx-auto" : "container-fluid"
              }
            >
              <motion.div
                key={location.pathname}
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    opacity: 0,
                    y: 50,
                  },
                  pageAnimate: {
                    opacity: 1,
                    y: 0,
                  },
                  pageExit: {
                    opacity: 0,
                    y: -50,
                  },
                }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.5,
                }}
              >
                <Suspense fallback={<div className="w-full h-full flex justify-center items-center"><Spinner /></div>}>
                  {<Outlet />}
                </Suspense>
              </motion.div>
            </div>
          </div>
        </div>

        <Footer className={width > breakpoints.xl ? switchHeaderClass() : ""} />

      </>
    );
  }


export default Layout;
