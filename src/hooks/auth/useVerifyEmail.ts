/* eslint-disable @typescript-eslint/no-explicit-any */
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    setIsAuthenticated,
    storeUpdated,
    setError,
    setLoading,
    setOtpVerified,
  } = useAuthStore();

  const mutation = useMutation({
    mutationFn: authService.verifyUser,
    onMutate: () => {
      setError(null);
      setLoading(true);
    },
    onSuccess: (response) => {
      console.log("✅ Verify Email success:", response.data);
      if (
        response.data.success &&
        (response.status === 200 || response.status === 201)
      ) {
        queryClient.invalidateQueries({
          queryKey: ["user-profile"],
        });

        console.log(response.data.message, "in verfiy email");
        showSuccess(response.data.message);
        setOtpVerified(response.data.verify);
        setIsAuthenticated(response.data.verify);
        setError(null);
        console.log(response.data, "---------response data--------");
        if (!storeUpdated) {
          navigate("/auth/auth-flow-complete");
        } else {
          navigate("/dashboard");
        }
      }
    },
    onError: (error: any) => {
      console.error("❌ Verify Email error:", error.response);
      showError(error.response.data.message);

      setError(error.message);
    },
    onSettled: () => {
      console.log("🔁 Verify Email request settled (success or error)");
      setLoading(false);
    },
  });

  return {
    ...mutation,
    verifyEmail: mutation.mutate,
    verifyEmailAsync: mutation.mutateAsync,
  };
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: authService.resendCode,
    onSuccess: (response) => {
      console.log("✅ OTP resent success:", response.data);
      showSuccess("OTP code resent successfully");
    },
    onError: (error: any) => {
      showError("Failed to resend OTP code");
      console.error("❌ Resend OTP error:", error.response);
    },
    retry: 0,
  });
};
