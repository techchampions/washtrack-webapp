import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { FaSmile } from "react-icons/fa";
import MainCard from "@/components/DashboardComponents/MainCard";
import Button from "@/components/FormComponents/Button";
import { useGetMonthlyReport } from "@/hooks/query/useGetReport";
import { OrderReportItem } from "@/types/GeneralTypes/report";
import { formatPrice } from "@/utils/formatter";
import { Header } from "@/components/DashboardComponents";

// Define the type for the API response data
const CustomTooltip = ({
  active,
  payload,
  label,
  activeTab,
}: {
  active?: boolean;
  payload?: OrderReportItem[];
  label?: string;
  activeTab: string;
}) => {
  if (active && payload && payload.length) {
    let placeholder = `${payload[0].value} orders`;
    if (activeTab === "expenses") {
      placeholder = `${formatPrice(payload[0].value)} spent`;
    } else if (activeTab === "revenues") {
      placeholder = `${formatPrice(payload[0].value)} made`;
    } else if (activeTab === "outstanding") {
      placeholder = `${formatPrice(payload[0].value)} unpaid`;
    }
    return (
      <div className="bg-white shadow-md p-2 rounded-md text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <FaSmile className="text-brand" />
          <span className="font-semibold">{placeholder}</span>
        </div>
        <p className="text-xs">{label}</p>
      </div>
    );
  }
  return null;
};

const ReportScreen: React.FC = () => {
  const tabs = ["orders", "expenses", "revenues", "outstanding"];
  type Tab = (typeof tabs)[number];

  const [chartHeight, setChartHeight] = useState(300);
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const { data, isLoading } = useGetMonthlyReport(activeTab);
  const reportData = data;

  // Transform the API data for the chart
  const transformChartData = (report: OrderReportItem[]) => {
    return report.map((item) => ({
      name: item.month.split(" ")[0], // Get just the month name (e.g., "April" from "April 2025")
      orders: item.value,
      fullMonth: item.month, // Keep full month for reference if needed
    }));
  };
  // let report: OrderReportItem[] = [];
  // if (activeTab === "orders") {
  //   report = reportData?.order_report ?? [];
  // } else if (activeTab === "expenses") {
  //   report = reportData?.expense_report ?? [];
  // }

  // Wrap report calculation in useMemo to prevent unnecessary recalculations
  const report = useMemo((): OrderReportItem[] => {
    if (activeTab === "orders") {
      return reportData?.order_report ?? [];
    } else if (activeTab === "expenses") {
      return reportData?.expense_report ?? [];
    } else if (activeTab === "revenues") {
      return reportData?.revenue_report ?? [];
    } else if (activeTab === "outstanding") {
      return reportData?.outstanding_report ?? [];
    }
    return [];
  }, [
    activeTab,
    reportData?.order_report,
    reportData?.expense_report,
    reportData?.revenue_report,
    reportData?.outstanding_report,
  ]);

  const percentageChange = reportData?.percentage_change?.[0] ?? 0;

  const [chartData, setChartData] = useState(transformChartData(report));

  // Update chart data when API response changes
  useEffect(() => {
    if (report.length > 0) {
      const transformedData = transformChartData(report);
      setChartData(transformedData);
    }
  }, [report]);

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
        setChartData(transformChartData(report));
      }
    };

    updateChartSize();
    window.addEventListener("resize", updateChartSize);
    return () => window.removeEventListener("resize", updateChartSize);
  }, [report, chartData.length]);

  // Calculate totals from the API data
  // const calculateTotals = () => {
  //   if (report.length === 0) return { totalOrders: 0, totalValue: 0 };

  //   const totalOrders = report.reduce((sum, item) => sum + item.value, 0);
  //   // You might want to calculate revenue based on your business logic
  //   const averageOrderValue = 100; // Replace with actual average order value
  //   const totalValue = totalOrders * averageOrderValue;

  //   return { totalOrders, totalValue };
  // };

  // const { totalOrders, totalValue } = calculateTotals();

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
    <div className="w-full bg-white mx-auto">
      <Header />
      {/* Tabs */}
      <div className="text-black text-left text-2xl font-bold py-2">
        Performance
      </div>

      {/* Cards - Updated with real data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 md:gap-2">
        <MainCard>
          <div className="text-white py-3 md:py-6 flex flex-col justify-between">
            <div className="text-3xl font-bold">{5}</div>
            <div className="text-md text-white/80">Total Orders</div>
            <p className="text-sm underline text-white cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
        <MainCard>
          <div className="text-white py-3 md:py-6 flex flex-col justify-between">
            <div className="text-3xl font-bold">{formatPrice(25000)}</div>
            <div className="text-md text-white/80">Outstanding</div>
            <p className="text-sm underline text-white cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
        <MainCard>
          <div className="text-white py-3 md:py-6 flex flex-col justify-between">
            <div className="text-3xl font-bold">{formatPrice(56500)}</div>
            <div className="text-md text-white/80">Revenue</div>
            <p className="text-sm underline text-white cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
        <MainCard>
          <div className="text-white py-3 md:py-6 flex flex-col justify-between">
            <div className="text-3xl font-bold">{formatPrice(2222)}</div>
            <div className="text-md text-white/80">Total Expense</div>
            <p className="text-sm underline text-white cursor-pointer">
              View all
            </p>
          </div>
        </MainCard>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-5 mb-4 md:mb-8">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-1 capitalize truncate py-1 md:py-2 md:px-4 text-xs md:text-md rounded-sm font-medium ${
              tab === "all" && ""
            } ${
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
        <div className=" rounded-lg">
          <div className="w-full mx-auto">
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fill: "gray" }} />
                {window.innerWidth >= 500 && <YAxis dataKey="orders" />}
                <Tooltip
                  content={<CustomTooltip activeTab={activeTab} />}
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
          </div>
        </div>
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
