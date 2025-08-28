import React from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import { SignupForm } from "@/components/auth/SignupForm";
import { useNavigate, Link } from "react-router-dom";


const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    return (
         <div
      className="min-h-screen relative  min-w-screen md:min-h-0 overflow-hidden flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${landingBannerImage})` }}
    >
            {/* <img */}
            {/*     src={landingBannerImage} */}
            {/*     alt="Background" */}
            {/*     className="absolute inset-0 w-full h-full object-cover z-0" */}
            {/* /> */}
            {/**/}
       
              

                <div className="flex-1 relative">
                    <SignupForm />
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
