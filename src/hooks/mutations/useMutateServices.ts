import { servicesService } from "@/services/services.service";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesService.updateServices,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      showSuccess("Updated service successfully");
    },
    onError() {
      showError("Failed to Update service");
    },
  });
};
export const useAddService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesService.addServices,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      showSuccess("Added service successfully");
    },
    onError() {
      showError("Failed to add service");
    },
  });
};
export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesService.deleteServices,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      showSuccess("Deleted service successfully");
    },
    onError() {
      showError("Failed to deleted service");
    },
  });
};
