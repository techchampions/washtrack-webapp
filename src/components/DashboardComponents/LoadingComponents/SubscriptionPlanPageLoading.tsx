import { Header } from "@/components/DashboardComponents";
import React from "react";

// Skeleton Loading Component
const SubscriptionPlanPageLoading = () => {
  return (
    <div>
      <Header />
      <div className="">
        {/* Active Plan Skeleton */}
        <div className="bg-gray-200 text-white text-left p-5 rounded-2xl flex flex-wrap gap-3 justify-start animate-pulse">
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
          <div className="w-full md:w-auto">
            <ul className="list-inside text-left ml-5 text-sm space-y-2">
              {[1, 2, 3].map((item) => (
                <li className="flex gap-2 items-center" key={item}>
                  <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-32"></div>
                </li>
              ))}
            </ul>
            <div className="px-4 mt-3">
              <div className="h-8 bg-gray-300 rounded w-40"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {/* Section Header Skeleton */}
        <div className="text-left my-5">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>

        {/* Plans Grid Skeleton */}
        <div className="grid lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((plan) => (
            <div
              className="flex flex-col border border-gray-200 p-4 rounded-2xl overflow-hidden min-h-[350px] animate-pulse"
              key={plan}
            >
              <div className="pb-2 h-[150px] flex flex-col justify-end border-b border-gray-200 text-left px-1 lg:px-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="flex items-baseline gap-1">
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="py-4 flex-1">
                <ul className="list-inside text-left ml-5 text-sm space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <li className="flex gap-2 items-center" key={item}>
                      <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlanPageLoading;
