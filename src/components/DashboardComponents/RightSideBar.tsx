import React from "react";

const RightSideBar = () => {
  return (
    <div className="w-full h-full md:w-1/3 hidden md:flex flex-col gap-4">
      <div className="px-16 py-12 bg-brand text-white rounded-lg text-center flex items-center justify-between">
        <div className="leading-5 text-white text-[22px] text-left p-2 rounded-lg font-brand-bold">
          GET STARTED
        </div>
        <img src="/images/white-logo.png" alt="" className="items-end w-16" />
      </div>

      <p className="font-bold text-black text-left">DOWNLOAD MOBILE APP</p>
      <div className="flex justify-center gap-2 mt-2">
        <img src="/images/playstore.png" alt="Google Play" className="w-1/2" />
        <img src="../images/appstore.png" alt="App Store" className="w-1/2" />
      </div>

      <p className="font-bold text-black text-left">DO MORE WITH WASHTRACK</p>
      <div className=" rounded-lg text-center overflow-hidden relative">
        <img src="/images/ads.png" alt="" className="w-full object-cover" />
        <p className="text-[27px] text-left text-white absolute bottom-4 left-3 z-50">
          Build with Tech Champions today.
        </p>
      </div>
    </div>
  );
};

export default RightSideBar;
