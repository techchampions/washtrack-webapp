import { Header } from "@/components/DashboardComponents";
import ExpenseList from "@/components/DashboardComponents/ExpenseComponents/ExpenseList";
import OrderItemLoading from "@/components/DashboardComponents/OrderItemLoading";
import { useGetAllExpense } from "@/hooks/query/usegetExpense";
import React from "react";

const AllExpenseList = () => {
  const { data, isLoading } = useGetAllExpense();
  if (isLoading) {
    return <OrderItemLoading />;
  }
  const expenses = data?.Expense ?? [];
  return (
    <div>
      <Header />
      <div className="">
        <h3 className="font-bold text-2xl text-left mb-4">Expense List</h3>
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
};

export default AllExpenseList;
