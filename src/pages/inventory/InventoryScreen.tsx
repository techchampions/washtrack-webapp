import React, { useState } from "react";
import MainCard from "@/components/DashboardComponents/MainCard";
import { useUserStore } from "@/store/AppStore";

const InventoryScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Current");
  const { orders } = useUserStore();

  // Sample Data
  const items = [
    { id: 1, item: "Jeans", quantity: 9 },
    { id: 2, item: "Shirt", quantity: 5 },
    { id: 3, item: "Trouser", quantity: 5 },
    { id: 4, item: "Towel", quantity: 5 },
    { id: 5, item: "Duvet", quantity: 5 },
    { id: 6, item: "Jeans", quantity: 5 },
    { id: 7, item: "Jeans", quantity: 5 },
  ];

  return (
    <div className=" bg-white rounded-lg w-full md:w-[90%] mx-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-4 h-[150px] md:h-[280px] md:h-fill w-full">
        <MainCard>
          <div className="text-white py-3 md:py-6 flex flex-col justify-between my-auto">
            <div className="flex flex-col space-y-0 text-left">
              <div className="text-[40px] md:text-[80px] font-brand-bold">
                {orders?.total || 0}
              </div>
              <div className="text-md text-white/80">Total Orders</div>
            </div>
            <p className="text-sm underline text-white text-left md:text-right underline-offset-4 cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
        <MainCard>
          <div className="text-white py-3 md:py-6 flex flex-col justify-between my-auto">
            <div className="flex flex-col space-y-0 text-left">
              <div className="text-[40px] md:text-[80px] font-brand-bold">
                50
              </div>
              <div className="text-md text-white/80">Customers</div>
            </div>
            <p className="text-sm underline text-white text-left md:text-right underline-offset-4 cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
      </div>

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

      {/* Table */}
      <table className="w-full border-collapse text-black ">
        <thead>
          <tr className="bg-transparent text-gray-400">
            <th className=" p-2 md:p-4">S/N</th>
            <th className=" p-2 md:p-4">Item Type</th>
            <th className=" p-2 md:p-4">No of Items</th>
            <th className=" p-2 md:p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.id}
              className="even:bg-transparent odd:bg-brand-500 text-black font-bold"
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">{item.item}</td>
              <td className=" px-4 py-2">{item.quantity}</td>
              <td className=" px-4 py-2">
                <p className="text-brand underline underline-offset-4">View</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryScreen;
