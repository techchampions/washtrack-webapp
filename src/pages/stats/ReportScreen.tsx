// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
//   // CartesianGrid,
// } from "recharts";
// import { FaSmile } from "react-icons/fa";
// import MainCard from "@/components/DashboardComponents/MainCard";
// import Button from "@/components/FormComponents/Button";
// import { useGetReport } from "@/hooks/query/useGetReport";

// // Full dataset (12 months)
// const fullData = [
//   { name: "Jan", orders: 10 },
//   { name: "Feb", orders: 25 },
//   { name: "Mar", orders: 15 },
//   { name: "Apr", orders: 20 },
//   { name: "May", orders: 18 },
//   { name: "Jun", orders: 22 },
//   { name: "Jul", orders: 12 },
//   { name: "Aug", orders: 24 },
//   { name: "Sep", orders: 30 },
//   { name: "Oct", orders: 16 },
//   { name: "Nov", orders: 19 },
//   { name: "Dec", orders: 21 },
//   { name: "Jan", orders: 10 },
//   { name: "Feb", orders: 25 },
//   { name: "Mar", orders: 15 },
//   { name: "Apr", orders: 20 },
//   { name: "May", orders: 18 },
//   { name: "Jun", orders: 22 },
// ];

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white shadow-md p-2 rounded-md text-sm text-gray-700">
//         <div className="flex items-center gap-1">
//           <FaSmile className="text-brand" />
//           <span className="font-semibold">{payload[0].value} Orders</span>
//         </div>
//         <p className="text-xs">{label}, 2024</p>
//       </div>
//     );
//   }
//   return null;
// };

// const ReportScreen: React.FC = () => {
//   const [chartHeight, setChartHeight] = useState(300);
//   const { data, isLoading } = useGetReport();
//   const report = data?.order_report ?? [];
//   const [chartData, setChartData] = useState(report);
//   const [activeTab, setActiveTab] = useState("Order");

//   // Function to handle responsive adjustments
//   useEffect(() => {
//     const updateChartSize = () => {
//       if (window.innerWidth < 768) {
//         setChartHeight(250); // Mobile: shorter chart
//         setChartData(report.slice(-8)); // Show last 6 months
//       } else {
//         setChartHeight(350); // Desktop: taller chart
//         setChartData(report); // Show all months
//       }
//     };

//     updateChartSize();
//     window.addEventListener("resize", updateChartSize);
//     return () => window.removeEventListener("resize", updateChartSize);
//   }, [report]);

//   return (
//     <div className="w-full md:w-[90%] bg-white mx-auto">
//       {/* Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
//         <MainCard>
//           <div className="text-white py-3 md:py-6 flex flex-col justify-between">
//             <div className="text-[40px] md:text-[60px] font-brand-bold">
//               200
//             </div>
//             <div className="text-md text-white/80">Total Orders</div>
//             <p className="text-sm underline text-white cursor-pointer">
//               View all
//             </p>
//           </div>
//         </MainCard>
//         <MainCard>
//           <div className="text-white py-3 md:py-6 flex flex-col justify-between">
//             <div className="text-[40px] md:text-[60px] font-brand-bold">
//               ₦50
//             </div>
//             <div className="text-md text-white/80">Outstanding</div>
//             <p className="text-sm underline text-white cursor-pointer">
//               View all
//             </p>
//           </div>
//         </MainCard>
//         <MainCard>
//           <div className="text-white py-3 md:py-6 flex flex-col justify-between">
//             <div className="text-[40px] md:text-[60px] font-brand-bold">
//               ₦500
//             </div>
//             <div className="text-md text-white/80">Revenue</div>
//             <p className="text-sm underline text-white cursor-pointer">
//               View all
//             </p>
//           </div>
//         </MainCard>
//         <MainCard>
//           <div className="text-white py-3 md:py-6 flex flex-col justify-between">
//             <div className="text-[40px] md:text-[60px] font-brand-bold">
//               ₦1200
//             </div>
//             <div className="text-md text-white/80">Total Expense</div>
//             <p className="text-sm underline text-white cursor-pointer">
//               View all
//             </p>
//           </div>
//         </MainCard>
//       </div>

//       {/* Tabs */}
//       <div className="text-black text-left text-2xl font-brand-bold py-5">
//         Performance
//       </div>
//       <div className="grid grid-cols-4 gap-2 md:gap-5 mb-4 md:mb-8">
//         {["Order", "Expense", "Revenue", "Outstanding"].map((tab) => (
//           <button
//             key={tab}
//             className={`px-1 py-1 md:py-2 md:px-4 text-xs md:text-md rounded-sm font-brand-bold ${
//               activeTab === tab
//                 ? "bg-brand text-white"
//                 : "border border-gray-200 text-gray-400"
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Chart */}
//       <ResponsiveContainer width="100%" height={chartHeight}>
//         <BarChart data={chartData}>
//           <XAxis dataKey="name" tick={{ fill: "gray" }} />
//           <Tooltip
//             content={<CustomTooltip />}
//             cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
//           />
//           <Bar
//             dataKey="orders"
//             fill="#00bcff"
//             radius={[7, 7, 0, 0]}
//             background={{ fill: "#eee" }}
//           />
//         </BarChart>
//       </ResponsiveContainer>

//       {/* Performance Text */}
//       <p className="text-gray-600 mt-2 text-center text-lg md:text-2xl">
//         <span className="font-brand-bold text-2xl md:text-3xl">30%</span> Your
//         sales performance is <span className="text-brand">30% better</span>{" "}
//         compared to last month.
//       </p>

