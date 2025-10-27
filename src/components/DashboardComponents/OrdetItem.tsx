import { Order } from "@/hooks/query/useGetDashboard";
import { OrderWithCustomer } from "@/hooks/query/usegetOrders";
import { formatDate, formatPrice } from "@/utils/formatter";
import React from "react";

interface OrderProps {
  order: Order | OrderWithCustomer | undefined;
  onClick?: () => void;
}

const OrderItem: React.FC<OrderProps> = ({ order, onClick }) => {
  return (
    <div
      className="bg-brand-100 text-[12px] md:text-[16px] p-2 rounded-lg border cursor-pointer border-gray-200 flex flex-row justify-between items-center gap-4"
      onClick={onClick}
    >
      {/* Icon */}
      <img src="/images/order-icon.png" alt="inventory" className="h-12" />

      {/* Order Details */}
      <div className="flex flex-col flex-1 text-left">
        <p className="font-semibold text-quick-action-icon">
          Order #{order?.order_number}
        </p>
        <p className="text-gray-500">
          {order?.customer.name} - {order?.customer.phone_number}
        </p>
      </div>

      {/* Order Date & Amount */}
      <div className="flex flex-col text-right">
        <p className="text-sm text-gray-500">
          {formatDate(order?.created_at ?? "")}
        </p>
        <p className="font-bold text-quick-action-icon">
          {formatPrice(order?.total_amount ?? "")}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
