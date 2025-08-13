import React from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import { SignupForm } from "@/components/auth/SignupForm";
import { Button } from "@/components/common/Button/Button"
import { useNavigate, Link } from "react-router-dom";


const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <img
                src={landingBannerImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="relative flex justify-center flex-row py-3  z-10">
                <div className="flex-1 relative" />

                <div className="flex-1 relative">
                    <SignupForm />
                </div>
            </div>
            {/* <div className="absolute inset-0">
                <Link
                    to="/auth/verify-email"
                    className="font-medium text-brand"
                >
                    Sign up
                </Link>
            </div> */}
        </div>
    );
};

export default SignupPage;
