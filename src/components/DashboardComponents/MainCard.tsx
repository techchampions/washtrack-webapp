import React from "react";

const MainCard = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-brand relative text-white text-left py-3 md:py-6 px-10 rounded-[20px] w-full h-full flex flex-col justify-between overflow-hidden ${className}`}
      {...props}>
      <img
        src="../images/group-ellipse.svg"
        alt="inventory"
        className="absolute top-0 right-0 h-20 md:h-32 "
      />
      <img
        src="../images/ellipse-b.svg"
        alt="inventory"
        className="absolute left-0 bottom-0 h-8 md:h-6 "
      />
      <div className="relative -top-1 z-10">{children}</div>
    </div>
  );
};

export default MainCard;
