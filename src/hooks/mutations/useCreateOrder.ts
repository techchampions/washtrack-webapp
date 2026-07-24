import { api } from "@/api/api";
import apiClient from "@/api/apiClient";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiClient.delete(`/api/order/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
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
