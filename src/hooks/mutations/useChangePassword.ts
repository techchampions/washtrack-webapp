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
export const useChangePasswordOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.changePasswordOnboarding,
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
export const useForgotPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.forgotPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      showSuccess("OTP code sent your email");
    },
    onError() {
      showError("Failed to send code... input valid email.");
    },
  });
};
export const useVerifyOTP = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.verifyUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      showSuccess("verified OTP successfully");
    },
    onError() {
      showError("Failed to send code... input valid email.");
    },
  });
};
