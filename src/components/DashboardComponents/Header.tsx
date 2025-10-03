import React, { ReactNode } from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import Button from "../FormComponents/Button";
import { useAuth } from "@/hooks/auth/useAuth";
import { useGetSubscription } from "@/hooks/query/useGetUserSubscription";
interface Props {
  children?: ReactNode;
  title?: string;
}
const Header: React.FC<Props> = ({ children, title }) => {
  const { user } = useAuth();
  const { data } = useGetSubscription();
  return (
    <div className="flex flex-col w-full py-2 mx-auto mb-6 space-y-3">
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
          <div className="hidden px-2 py-1 ml-3 rounded-lg text-brand md:flex bg-brand-100">
            {data?.currentPlan.name || user?.plan?.name || "Free Plan"}
          </div>
        </div>
        {children ? (
          <div className="flex items-center w-auto gap-3 text-xs max-w-max">
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
        <div className="flex-1 w-full text-left">
          <p className="w-full text-sm font-bold text-left">
            {data?.currentPlan.name || user?.plan?.name || "Free Plan"}
          </p>
          <span className="text-xs">{data?.ordersLeft} Orders left</span>
        </div>
        <Button
          label={data?.expired ? "Subscribe" : "Upgrade"}
          className="py-0 rounded-md !w-fit px-5"
        />
      </div>
    </div>
  );
};

export default Header;
