import React from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={landingBannerImage}
        alt="Background"
        className="absolute inset-0 z-0 object-cover w-full h-full"
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
