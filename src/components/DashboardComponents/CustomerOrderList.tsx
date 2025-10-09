import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import { Order } from "@/hooks/query/useGetCustomers";
import CustomerOrderItem from "@/components/DashboardComponents/CustomerOrderItem";

interface Props {
  orders: Order[];
}
const CustomerOrderList: React.FC<Props> = ({ orders }) => {
  const navigate = useNavigate();

  return orders.length === 0 ? (
    <div className="flex items-center justify-center px-5 py-10 text-center rounded-lg text-brand font-brand-bold bg-brand-100">
      <FaExclamationCircle className="mr-2 text-3xl text-brand" />
      You have no Orders
    </div>
  ) : (
    <div className="space-y-1">
      {orders.map((order, index) => (
        <CustomerOrderItem
          key={index}
          order={order}
          onClick={() => {
            navigate(`/dashboard/orders/${order.id}`);
          }}
        />
      ))}
    </div>
  );
};

export default CustomerOrderList;
