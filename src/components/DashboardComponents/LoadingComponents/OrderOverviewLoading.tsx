import React from "react";

const OrderDetailsLoading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Order Info Card Skeleton */}
      <div className="flex flex-col rounded-lg bg-brand-100 p-4 divide-y divide-gray-300 gap-2 w-full animate-pulse">
        <div className="flex justify-start gap-2 text-black pb-2">
          <div className="h-12 w-12 bg-gray-300 rounded-lg"></div>
          <div className="flex flex-col text-left justify-start space-y-2 flex-1">
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex flex-col justify-start text-left text-black space-y-2 pt-2">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>

      {/* Payment Details Card Skeleton */}
      <div className="bg-brand-100 p-4 rounded-lg md:col-span-2 animate-pulse">
        <div className="h-7 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="flex justify-between py-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
          </div>
          <div className="flex justify-between py-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
          </div>
          <div className="flex justify-between py-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
          </div>
          <div className="flex justify-between mt-2 bg-white p-2 rounded-lg border border-gray-300">
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/6"></div>
          </div>
        </div>
      </div>

      {/* Order Timeline Skeleton */}
      <div className="flex flex-col bg-brand-100 rounded-lg py-4 px-8 animate-pulse">
        <div className="relative text-gray-500 border-s border-gray-500 text-left">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="mb-10 ms-6">
              <div className="absolute w-8 h-8 bg-gray-300 rounded-full -start-4 ring-4 ring-white"></div>
              <div className="h-5 bg-gray-300 rounded w-32 mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Items List Skeleton */}
      <div className="rounded-lg md:col-span-2 p-4 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-3"></div>
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200"
          >
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsLoading;
