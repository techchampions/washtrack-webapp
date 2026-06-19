import React from "react";

const ItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 mt-1 rounded-lg bg-gray-100 animate-pulse">
      <div className="flex items-center gap-4">
        {/* Image skeleton */}
        <div className="w-10 h-10 bg-gray-300 rounded"></div>

        {/* Text content skeleton */}
        <div className="text-left">
          <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-48"></div>
        </div>
      </div>

      {/* Chevron skeleton */}
      <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
    </div>
  );
};
export default ItemSkeleton;
