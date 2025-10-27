import React from "react";
// Update the import path below if the actual path or filename is different
import CustomerList from "@/components/DashboardComponents/CustomerList";
import { Header } from "@/components/DashboardComponents";

const CustomerScreen = () => {
  return (
    <div className="w-full">
      <Header />
      <CustomerList />
    </div>
  );
};

export default CustomerScreen;
