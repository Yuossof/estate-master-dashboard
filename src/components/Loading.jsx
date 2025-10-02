/* eslint-disable react/prop-types */
import Lottie from "lottie-react";
import React from "react";
import loaderAnimation from "../assets/lottie/Loading.json"

const Spinner = ({ size = 200 }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="mt-16">
        <Lottie
          animationData={loaderAnimation}
          loop={true}
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </div>
    </div>
  );
};

export default Spinner;
