import { Header } from "@/components/DashboardComponents";
import CreateExpense from "@/components/DashboardComponents/ExpenseComponents/CreateExpense";
import ExpenseList from "@/components/DashboardComponents/ExpenseComponents/ExpenseList";
import OrderItemLoading from "@/components/DashboardComponents/OrderItemLoading";
import { useGetAllExpense } from "@/hooks/query/usegetExpense";
import { useModal } from "@/store/useModal.store";
import { PlusCircle } from "lucide-react";
import React from "react";

const AllExpenseList = () => {
  const { data, isLoading } = useGetAllExpense();
  const modal = useModal();
  if (isLoading) {
    return <OrderItemLoading />;
  }
  const expenses = data?.Expense ?? [];
  return (
    <div>
      <Header />
      <div className="">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-2xl text-left mb-4">Expense List</h3>
          <PlusCircle
            className="cursor-pointer"
            onClick={() => modal.openModal(<CreateExpense />)}
          />
        </div>
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
};

export default AllExpenseList;
