import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import ExpenseItem from "@/components/DashboardComponents/ExpenseComponents/ExpenseItem";
import { Expense } from "@/types/GeneralTypes/ExpenseTypes";

interface Props {
  expenses: Expense[];
}
const ExpenseList: React.FC<Props> = ({ expenses }) => {
  return expenses.length === 0 ? (
    <div className="flex items-center justify-center px-5 py-10 text-center rounded-lg text-brand font-brand-bold bg-brand-100">
      <FaExclamationCircle className="mr-2 text-3xl text-brand" />
      You have no expenses
    </div>
  ) : (
    <div className="space-y-1">
      {expenses.map((expense, index) => (
        <ExpenseItem key={index} expense={expense} />
      ))}
    </div>
  );
};

export default ExpenseList;
