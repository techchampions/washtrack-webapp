import { api } from "@/api/api";
import { RevenueResponse } from "@/types/GeneralTypes/revenueTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetRevenue = (filter: string) => {
  return useQuery<RevenueResponse>({
    queryKey: ["revenue", filter],
    queryFn: () => api.getRevenue(filter),
  });
};
export const useGetRevenueList = () => {
  return useQuery<RevenueResponse>({
    queryKey: ["revenue"],
    queryFn: () => api.getRevenueList(),
  });
};
