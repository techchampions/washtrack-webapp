import React from "react";

interface OrderItemLoadingProps {
  count?: number;
}

const OrderItemLoading: React.FC<OrderItemLoadingProps> = ({ count = 5 }) => {
  const skeletonItems = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className="bg-brand-100 p-2 rounded-lg border border-gray-200 flex flex-row justify-between items-center gap-4 animate-pulse"
    >
      {/* Icon Skeleton */}
      <img src="/images/order-icon.png" alt="inventory" className="h-12" />

      {/* Order Details Skeleton */}
      <div className="flex flex-col flex-1 text-left space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Order Date & Amount Skeleton */}
      <div className="flex flex-col text-right space-y-2">
        <div className="h-3 bg-gray-200 rounded w-20 ml-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
      </div>
    </div>
  ));

  return <div className="space-y-1">{skeletonItems}</div>;
};

export default OrderItemLoading;
