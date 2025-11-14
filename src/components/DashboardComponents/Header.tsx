import React, { ReactNode } from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import { useAuth } from "@/hooks/auth/useAuth";
import { useGetSubscription } from "@/hooks/query/useGetUserSubscription";
import LinkButton from "@/components/GeneralComponents/LinkButton";
import { Link, useNavigate } from "react-router-dom";
interface Props {
  children?: ReactNode;
  title?: string;
}
const Header: React.FC<Props> = ({ children, title }) => {
  const { user } = useAuth();
  const { data } = useGetSubscription();
  const navigate = useNavigate();
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
          <div
            className={`hidden px-[1rem] py-[.3rem] ml-3 rounded-lg lg:flex flex-col text-justify ${
              data?.expired
                ? "text-red-500 bg-red-100"
                : "text-brand bg-brand-100"
            }`}
          >
            <div className="text-sm font-bold">
              {data?.currentPlan.name || user?.plan?.name || "Free Plan"}
            </div>
            {data?.expired ? (
              <div className="text-[10px] font-medium">Expired</div>
            ) : (
              <div className="text-[10px]">{data?.ordersLeft} Orders left</div>
            )}
          </div>
          <LinkButton
            href="/dashboard/settings/subscription/all"
            label={data?.expired ? "Renew" : "Upgrade"}
            className="py-0 rounded-lg !w-fit px-5 hidden lg:flex"
          />
        </div>
        {children ? (
          <div className="flex items-center w-auto gap-3 text-xs max-w-max">
            {children}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to={`/dashboard/notifications`} className="relative">
              <div className="h-2 w-2 rounded-full bg-red-500 absolute top-0 right-0"></div>
              <FiBell className="text-xl text-black cursor-pointer" />
            </Link>
            <FiSettings
              className="text-xl text-black cursor-pointer"
              onClick={() => navigate("/dashboard/settings")}
            />
          </div>
        )}
      </div>
      {/* Mobile-only upgrade banner */}
      <div
        className={`flex md:hidden items-center justify-between w-full px-4 py-2 rounded-md ${
          data?.expired ? "text-red-500 bg-red-100" : "text-brand bg-brand-100"
        } `}
      >
        <div className="flex-1 w-full text-left">
          <p className="w-full text-sm font-bold text-left">
            {data?.currentPlan.name || user?.plan?.name || "Free Plan"}
          </p>
          {data?.expired ? (
            <span className="text-xs">Expired</span>
          ) : (
            <span className="text-xs">{data?.ordersLeft} Orders left</span>
          )}
        </div>
        <LinkButton
          href="/dashboard/settings/subscription/all"
          label={data?.expired ? "Renew" : "Upgrade"}
          className="py-0 rounded-lg !w-fit px-5"
        />
      </div>
    </div>
  );
};

export default Header;
