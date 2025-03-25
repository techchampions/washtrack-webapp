import React, { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FaClockRotateLeft } from "react-icons/fa6";
import QuickActions from "../components/DashboardComponents/QuickActions";
import CustomDropdown from "../components/DashboardComponents/CustomDropdown";

function HomeScreen() {
  const options = ["Today", "Yesterday", "12th Feb", "13th Feb"];
  const [selectedDay, setSelectedDay] = useState(options[0]);
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="bg-brand text-white text-left p-6 rounded-lg w-full md:w-[70%] flex flex-col justify-between">
          <div className="text-black mb-4">
            <CustomDropdown
              options={options}
              selected={selectedDay}
              onSelect={setSelectedDay}
            />{" "}
          </div>
          <div>
            <p>Total Orders</p>
            <h2 className="text-2xl font-bold">₦28,000.00</h2>
          </div>
        </div>
        <div className="flex flex-row md:flex-col w-full md:w-[30%] gap-2 justify-between">
          <div className="bg-green-500 text-white p-6 rounded-lg flex flex-row justify-start w-[50%] md:w-full">
            <BiCheckCircle className="w-[30%] h-full" />
            <div className="w-[70%] flex flex-col">
              <p>Completed</p>
              <h2 className="text-2xl font-bold">₦20,000</h2>
            </div>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg flex flex-row justify-start w-[50%] md:w-full">
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
