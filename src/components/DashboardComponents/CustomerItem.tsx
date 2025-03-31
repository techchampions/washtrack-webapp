import React from "react";
import { BsClipboard2Check, BsFileTextFill } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";

interface CustomerProps {
  name: string;
  phoneNumber: string;
  email: string;
}

const CustomerItem: React.FC<CustomerProps> = ({
  name,
  phoneNumber,
  email,
}) => {
  return (
    <div className="bg-brand-100 text-[12px] md:text-[16px] p-2 md:p-4 rounded-lg border border-gray-200 flex flex-row justify-between items-center gap-4">
      {/* Icon */}
      <img src="/images/user-icon.png" alt="inventory" className="h-12" />

      {/* Customer Details */}
      <div className="flex flex-col text-left w-full">
        <p className="text-quick-action-icon font-semibold">{name}</p>
        <p className="text-gray-500">
          {phoneNumber} - {email}
        </p>
      </div>

      {/* Customer Date & Amount */}
      <FaChevronRight className="text-quick-action-icon" />
    </div>
  );
};

export default CustomerItem;
