import OTPForm from "@/components/auth/OTPForm"
import React from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
const VerifyEmailPage = () => {

    
    return (
        <div className="relative w-screen h-screen overflow-hidden">
       <div>
      <img
        src={landingBannerImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-10"
      />
      </div>

            <div className="relative flex justify center flex-row py-3  z-10">
                <div className="relative flex-1 border border-red-500" />
            <OTPForm onSubmit={""} />

            </div>
        </div>
    )
    
}

export default VerifyEmailPage
