import apiClient from "@/api/apiClient";
import { useModal } from "@/store/useModal.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useMakeWithdrawal = () => {
  const queryClient = useQueryClient();
  const modal = useModal.getState();

  return useMutation({
    mutationFn: async (payload: WithdrawalPayload) => {
      const res = await apiClient.post(`/api/wallet/withdraw`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["referral-stats"],
      });
      toast.success("withdrawal request made.");
      modal.closeModal();
    },
    // onError(err: AxiosError) {
    //   //   toast.error(err.message);
    // },
  });
};
