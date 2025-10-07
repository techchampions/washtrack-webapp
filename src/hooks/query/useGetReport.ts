import { api } from "@/api/api";
import { MonthlyReportResponse } from "@/types/GeneralTypes/report";
import { useQuery } from "@tanstack/react-query";

export const useGetMonthlyReport = (type: string) => {
  return useQuery<MonthlyReportResponse>({
    queryKey: ["report", type],
    queryFn: () => api.getMonthlyReport(type),
    enabled: !!type,
  });
};
