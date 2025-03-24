import React from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FaClockRotateLeft } from "react-icons/fa6";
import QuickActions from "../components/DashboardComponents/QuickActions";

function HomeScreen() {
  return (
    <div>
      <div className="flex flex-row gap-2">
        <div className="bg-brand text-white text-left p-6 rounded-lg w-[70%] flex flex-col justify-between">
          <div className="text-black mb-4">
            <select
              name=""
              id=""
              className="border border-none outline-none text-white">
              <option value="" className="bg-red-500">
                Today
              </option>
              <option value="" className="bg-red-500">
                Yesterday
              </option>
              <option value="" className="bg-red-500">
                12th Feb
              </option>
              <option value="" className="bg-red-500">
                13th Feb
              </option>
            </select>
          </div>
          <div>
            <p>Total Orders</p>
            <h2 className="text-2xl font-bold">₦28,000.00</h2>
          </div>
        </div>
        <div className="flex flex-col w-[30%] gap-2">
          <div className="bg-green-500 text-white p-6 rounded-lg flex flex-row justify-start">
            <BiCheckCircle className="w-[30%] h-full" />
            <div className="w-[70%] flex flex-col">
              <p>Completed</p>
              <h2 className="text-2xl font-bold">₦20,000</h2>
            </div>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg flex flex-row justify-start">
            <FaClockRotateLeft className="w-[30%] h-full" />
            <div className="w-[70%] flex flex-col">
              <p>Pending</p>
              <h2 className="text-2xl font-bold">₦20,000</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-6 gap-4">
          <button className="bg-gray-200 p-4 rounded-lg">Inventory</button>
          <button className="bg-gray-200 p-4 rounded-lg">Orders</button>
          <button className="bg-gray-200 p-4 rounded-lg">Customers</button>
          <button className="bg-gray-200 p-4 rounded-lg">Expense</button>
          <button className="bg-gray-200 p-4 rounded-lg">Revenue</button>
          <button className="bg-gray-200 p-4 rounded-lg">Reports</button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
          <p>Order #676888 - Victoria Idris</p>
          <p>₦250,000</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md mt-2 flex justify-between">
          <p>Order #676889 - Victoria Idris</p>
          <p>₦250,000</p>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
