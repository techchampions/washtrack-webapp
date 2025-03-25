import React, { useState } from "react";

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
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-500 text-white p-6 rounded-lg flex flex-col justify-between">
          <h3 className="text-2xl font-bold">200</h3>
          <p className="text-sm">Total Orders</p>
          <a href="#" className="text-sm underline">
            View all
          </a>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-lg flex flex-col justify-between">
          <h3 className="text-2xl font-bold">50</h3>
          <p className="text-sm">Customers</p>
          <a href="#" className="text-sm underline">
            View all
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {["Current", "Pickup", "Completed", "All"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm ${
              activeTab === tab ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">S/N</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Qty</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className="border border-gray-300">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{order.item}</td>
              <td className="border px-4 py-2">{order.quantity}</td>
              <td className="border px-4 py-2">
                <a href="#" className="text-blue-500 underline">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryScreen;
