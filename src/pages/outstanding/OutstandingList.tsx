import { Header } from "@/components/DashboardComponents";
import OrderItemLoading from "@/components/DashboardComponents/OrderItemLoading";
import OutstandingList from "@/components/DashboardComponents/OutstandingComponents/OutstandingList";
import { useGetOustandingList } from "@/hooks/query/useGetOustanding";
import React from "react";

const AllOutstandingList = () => {
  const { data, isLoading } = useGetOustandingList();
  if (isLoading) {
    return <OrderItemLoading />;
  }
  const outstandings = data?.Outstanding ?? [];
  return (
    <div>
      <Header />
      <div className="">
        <h3 className="mb-4 text-2xl font-bold text-left">Outstanding List</h3>
        <OutstandingList outstandings={outstandings} />
      </div>
    </div>
  );
};

export default AllOutstandingList;
