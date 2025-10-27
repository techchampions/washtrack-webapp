import { api } from "@/api/api";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expense"],
      });
      showSuccess("Added Expense successfully");
    },
    onError() {
      showError("Failed to add Expense");
    },
  });
};
