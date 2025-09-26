import Header from "@/components/DashboardComponents/Header";
import React from "react";

const InventoryCustomersLoading: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <Header />

      {/* Payment History Section Skeleton */}
      <div className="mt-10">
        {/* Title and Button Skeleton */}
        <div className="flex justify-between items-center mb-5">
          <div className="h-8 bg-gray-300 rounded w-48"></div>
          <div className="h-10 bg-gray-300 rounded w-32"></div>
        </div>

        {/* Table Header Skeleton */}
        <div className="grid grid-cols-3 lg:grid-cols-4 text-left px-4 py-2 rounded-2xl font-bold mt-5">
          <div className="hidden lg:block">
            <div className="h-4 bg-gray-300 rounded w-8"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>

        {/* Table Rows Skeleton */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className={`grid grid-cols-3 lg:grid-cols-4 text-left px-4 py-3 ${
              item % 2 === 0 ? "bg-gray-100" : ""
            } rounded-2xl`}
          >
            <div className="hidden lg:block">
              <div className="h-4 bg-gray-300 rounded w-4"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryCustomersLoading;
