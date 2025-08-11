import React from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import { SignupForm } from "@/components/auth/SignupForm";

const SignupPage: React.FC = () => {
    return (
        <div className="relative w-screen h-screen overflow-hidden ">
            <img
                src={landingBannerImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="relative flex justify-center flex-row py-3  z-10">
                <div className="flex-1 relative"/>
                
                <div className="flex-1 relative">
                    <SignupForm />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
