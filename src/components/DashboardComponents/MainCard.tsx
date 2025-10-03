import React, { ReactNode } from "react";

const MainCard = ({
  children,
  className = "",
  ...props
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-brand relative text-white text-left py-3 md:py-6 p-5 md:px-10 rounded-[20px] w-full h-full flex flex-col justify-between overflow-hidden ${className}`}
      {...props}
    >
      <img
        src="/images/group-ellipse.svg"
        alt="inventory"
        className="absolute top-0 right-0 h-20 md:h-32 "
      />
      <img
        src="/images/ellipse-b.svg"
        alt="inventory"
        className="absolute bottom-0 left-0 w-8 h-8 md:h-8 md:w-20 "
      />
      <div className="relative z-10 -top-1">{children}</div>
    </div>
  );
};

export default MainCard;
