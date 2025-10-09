import { Header } from "@/components/DashboardComponents";
import OrderItemLoading from "@/components/DashboardComponents/OrderItemLoading";
import ItemTypeOrderList from "@/components/DashboardComponents/OrderListByItemType";
import { useGetCustomerOrderByType } from "@/hooks/query/useGetCustomerOrders";
import React from "react";
import { useParams } from "react-router-dom";

const CustomerOrderByType = () => {
  const { item_type, customer_id, customer_name } = useParams<{
    item_type: string;
    customer_id: string;
    customer_name: string;
  }>();

  const { data, isLoading } = useGetCustomerOrderByType(
    customer_id || "",
    item_type || ""
  );
  if (isLoading) {
    return <OrderItemLoading />;
  }
  const orders = data?.order_items || [];
  return (
    <div>
      <Header />
      <div className="flex justify-between my-4">
        <h3 className="text-2xl font-bold">
          {customer_name}'s {item_type} Orders
        </h3>
      </div>
      <ItemTypeOrderList orders={orders} />
    </div>
  );
};

export default CustomerOrderByType;
