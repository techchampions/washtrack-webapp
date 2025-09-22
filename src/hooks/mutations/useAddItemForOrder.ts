import { orderService } from "@/services/orders.service";
import { showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddItemForOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderService.addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order-items"],
      });
    },
  });
};
export const useEditItemForOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderService.updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order-items"],
      });
    },
  });
};
export const useDeleteItemForOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderService.deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order-items"],
      });
      showSuccess("Item Deleted");
    },
  });
};
