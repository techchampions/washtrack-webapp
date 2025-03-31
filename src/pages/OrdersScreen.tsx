import React, { useState } from "react";
import OrderList from "../components/DashboardComponents/OrderList";

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState("Current");
  return (
    <div className="w-full md:w-[90%] mx-auto">
      {/* Tabs */}
      <div className="grid grid-cols-4 gap-2 md:gap-5 mt-10 mb-4 md:mb-8">
        {["Current", "Pickup", "Completed", "All"].map((tab) => (
          <button
            key={tab}
            className={`px-1 py-1 md:py-2 md:px-4 text-xs md:text-md rounded-sm font-brand-bold ${
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

      <OrderList />
    </div>
  );
};

export default OrdersScreen;
