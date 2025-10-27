import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { RevenueItem } from "@/types/GeneralTypes/revenueTypes";
import RevenueItemComponent from "@/components/DashboardComponents/RevenueComponents/RevenueItem";

interface Props {
  revenues: RevenueItem[];
}
const RevenueList: React.FC<Props> = ({ revenues }) => {
  return revenues.length === 0 ? (
    <div className="flex items-center justify-center px-5 py-10 text-center rounded-lg text-brand font-brand-bold bg-brand-100">
      <FaExclamationCircle className="mr-2 text-3xl text-brand" />
      You have no revenues
    </div>
  ) : (
    <div className="space-y-1">
      {revenues.map((revenue, index) => (
        <RevenueItemComponent key={index} revenue={revenue} />
      ))}
    </div>
  );
};

export default RevenueList;
