import LinkButton from "@/components/GeneralComponents/LinkButton";
import { CheckCircle2 } from "lucide-react";
import React from "react";
interface Props {
  order_id: number;
}
const OrderCreateSuccess: React.FC<Props> = ({ order_id }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <CheckCircle2 size={150} fill="green" color="white" />
      <div className="text-2xl font-bold mt-4">Order Created</div>
      <p className="max-w-xs mb-4">
        Your has been created and receipt automatically generated
      </p>
      <LinkButton
        href={`/dashboard/orders/${order_id}`}
        label="View receipt"
        className="!max-w-xs"
      />
    </div>
  );
};

export default OrderCreateSuccess;
