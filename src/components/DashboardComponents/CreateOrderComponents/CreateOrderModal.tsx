import SelectCustomers from "@/components/DashboardComponents/CreateOrderComponents/SelectCustomers";
import { Button } from "@/components/FormComponents";
import { useModal } from "@/store/useModal.store";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreateOrderModal = () => {
  const modal = useModal();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center max-w-xs">
      <img
        src="/images/1171275266.png"
        alt=""
        className="w-[100px] md:w-[150px]"
      />
      <h2 className="mb-4 text-2xl font-bold text-black">Create Order</h2>
      <p className="mb-6 text-sm text-gray-600">
        Please select if you are creating a new customer or existing customer
        order
      </p>
      <div className="flex flex-col justify-between w-full gap-2 text-sm">
        <Button
          label="Existing Customer"
          className="px-4 py-2 text-white bg-brand"
          onClick={() => {
            modal.openModal(<SelectCustomers />);
          }}
        />
        <Button
          label="New Customer"
          className="w-full px-4 py-2 text-white bg-brand-muted"
          onClick={() => {
            modal.closeModal();
            navigate("/dashboard/orders/create/new-customer");
          }}
        />
      </div>
    </div>
  );
};

export default CreateOrderModal;