//       {/* Button */}
//       <div className="w-full md:w-[50%] mx-auto mt-8">
//         <Button label="View Details" className="text-[25px]" />
//       </div>
//     </div>
//   );
// };

// export default ReportScreen;

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaSmile } from "react-icons/fa";
import MainCard from "@/components/DashboardComponents/MainCard";
import Button from "@/components/FormComponents/Button";
import { useGetMonthlyReport } from "@/hooks/query/useGetReport";
import { OrderReportItem } from "@/types/GeneralTypes/report";

// Define the type for the API response data
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md p-2 rounded-md text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <FaSmile className="text-brand" />
          <span className="font-semibold">{payload[0].value} Orders</span>
        </div>
        <p className="text-xs">{label}</p>
      </div>
    );
  }
  return null;
};

const ReportScreen: React.FC = () => {
  const [chartHeight, setChartHeight] = useState(300);
  const { data, isLoading } = useGetMonthlyReport();
  const reportData = data;

  // Transform the API data for the chart
  const transformChartData = (orderReport: OrderReportItem[]) => {
    return orderReport.map((item) => ({
      name: item.month.split(" ")[0], // Get just the month name (e.g., "April" from "April 2025")
      orders: item.value,
      fullMonth: item.month, // Keep full month for reference if needed
    }));
  };

  const orderReport = reportData?.order_report ?? [];
  const percentageChange = reportData?.percentage_change?.[0] ?? 0;

  const [chartData, setChartData] = useState(transformChartData(orderReport));
  const [activeTab, setActiveTab] = useState("Order");

  // Update chart data when API response changes
  useEffect(() => {
    if (orderReport.length > 0) {
      const transformedData = transformChartData(orderReport);
      setChartData(transformedData);
    }
  }, [orderReport]);

  // Function to handle responsive adjustments
  useEffect(() => {
    const updateChartSize = () => {
      if (window.innerWidth < 768) {
        setChartHeight(250); // Mobile: shorter chart
        // Show last 6 months on mobile
        if (chartData.length > 6) {
          setChartData((prevData) => prevData.slice(-6));
        }
      } else {
        setChartHeight(350); // Desktop: taller chart
        // Show all data on desktop
        setChartData(transformChartData(orderReport));
      }
    };

    updateChartSize();
    window.addEventListener("resize", updateChartSize);
    return () => window.removeEventListener("resize", updateChartSize);
  }, [orderReport, chartData.length]);

  // Calculate totals from the API data
  const calculateTotals = () => {
    if (orderReport.length === 0) return { totalOrders: 0, totalValue: 0 };

    const totalOrders = orderReport.reduce((sum, item) => sum + item.value, 0);
    // You might want to calculate revenue based on your business logic
    const averageOrderValue = 100; // Replace with actual average order value
    const totalValue = totalOrders * averageOrderValue;

    return { totalOrders, totalValue };
  };

  const { totalOrders, totalValue } = calculateTotals();

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full md:w-[90%] bg-white mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-200 animate-pulse h-32 rounded"
            ></div>
          ))}
        </div>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mt-6"></div>
          <div className="h-64 bg-gray-200 rounded mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[90%] bg-white mx-auto">
      {/* Cards - Updated with real data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
        <MainCard>
          <div className="text-white py-3 md:py-6 flex flex-col justify-between">
            <div className="text-[40px] md:text-[60px] font-brand-bold">
              {totalOrders}
            </div>
            <div className="text-md text-white/80">Total Orders</div>
            <p className="text-sm underline text-white cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
        <MainCard>
          <div className="text-white py-3 md:py-6 flex flex-col justify-between">
            <div className="text-[40px] md:text-[60px] font-brand-bold">
              ₦{/* Add outstanding calculation here */}
            </div>
            <div className="text-md text-white/80">Outstanding</div>
            <p className="text-sm underline text-white cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
        <MainCard>
          <div className="text-white py-3 md:py-6 flex flex-col justify-between">
            <div className="text-[40px] md:text-[60px] font-brand-bold">
              ₦{totalValue.toLocaleString()}
            </div>
            <div className="text-md text-white/80">Revenue</div>
            <p className="text-sm underline text-white cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
        <MainCard>
          <div className="text-white py-3 md:py-6 flex flex-col justify-between">
            <div className="text-[40px] md:text-[60px] font-brand-bold">
              ₦{/* Add expense calculation here */}
            </div>
            <div className="text-md text-white/80">Total Expense</div>
            <p className="text-sm underline text-white cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
      </div>

      {/* Tabs */}
      <div className="text-black text-left text-2xl font-brand-bold py-5">
        Performance
      </div>
      <div className="grid grid-cols-4 gap-2 md:gap-5 mb-4 md:mb-8">
        {["Order", "Expense", "Revenue", "Outstanding"].map((tab) => (
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

      {/* Chart */}
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fill: "gray" }} />
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
      ) : (
        <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
          <p className="text-gray-500">No data available for the chart</p>
        </div>
      )}

      {/* Performance Text */}
      <p className="text-gray-600 mt-2 text-center text-lg md:text-2xl">
        <span className="font-brand-bold text-2xl md:text-3xl">
          {percentageChange}%
        </span>{" "}
        Your sales performance is{" "}
        <span
          className={percentageChange >= 0 ? "text-green-500" : "text-red-500"}
        >
          {percentageChange}% {percentageChange >= 0 ? "better" : "worse"}
        </span>{" "}
        compared to last month.
      </p>

      {/* Button */}
      <div className="w-full md:w-[50%] mx-auto mt-8">
        <Button label="View Details" className="text-[25px]" />
      </div>
    </div>
  );
};

export default ReportScreen;
