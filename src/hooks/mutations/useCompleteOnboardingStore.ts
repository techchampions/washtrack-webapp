import apiClient from "@/api/apiClient";
import { Order } from "@/types/GeneralTypes/profiletypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
export const completeStoreUpdate = async (): Promise<Order[]> => {
  const response = await apiClient.post("/api/update-store-setup");
  return response.data;
};

export const useCompleteOnboardingStore = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: completeStoreUpdate,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user-store"],
      });
      navigate("/dashboard", { replace: true });
    },
  });
};
