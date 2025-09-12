import OTPForm from "@/components/auth/OTPForm";
import React from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { showError, showSuccess } from "@/utils/toast";
import { AxiosError } from "axios";

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
      onError: (error) => {
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
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <img
          src={landingBannerImage}
          alt="Background"
          className="relative md:absolute md:inset-0 md:w-full md:h-full md:object-cover z-10"
        />
      </div>
      <div className="relative flex flex-row items-center justify-between py-3 z-10 h-screen w-screen">
        <div className="flex-none md:flex-2  relative xl:mr-10" />
        <div className="relative flex-2">
          <OTPForm
            onSubmit={onSubmit}
            isLoading={isPending || isLoading}
            resendOtp={resendOtpAgain}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
