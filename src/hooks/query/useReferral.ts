import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
export const useGetReferralStats = () => {
  return useQuery<ApiResponse<ReferralStatData>>({
    queryKey: ["referral-stats"],
    queryFn: api.getReferralStats,
  });
};
