import {
  CustomDropdown,
  Header,
  MainCard,
  RightSideBar,
} from "@/components/DashboardComponents";
import ExpenseList from "@/components/DashboardComponents/ExpenseComponents/ExpenseList";
import OrderItemLoading from "@/components/DashboardComponents/OrderItemLoading";
import LinkButton from "@/components/GeneralComponents/LinkButton";
import { useGetHomeExpense } from "@/hooks/query/usegetExpense";
import { formatPrice } from "@/utils/formatter";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

const ExpenseIndex = () => {
  const [filter, setfilter] = useState("all");
  const { data, isLoading } = useGetHomeExpense(filter);
  if (isLoading) {
    return <OrderItemLoading />;
  }
  const expenses = data?.Expense ?? [];
  return (
    <div>
      <Header />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 space-y-5">
          <div className="h-[240px]">
            <MainCard>
              <div className="mb-4 text-black">
                <CustomDropdown
                  options={["all", "Today", "Yesterday", "this_week"]}
                  selected={filter}
                  onSelect={setfilter}
                />
              </div>
              <div>
                <p className="flex flex-row items-center gap-2 text-lg">
                  Total Expenses
                </p>
                <h2 className="text-[40px] md:text-[60px] font-bold">
                  {formatPrice(data?.totalExpenses || "")}
                </h2>
              </div>
            </MainCard>
          </div>
          <div className="space-y-2">
            <h3 className="text-left font-bold text-2xl">Expense</h3>
            <ExpenseList expenses={expenses} />
            <div className="mt-5">
              <LinkButton
                href="/dashboard/expenses/list"
                label="View More"
                rightIcon={<ArrowRight />}
                className="!font-bold !text-quick-action-icon"
              />
            </div>
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default ExpenseIndex;
