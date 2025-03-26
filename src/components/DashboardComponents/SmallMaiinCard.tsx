import React from "react";

const SmallMainCard = ({ children, className = "", ...props }) => {
  return (
    <div
      className={` relative overflow-hidden bg-brand text-white p-6 rounded-[20px]  w-[50%] md:w-full h-[100px] md:h-[49.5%]  ${className}`}
      {...props}>
      <img
        src="../images/small-main-ellipse.svg"
        alt="inventory"
        className="absolute top-0 left-0 h-8 "
      />
      <div className="relative z-10 flex flex-row justify-start items-center gap-2">
        {children}
      </div>
    </div>
  );
};

export default SmallMainCard;
