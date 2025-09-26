import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useGetReport = () => {
  return useQuery({
    queryKey: ["report"],
    queryFn: () => api.getMonthlyReport,
  });
};
