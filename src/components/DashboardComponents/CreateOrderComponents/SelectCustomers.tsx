import SmallLoader from "@/components/GeneralComponents/SmallLoader";
import { useGetCustomers } from "@/hooks/query/useGetCustomers";
import { useModal } from "@/store/useModal.store";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SelectCustomers = () => {
  const modal = useModal();
  const { data, isLoading } = useGetCustomers();
  const navigate = useNavigate();
  if (isLoading) {
    return <SmallLoader />;
  }
  const customers = data?.Customers ?? [];
  return (
    <div className="text-black">
      <h2 className="mb-5 text-left text-2xl font-bold">Select Customer</h2>
      <div className=" space-y-2">
        {customers.map((customer, index) => (
          <div
            className="flex cursor-pointer hover:bg-brand-200 items-center justify-between py-2 px-4 bg-brand-100 rounded-lg"
            key={index}
            onClick={() => {
              modal.closeModal();
              navigate(
                `/dashboard/orders/create/existing-customer/${customer.id}`
              );
            }}
          >
            <div className="flex items-center gap-4">
              <img
                src="/images/user-icon.png"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-left">
                <p className="font-bold text-quick-action-icon">
                  {customer.name}
                </p>
                <p className="text-gray-500 text-sm">{customer.email}</p>
              </div>
            </div>
            <FaChevronRight className="text-quick-action-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCustomers;
