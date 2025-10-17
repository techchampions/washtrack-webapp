// components/CustomerListSkeleton.tsx
import React from "react";

export const CustomerListLoading: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Header and Search Skeleton */}
      <div className="flex justify-between items-center mb-2">
        {/* Title Skeleton */}
        <div className="h-8 bg-gray-300 rounded w-32 md:w-48 mb-4"></div>

        {/* Search Form Skeleton */}
        <div className="flex items-center md:w-[360px] gap-2">
          {/* Search Input Skeleton */}
          <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
          {/* Search Button Skeleton */}
          <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      {/* Customer Items Skeleton */}
      <div className="space-y-1">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg"
          >
            {/* Avatar Skeleton */}
            <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>

            {/* Customer Info Skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>

            {/* Action Button Skeleton */}
            <div className="w-20 h-8 bg-gray-300 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
