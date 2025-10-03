import { RevenueItem } from "@/types/GeneralTypes/revenueTypes";
import { formatDate, formatPrice } from "@/utils/formatter";
import React from "react";
import { CiMoneyBill } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

interface Props {
  revenue: RevenueItem;
}

const RevenueItemComponent: React.FC<Props> = ({ revenue }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/dashboard/orders/${revenue.order_id}`)}
      className="bg-brand-100 cursor-pointer text-[12px] md:text-[16px] p-2 rounded-lg border border-gray-200 flex flex-row justify-between items-center gap-4"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 p-1 rounded-full bg-brand-200">
        <CiMoneyBill className="w-full h-full text-quick-action-icon" />
      </div>

      {/* Customer Details */}
      <div className="flex-1 w-full text-left">
        <p className="font-semibold text-quick-action-icon">
          Order #{revenue.orders.order_number}
        </p>
        <p className="text-gray-500">
          {revenue.customers.name} - {revenue.customers.phone_number}
        </p>
      </div>

      {/* Customer Date & Amount */}
      <div className="text-right">
        <div className="">{formatDate(revenue.updated_at)}</div>
        <div className="text-red-500">
          {formatPrice(revenue.orders.paid_amount)}
        </div>
      </div>
    </div>
  );
};

export default RevenueItemComponent;
