import { Header } from "@/components/DashboardComponents";
import OrderItemLoading from "@/components/DashboardComponents/OrderItemLoading";
import RevenueList from "@/components/DashboardComponents/RevenueComponents/RevenueList";
import { useGetRevenueList } from "@/hooks/query/useGetRevenue";
import React from "react";

const AllRevenueList = () => {
  const { data, isLoading } = useGetRevenueList();
  if (isLoading) {
    return <OrderItemLoading />;
  }
  const revenues = data?.Revenue ?? [];
  return (
    <div>
      <Header />
      <div className="">
        <h3 className="mb-4 text-2xl font-bold text-left">Revenue List</h3>
        <RevenueList revenues={revenues} />
      </div>
    </div>
  );
};

export default AllRevenueList;
