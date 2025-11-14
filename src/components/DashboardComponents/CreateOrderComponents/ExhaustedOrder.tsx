import LinkButton from "@/components/GeneralComponents/LinkButton";
import React from "react";
import { FaRegFaceSadTear } from "react-icons/fa6";
interface Props {
  expired?: boolean;
}
const ExhaustedOrder: React.FC<Props> = ({ expired = false }) => {
  return (
    <div className="flex flex-col items-center max-w-xs gap-5">
      <FaRegFaceSadTear className="w-20 h-20 text-brand" />
      <div className="">
        <h3 className="text-lg font-bold">
          {expired
            ? "Oops... Your Plan has Expired"
            : "Oops... Exhausted Orders"}
        </h3>
        <p className="text-sm">
          {expired
            ? "Your current subscription plan has expired. Please click the button below to renew or upgrade your subscription"
            : "You have exhausted your available orders for your current plan, please click the button bellow to renew or upgrade your subscription."}
        </p>
      </div>
      <LinkButton
        href="/dashboard/settings/subscription"
        label={expired ? "Renew" : "Subscribe"}
      />
    </div>
  );
};

export default ExhaustedOrder;
