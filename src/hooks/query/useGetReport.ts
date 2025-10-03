import { api } from "@/api/api";
import { MonthlyReportResponse } from "@/types/GeneralTypes/report";
import { useQuery } from "@tanstack/react-query";

export const useGetMonthlyReport = () => {
  return useQuery<MonthlyReportResponse>({
    queryKey: ["report"],
    queryFn: () => api.getMonthlyReport(),
  });
};
