import { orderService } from "@/services/orders.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddItemForOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderService.addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["item"],
      });
    },
  });
};
