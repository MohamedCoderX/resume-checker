import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
      {/* Spinning Circle */}
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-4 text-gray-600 text-sm font-medium tracking-wide animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loader;
