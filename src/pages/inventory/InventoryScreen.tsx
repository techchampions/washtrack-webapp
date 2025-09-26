import React, { useState } from "react";
import MainCard from "@/components/DashboardComponents/MainCard";
import SmallLoader from "@/components/GeneralComponents/SmallLoader";
import { useGetInventory } from "@/hooks/query/useGetInventory";
import { Header } from "@/components/DashboardComponents";
import { Link } from "react-router-dom";

const InventoryScreen: React.FC = () => {
  const tabs = ["all", "pending", "processing", "pickup", "completed"];
  type Tab = (typeof tabs)[number];

  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const { data, isLoading } = useGetInventory(activeTab);
  // Sample Data
  const items = data?.inventory ?? [];

  return (
    <div className="w-full">
      <Header />
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-4 h-[150px] md:h-[280px] md:h-fill w-full">
        <MainCard>
          {isLoading ? (
            <SmallLoader height="150px" width="150px" />
          ) : (
            <div className="text-white py-3 md:py-6 flex flex-col justify-between my-auto">
              <div className="flex flex-col space-y-0 text-left">
                <div className="text-[40px] md:text-[80px] font-bold">
                  {data?.total_Item_count || 0}
                </div>
                <div className="text-md text-white/80">Total Items</div>
              </div>
              <p className="text-sm underline text-white text-left md:text-right underline-offset-4 cursor-pointer">
                View all
              </p>
            </div>
          )}
        </MainCard>
        <MainCard>
          {isLoading ? (
            <SmallLoader height="150px" width="150px" />
          ) : (
            <div className="text-white py-3 md:py-6 flex flex-col justify-between my-auto">
              <div className="flex flex-col space-y-0 text-left">
                <div className="text-[40px] md:text-[80px] font-bold">
                  {data?.total_customers}
                </div>
                <div className="text-md text-white/80">Customers</div>
              </div>
              <p className="text-sm underline text-white text-left md:text-right underline-offset-4 cursor-pointer">
                View all
              </p>
            </div>
          )}
        </MainCard>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-5 gap-2 mt-10 mb-4 md:mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-1 py-1 md:py-2 md:px-4 text-xs md:text-md rounded-sm capitalize ${
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
              key={index}
              className="even:bg-transparent odd:bg-brand-500 rounded-lg text-black font-bold"
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">{item.item_type}</td>
              <td className=" px-4 py-2">{item.total_items}</td>
              <td className=" px-4 py-2">
                <Link
                  className="text-brand border-b border-b-brand"
                  to={`/dashboard/inventory/${item.item_type}/customers`}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryScreen;
