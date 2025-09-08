import React from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import Button from "../FormComponents/Button";
import { useAuth } from "@/hooks/auth/useAuth";

const Header: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col w-full md:w-[90%] mx-auto mb-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <img
            src={"/images/profile-img.png"}
            alt="Store logo"
            className="object-cover w-10 h-10 rounded-full"
          />
          <h1 className="text-lg font-bold text-black">
            {user?.store_name || "My Store"}
          </h1>
          {user?.plan_id && user.plan && (
            <span className="bg-brand-100 text-brand px-4 py-0.5 ml-2 rounded-md">
              {user.plan.name}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <FiBell className="text-xl text-black cursor-pointer" />
          <FiSettings
            className="text-xl text-black cursor-pointer"
            // onClick={handleLogout}
          />
        </div>
      </div>

      {/* Mobile-only upgrade banner */}
      <div className="flex items-center justify-between w-full px-4 py-2 rounded-md bg-brand-100 text-brand md:hidden">
        <p className="w-full py-2 text-sm font-bold text-left">
          {user?.plan?.name || "Free Plan"}
        </p>
        <Button label="Upgrade" className="py-0 rounded-md" />
      </div>
    </div>
  );
};

export default Header;
