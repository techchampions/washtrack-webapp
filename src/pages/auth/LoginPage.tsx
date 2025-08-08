import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import logoImage from "@/assets/images/logo.png";

const LoginPage: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={landingBannerImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <img
          src={logoImage}
          alt="Wash Track"
          className="w-32 h-auto mb-6"
        />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
