import ExpenseDetail from "@/components/DashboardComponents/ExpenseComponents/ExpenseDetail";
import { useModal } from "@/store/useModal.store";
import { Expense } from "@/types/GeneralTypes/ExpenseTypes";
import { formatDate, formatPrice } from "@/utils/formatter";
import React from "react";
import { CiMoneyBill } from "react-icons/ci";

interface Props {
  expense: Expense;
}

const ExpenseItem: React.FC<Props> = ({ expense }) => {
  const modal = useModal();
  return (
    <div
      onClick={() => modal.openModal(<ExpenseDetail expense={expense} />)}
      className="bg-brand-100 cursor-pointer text-[12px] md:text-[16px] p-2 rounded-lg border border-gray-200 flex flex-row justify-between items-center gap-4"
    >
      {/* Icon */}
      <div className="h-12 w-12 p-1 rounded-full flex justify-center items-center bg-brand-200">
        <CiMoneyBill className="h-full w-full text-quick-action-icon" />
      </div>

      {/* Customer Details */}
      <div className="flex-1 text-left w-full">
        <p className="text-quick-action-icon font-semibold">
          {expense.expense_name}
        </p>
        <p className="text-gray-500">
          {`VIVI`} - {`0909090909`}
        </p>
      </div>

      {/* Customer Date & Amount */}
      <div className="text-right">
        <div className="">{formatDate(expense.updated_at)}</div>
        <div className="text-red-500">{formatPrice(expense.amount)}</div>
      </div>
    </div>
  );
};

export default ExpenseItem;
