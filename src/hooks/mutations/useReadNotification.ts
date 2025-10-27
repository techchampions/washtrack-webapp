import { api } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};
