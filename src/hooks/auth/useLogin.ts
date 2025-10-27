import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { LoginCredentials } from "@/types/auth.types";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation<AxiosResponse, Error, LoginCredentials>({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  return {
    loginMutation,
  };
};
