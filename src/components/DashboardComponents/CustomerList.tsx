import React from "react";
import CustomerItem from "./CustomerItem";
import { useGetCustomers } from "@/hooks/query/useGetCustomers";
import SmallLoader from "@/components/GeneralComponents/SmallLoader";

const CustomerList = () => {
  const { data, isLoading } = useGetCustomers();
  if (isLoading) {
    return <SmallLoader />;
  }
  const customers = data?.Customers ?? [];
  return (
    <div className="space-y-1">
      {customers.map((user) => (
        <CustomerItem key={user.name} customer={user} />
      ))}
    </div>
  );
};

export default CustomerList;
