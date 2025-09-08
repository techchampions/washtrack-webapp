import React from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import { SignupForm } from "@/components/auth/SignupForm";

const SignupPage: React.FC = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-center bg-cover min-w-screen md:min-h-0"
      style={{ backgroundImage: `url(${landingBannerImage})` }}
    >
      <div className="relative flex-1">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
