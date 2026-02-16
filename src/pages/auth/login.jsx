import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./common/login-form";
import Logo from "@/assets/images/logo/logo.webp";

const login = () => {
  return (
    <>
      <div className="h-full grid w-full px-6 grow grid-cols-1 place-items-center pt-10 2xl:pt-0 z-[1000] overflow-hidden">
        <div className=" max-w-[416px] mx-auto w-full space-y-6 mb-9">
          {/* <CometCard show={false}> */}
            <div className="bg-gray-50 dark:bg-[var(--surface-elevated)] shadow-lg border dark:border-[var(--border-primary)] border-slate-200 rounded-md py-3 pt-7">
              <div className="text-center">
                <div className="h-[72px] w-[72px] mx-auto">
                  <Link to="/">
                    <img
                      src={Logo}
                      alt=""
                      className=" object-contain object-center h-full"
                    />
                  </Link>
                </div>
                <div className=" text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-1 mt-5">
                  Welcome Back
                </div>
                <div className=" text-gray-500 dark:text-gray-400 text-sm">
                  Please sign in to continue
                </div>
              </div>
              <div className="p-6">
                <LoginForm />
              </div>
            </div>
          {/* </CometCard> */}

        </div>
      </div >
    </>
  );
};

export default login;
