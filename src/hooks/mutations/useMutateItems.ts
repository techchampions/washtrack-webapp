import { itemsService } from "@/services/items.service";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: itemsService.updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
      showSuccess("Updated Item successfully");
    },
    onError() {
      showError("Failed to Update item");
    },
  });
};
export const useAddItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: itemsService.postItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
      showSuccess("Added item successfully");
    },
    onError() {
      showError("Failed to add item");
    },
  });
};
// export const useDeleteService = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: itemsService.getItem,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["services"],
//       });
//       showSuccess("Deleted service successfully");
//     },
//     onError() {
//       showError("Failed to deleted service");
//     },
//   });
// };
