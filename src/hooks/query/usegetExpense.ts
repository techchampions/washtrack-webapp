import { api } from "@/api/api";
import { HomeExpenses } from "@/types/GeneralTypes/ExpenseTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetHomeExpense = (filter: string) => {
  return useQuery<HomeExpenses>({
    queryKey: ["expense", filter],
    queryFn: () => api.getExpense(filter),
  });
};
export const useGetAllExpense = () => {
  return useQuery<HomeExpenses>({
    queryKey: ["expense"],
    queryFn: () => api.getAllExpense(),
  });
};
