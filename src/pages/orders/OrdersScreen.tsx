import React, { useState } from "react";
import OrderList from "@/components/DashboardComponents/OrderList";
import { useGetOrders } from "@/hooks/query/usegetOrders";
import { Header } from "@/components/DashboardComponents";
import OrderItemLoading from "@/components/DashboardComponents/OrderItemLoading";

const OrdersScreen = () => {
  const tabs = ["all", "pending", "processing", "pickup", "completed"];
  type Tab = (typeof tabs)[number];
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const { data, isLoading } = useGetOrders(activeTab);
  const orders = data?.orders ?? [];
  return (
    <div className="w-full">
      <Header title="Orders" />
      {/* Tabs */}
      <div className="grid grid-cols-5 gap-2 mt-10 mb-4 md:mb-8">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-1 capitalize truncate py-1 md:py-2 md:px-4 text-xs md:text-md rounded-sm font-medium ${
              tab === "all" && ""
            } ${
              activeTab === tab
                ? "bg-brand text-white"
                : "border border-gray-200 text-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {isLoading ? <OrderItemLoading /> : <OrderList orders={orders} />}
    </div>
  );
};

export default OrdersScreen;
