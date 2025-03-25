import React, { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FaClockRotateLeft } from "react-icons/fa6";
import QuickActions from "../components/DashboardComponents/QuickActions";
import CustomDropdown from "../components/DashboardComponents/CustomDropdown";
import OrderList from "../components/DashboardComponents/OrderList";
import Badge from "../components/GeneralComponents/Badge";

function HomeScreen() {
  const options = ["Today", "Yesterday", "12th Feb", "13th Feb"];
  const [selectedDay, setSelectedDay] = useState(options[0]);
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex flex-col md:flex-row gap-4 h-[200px] md:h-[200px]">
        <div className="bg-brand text-white text-left py-6 px-10 rounded-lg w-full md:w-[70%] h-full flex flex-col justify-between">
          <div className="text-black mb-4">
            <CustomDropdown
              options={options}
              selected={selectedDay}
              onSelect={setSelectedDay}
            />{" "}
          </div>
          <div>
            <p className="flex items-center text-lg flex-row gap-2">
              Total Orders{" "}
              <span>
                <Badge />
              </span>
            </p>
            <h2 className="text-[60px] font-brand-bold">₦28,000.00</h2>
          </div>
        </div>
        <div className="flex flex-row md:flex-col w-full md:w-[30%] h-full gap-1 justify-between">
          <div className="bg-brand text-white p-6 rounded-lg flex flex-row justify-start items-center w-[50%] md:w-full h-[49.5%]">
            <div className="bg-white p-1 flex justify-start items-center rounded-full">
              <BiCheckCircle className="h-[30px] w-[30px] text-green-500" />
            </div>

            <div className="w-[70%] flex flex-col">
              <p>Completed</p>
              <h2 className="text-2xl font-bold">₦20,000</h2>
            </div>
          </div>
          <div className="bg-brand text-white p-6 rounded-lg flex flex-row justify-start items-center w-[50%] md:w-full h-[49.5%]">
            <div className="bg-white p-1 flex justify-start items-center rounded-full">
              <FaClockRotateLeft className="h-[30px] w-[30px] text-red-500" />
            </div>
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
        <h3 className="text-2xl text-black text-left font-brand-bold mb-4">
          Recent Orders
        </h3>
        <OrderList />
      </div>
    </div>
  );
}

export default HomeScreen;
