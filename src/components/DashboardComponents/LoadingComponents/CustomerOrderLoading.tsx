// components/CustomerOrdersSkeleton.tsx
import React from "react";

export const CustomerOrdersLoading: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="h-16 bg-gray-200 mb-6"></div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Customer Profile */}
        <div className="space-y-6">
          {/* Title Skeleton */}
          <div className="text-left">
            <div className="h-10 bg-gray-300 rounded w-48 mb-4"></div>
          </div>

          {/* Customer Profile Card Skeleton */}
          <div className="grid grid-cols-2 items-center my-4 border border-gray-200 rounded-2xl p-5 w-full">
            {/* Avatar Skeleton */}
            <div className="flex justify-center">
              <div className="h-[150px] w-[150px] bg-gray-300 rounded-full"></div>
            </div>

            {/* Customer Info Skeleton */}
            <div className="text-left space-y-4">
              <div className="h-6 bg-gray-300 rounded w-32"></div>

              <div className="flex items-center gap-2">
                <div className="bg-gray-300 rounded-full p-3 w-8 h-8"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-gray-300 rounded-full p-3 w-8 h-8"></div>
                <div className="h-4 bg-gray-300 rounded w-28"></div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-gray-300 rounded-full p-3 w-8 h-8"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </div>

              {/* Edit Button Skeleton */}
              <div className="h-8 bg-gray-300 rounded w-32 mt-4"></div>
            </div>
          </div>

          {/* Edit Form Skeleton (shown by default in skeleton) */}
          <div className="p-5 sm:p-10 !pb-5 w-full border border-gray-200 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 bg-gray-300 rounded w-40"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>

            <div className="space-y-4">
              <div className="h-12 bg-gray-300 rounded-lg"></div>
              <div className="h-12 bg-gray-300 rounded-lg"></div>
              <div className="h-12 bg-gray-300 rounded-lg"></div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="h-10 bg-gray-300 rounded-xl"></div>
                <div className="h-10 bg-gray-300 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order History */}
        <div className="space-y-4">
          {/* Title Skeleton */}
          <div className="text-left">
            <div className="h-10 bg-gray-300 rounded w-40 mb-4"></div>
          </div>

          {/* Order List Skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-xl bg-white"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-32"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                  <div className="h-6 bg-gray-300 rounded w-20"></div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="h-6 bg-gray-300 rounded w-16"></div>
                  <div className="h-8 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
