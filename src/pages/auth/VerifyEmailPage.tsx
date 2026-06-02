/* eslint-disable @typescript-eslint/no-explicit-any */
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import OTPForm from "@/components/auth/OTPForm";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
import { authService } from "@/services/auth.service";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const VerifyEmailPage = () => {
  const { isPending = false, mutate: verifyEmail } = useVerifyEmail();
  const [isLoading, setIsLoading] = React.useState(false);

  const mutation = useMutation({
    mutationFn: authService.resendCode,
  });

  const onSubmit = async (code: string) => {
    if (code.length !== 4) return;
    console.log(code, "-----code----------");
    verifyEmail({ otp: parseInt(code) });
  };

  const resendOtpAgain = async () => {
    setIsLoading(true);
    const payload = { otp: null };

    mutation.mutate(payload, {
      onSuccess: (response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response.data.message, "in otp screen");
          showSuccess(response.data.message);
          console.log(response.data, "---------response data--------");
        }
      },
      onError: (error: any) => {
        console.error("Unexpected error:", error);
        showError(error.response.data.message);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 hidden w-full h-full md:block">
        <img
          src={landingBannerImage}
          alt="Background"
          className="relative z-10 md:absolute md:inset-0 md:w-full md:h-full md:object-cover"
        />
      </div>
      <div className="relative z-10 flex flex-row items-center justify-between w-screen h-screen py-3">
        <div className="relative flex-none md:flex-2 xl:mr-10" />
        <div className="relative flex-2">
          <OTPForm
            onSubmit={onSubmit}
            isLoading={isPending || isLoading}
            reSending={mutation.isPending}
            resendOtp={resendOtpAgain}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
