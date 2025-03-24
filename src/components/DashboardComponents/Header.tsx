import React from "react";
import { FiBell, FiSettings } from "react-icons/fi";

function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex flex-row gap-1">
        <img
          src="./images/profile-img.png"
          alt=""
          className="h-8 w-8 rounded-full"
        />
        <h1 className="text-lg font-bold text-black">Victoria's Laundry</h1>
      </div>
      <div className="flex items-center space-x-4">
        <FiBell className="text-xl text-black" />
        <FiSettings className="text-xl text-black" />
      </div>
    </div>
  );
}

export default Header;
