import { Expense } from "@/types/GeneralTypes/ExpenseTypes";
import { formatDate } from "@/utils/formatter";
import React from "react";
interface Props {
  expense: Expense;
}
const ExpenseDetail: React.FC<Props> = ({ expense }) => {
  return (
    <div className="">
      <h3 className="absolute mb-5 text-2xl font-bold text-left top-2 left-4">
        Expense Overview
      </h3>
      <div className="py-2 font-medium text-left">Expense Details</div>
      <div className="p-2 text-left border border-gray-200 divide-gray-200 rounded-md bg-brand-100 divide-y-1 ">
        <div className="pt-0 pb-5">
          <div className="flex justify-between">
            <span className="font-medium">Expense Name:</span>
            <span className="text-gray-500">{expense.expense_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Expense Amount:</span>
            <span className="text-gray-500">{expense.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Expense Date:</span>
            <span className="text-gray-500">
              {formatDate(expense.updated_at)}
            </span>
          </div>
        </div>
        <div className="py-5">
          <div className="font-medium text-left">Description</div>
          <p className="text-sm text-gray-500">{expense.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetail;
