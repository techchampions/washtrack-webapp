import React, { useState } from "react";
import MainCard from "../components/DashboardComponents/MainCard";

const InventoryScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Current");

  // Sample Data
  const orders = [
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
      <div className="grid grid-cols-2 gap-4 mb-4 h-[180px] md:w-[300px] w-full">
        <MainCard>
          <div className="text-white py-6 flex flex-col justify-between my-auto">
            <div className="flex flex-col space-y-0">
              <div className="text-[80px] font-brand-bold text-left">200</div>
              <div className="text-md text-left">Total Orders</div>
            </div>
            <p className="text-sm underline text-white text-right underline-offset-4 cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
        <MainCard>
          <div className="text-white py-6 flex flex-col justify-between my-auto">
            <div className="flex flex-col space-y-0">
              <div className="text-[80px] font-brand-bold text-left">50</div>
              <div className="text-md text-left">Customers</div>
            </div>
            <p className="text-sm underline text-white text-right underline-offset-4 cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-5 border-b mt-10 mb-8">
        {["Current", "Pickup", "Completed", "All"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-md rounded-sm font-brand-bold ${
              activeTab === tab
                ? "bg-brand text-white"
                : "border border-gray-200 text-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="w-full border-collapse text-black ">
        <thead>
          <tr className="bg-transparent text-gray-400">
            <th className=" px-4 py-4">S/N</th>
            <th className=" px-4 py-4">Item Type</th>
            <th className=" px-4 py-4">No of Items</th>
            <th className=" px-4 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className="even:bg-transparent odd:bg-brand-500 text-black font-bold">
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">{order.item}</td>
              <td className=" px-4 py-2">{order.quantity}</td>
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
