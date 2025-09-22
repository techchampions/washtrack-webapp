import { api } from "@/api/api";
import { showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePayOutstandingBalance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.payOutstandingBalance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      showSuccess("Oustanding Balance Updated Successfully");
    },
  });
};
