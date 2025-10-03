import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import OutstandingItemComponent from "@/components/DashboardComponents/OutstandingComponents/OustandingItem";
import { OutstandingItem } from "@/types/GeneralTypes/ExpenseTypes";

interface Props {
  outstandings: OutstandingItem[];
}
const OutstandingList: React.FC<Props> = ({ outstandings }) => {
  return outstandings.length === 0 ? (
    <div className="flex items-center justify-center px-5 py-10 text-center rounded-lg text-brand font-brand-bold bg-brand-100">
      <FaExclamationCircle className="mr-2 text-3xl text-brand" />
      You have no outstandings
    </div>
  ) : (
    <div className="space-y-1">
      {outstandings.map((oustanding, index) => (
        <OutstandingItemComponent key={index} oustanding={oustanding} />
      ))}
    </div>
  );
};

export default OutstandingList;
