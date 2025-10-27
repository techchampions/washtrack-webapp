import { api } from "@/api/api";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.editCustomerProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer"],
      });
      showSuccess("Updated Customer successfully");
    },
    onError() {
      showError("Failed to Update Customer");
    },
  });
};
