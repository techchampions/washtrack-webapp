import { api } from "@/api/api";
import { OutStandingResponse } from "@/types/GeneralTypes/ExpenseTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetOustanding = (filter: string) => {
  return useQuery<OutStandingResponse>({
    queryKey: ["outstanding", filter],
    queryFn: () => api.getAllOutstanding(filter),
  });
};
export const useGetOustandingList = () => {
  return useQuery<OutStandingResponse>({
    queryKey: ["outstanding"],
    queryFn: () => api.getAllOutstanding(),
  });
};
