import React, { ReactNode } from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import Button from "../FormComponents/Button";
import { useAuth } from "@/hooks/auth/useAuth";
interface Props {
  children?: ReactNode;
  title?: string;
}
const Header: React.FC<Props> = ({ children, title }) => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col w-full mx-auto mb-6 space-y-3 py-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <img
            src={
              user?.profile_picture
                ? user.profile_picture
                : "/images/profile-img.png"
            }
            alt="Store logo"
            className="object-cover w-10 h-10 rounded-full"
          />
          <h1 className="text-lg font-bold text-black">
            {title ? title : user?.store_name || "My Store"}
          </h1>
        </div>
        {children ? (
          <div className="flex items-center gap-3 w-auto max-w-max text-xs">
            {children}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <FiBell className="text-xl text-black cursor-pointer" />
            <FiSettings className="text-xl text-black cursor-pointer" />
          </div>
        )}
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
