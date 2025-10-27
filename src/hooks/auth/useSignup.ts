import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { SignupData } from "@/types/auth.types";

export const useSignup = () => {
  const queryClient = useQueryClient();

  const signUpMutation = useMutation<AxiosResponse, Error, SignupData>({
    mutationFn: authService.signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  return {
    signUpMutation,
  };
};
