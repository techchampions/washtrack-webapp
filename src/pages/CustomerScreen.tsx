import React from "react";
import CustomerList from "../components/DashboardComponents/CustomerList";

const CustomerScreen = () => {
  return (
    <div className="w-full md:w-[90%] mx-auto">
      <h2 className="text-black font-brand-bold text-lg md:text-3xl mb-4 text-left">
        Customers
      </h2>
      <CustomerList />
    </div>
  );
};

export default CustomerScreen;
