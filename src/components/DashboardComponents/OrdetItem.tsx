import React from "react";
import { BsClipboard2Check } from "react-icons/bs";

interface OrderProps {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  date: string;
  amount: string;
}

const OrderItem: React.FC<OrderProps> = ({
  orderId,
  customerName,
  phoneNumber,
  date,
  amount,
}) => {
  return (
    <div className="bg-brand-100 text-[16px] p-4 rounded-lg border border-gray-200 flex flex-row justify-between items-center gap-4">
      {/* Icon */}
      <div className="bg-brand-250 p-3 flex justify-center items-center rounded-full border border-brand-border">
        <BsClipboard2Check size={20} className="text-dark-purple" />
      </div>

      {/* Order Details */}
      <div className="flex flex-col text-left w-full">
        <p className="text-dark-purple font-semibold">Order #{orderId}</p>
        <p className="text-gray-500">
          {customerName} - {phoneNumber}
        </p>
      </div>

      {/* Order Date & Amount */}
      <div className="flex flex-col text-right">
        <p className="text-gray-500 text-sm">{date}</p>
        <p className="text-dark-purple font-bold">{amount}</p>
      </div>
    </div>
  );
};

export default OrderItem;
