import { Button } from "@/components/FormComponents";
import React from "react";
import { FaRegFaceSadTear } from "react-icons/fa6";

const ExhaustedOrder = () => {
  return (
    <div className="flex flex-col items-center max-w-xs gap-5">
      <FaRegFaceSadTear className="w-20 h-20 text-brand" />
      <div className="">
        <h3 className="text-lg font-bold">Oops... Exhausted Orders</h3>
        <p className="text-sm">
          You have exhausted your available orders for your current plan, please
          click the button bellow to renew or upgrade your subscription.
        </p>
      </div>
      <Button label="Subscribe" />
    </div>
  );
};

export default ExhaustedOrder;
