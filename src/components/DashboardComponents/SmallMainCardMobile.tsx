import React from "react";

const SmallMainCardMobile = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-brand relative text-white text-left py-6 px-4 md:px-10 rounded-[20px] w-full md:w-[70%] h-[80px] md:hidden overflow-hidden my-auto ${className}`}
      {...props}>
      <img
        src="../images/small-main-ellipse.svg"
        alt="inventory"
        className="absolute top-0 left-0 h-6 "
      />
      <img
        src="../images/small-main-ellipse-b.svg"
        alt="inventory"
        className="absolute right-0 bottom-0 h-6 "
      />
      <div className="relative -top-1 z-10 grid grid-cols-2 divide-x w-full h-full divide-white gap-2 justify-center ">
        {children}
      </div>
    </div>
  );
};

export default SmallMainCardMobile;
