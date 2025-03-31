import React from "react";
import { BsClipboard2Check, BsFileTextFill } from "react-icons/bs";

interface OrderProps {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  date: string;
  amount: string;
  onClick?: () => void;
}

const OrderItem: React.FC<OrderProps> = ({
  orderId,
  customerName,
  phoneNumber,
  date,
  amount,
  onClick,
}) => {
  return (
    <div
      className="bg-brand-100 text-[12px] md:text-[16px] p-2 md:p-4 rounded-lg border border-gray-200 flex flex-row justify-between items-center gap-4"
      onClick={onClick}
    >
      {/* Icon */}
      <img src="../images/order-icon.png" alt="inventory" className="h-12" />

      {/* Order Details */}
      <div className="flex flex-col text-left w-full">
        <p className="text-quick-action-icon font-semibold">Order #{orderId}</p>
        <p className="text-gray-500">
          {customerName} - {phoneNumber}
        </p>
      </div>

      {/* Order Date & Amount */}
      <div className="flex flex-col text-right">
        <p className="text-gray-500 text-sm">{date}</p>
        <p className="text-quick-action-icon font-bold">{amount}</p>
      </div>
    </div>
  );
};

export default OrderItem;
