import { Customers } from "@/hooks/query/useGetCustomers";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface CustomerProps {
  customer: Customers;
}

const CustomerItem: React.FC<CustomerProps> = ({ customer }) => {
  return (
    <div className="bg-brand-100 cursor-pointer text-[12px] md:text-[16px] p-2 rounded-lg border border-gray-200 flex flex-row justify-between items-center gap-4">
      {/* Icon */}
      <img src="/images/user-icon.png" alt="inventory" className="h-12" />

      {/* Customer Details */}
      <div className="flex flex-col text-left w-full">
        <p className="text-quick-action-icon font-semibold">{customer.name}</p>
        <p className="text-gray-500">
          {customer.phone_number} - {customer.email}
        </p>
      </div>

      {/* Customer Date & Amount */}
      <FaChevronRight className="text-quick-action-icon" />
    </div>
  );
};

export default CustomerItem;
