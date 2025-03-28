import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaSmile } from "react-icons/fa";
import MainCard from "../components/DashboardComponents/MainCard";

const data = [
  { name: "Jan", orders: 10 },
  { name: "Feb", orders: 25 },
  { name: "Mar", orders: 15 },
  { name: "Apr", orders: 20 },
  { name: "May", orders: 18 },
  { name: "Jun", orders: 22 },
  { name: "Jul", orders: 12 },
  { name: "Aug", orders: 24 },
  { name: "Sep", orders: 30 },
  { name: "Oct", orders: 16 },
  { name: "Nov", orders: 19 },
  { name: "Dec", orders: 21 },
  { name: "Jan", orders: 19 },
  { name: "Feb", orders: 21 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md p-2 rounded-md text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <FaSmile className="text-brand" />
          <span className="font-semibold">{payload[0].value} Orders</span>
        </div>
        <p className="text-xs">{label}, 2024</p>
      </div>
    );
  }
  return null;
};

const ReportScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Order");

  return (
    <div className="w-full md:w-[90%] bg-white mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
        <MainCard>
          <div className="text-white py-3 md:py-6 flex flex-col justify-between my-auto">
            <div className="flex flex-col space-y-0 text-left">
              <div className="text-[40px] md:text-[60px] font-brand-bold">
                200
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
              <div className="text-[40px] md:text-[60px] font-brand-bold">
                200
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
              <div className="text-[40px] md:text-[60px] font-brand-bold">
                200
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
              <div className="text-[40px] md:text-[60px] font-brand-bold">
                200
              </div>
              <div className="text-md text-white/80">Total Orders</div>
            </div>
            <p className="text-sm underline text-white text-left md:text-right underline-offset-4 cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
      </div>
      {/* Tabs */}
      <div className="grid grid-cols-4 gap-2 md:gap-5 border-b mt-10 mb-4 md:mb-8">
        {["Order", "Expense", "Revenue", "Outstanding"].map((tab) => (
          <button
            key={tab}
            className={`px-1 py-1 md:py-2 md:px-4 text-xs md:text-md rounded-sm font-brand-bold ${
              activeTab === tab
                ? "bg-brand text-white"
                : "border border-gray-200 text-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Charts */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "gray" }} />
          {/* <CartesianGrid strokeDasharray="3 3" vertical={false} /> */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
          />
          <Bar
            dataKey="orders"
            fill="#00bcff"
            radius={[7, 7, 0, 0]}
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-gray-600 mt-2 text-center">
        <span className="font-bold text-xl">30%</span> Your sales performance is{" "}
        <span className="text-brand">30% better</span> compared to last month.
      </p>
    </div>
  );
};

export default ReportScreen;
