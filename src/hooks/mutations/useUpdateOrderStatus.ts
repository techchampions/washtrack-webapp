import { api } from "@/api/api";
import { useModal } from "@/store/useModal.store";
import { showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.changeOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      showSuccess("Updated order status");
    },
  });
};
export const useCompleteOrder = () => {
  const queryClient = useQueryClient();
  const modal = useModal();
  return useMutation({
    mutationFn: api.completeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      showSuccess("Completed order successfully");
      modal.closeModal();
    },
  });
};
