import { branchServices } from "@/services/branches.service";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
export const useCreateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: branchServices.createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["branches"],
      });
      showSuccess("Added Branch successfully");
    },
    onError(error: AxiosError<ErrorResponse>) {
      const errorMessage = error.response?.data.message;
      if (errorMessage) {
        showError(errorMessage);
      } else {
        showError("Failed to add Branch");
      }
    },
  });
};
export const useUpdateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: branchServices.updateBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["branches"],
      });
      showSuccess("Updated Branch successfully");
    },
    onError(error: AxiosError<ErrorResponse>) {
      const errorMessage = error.response?.data.message;
      if (errorMessage) {
        showError(errorMessage);
      } else {
        showError("Failed to update Branch");
      }
    },
  });
};
export const useDeleteBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: branchServices.deleteBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["branches"],
      });
      showSuccess("Deleted Branch successfully");
    },
    onError(error: AxiosError<ErrorResponse>) {
      const errorMessage = error.response?.data.message;
      if (errorMessage) {
        showError(errorMessage);
      } else {
        showError("Failed to delete Branch");
      }
    },
  });
};
