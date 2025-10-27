import { api } from "@/api/api";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      showSuccess("Change Password successfully");
    },
    onError() {
      showError("Failed to change password");
    },
  });
};
