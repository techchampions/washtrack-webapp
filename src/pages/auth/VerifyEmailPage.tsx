import OTPForm from "@/components/auth/OTPForm"
import React from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";


const VerifyEmailPage = () => {

    const onSubmit = async (code: string) => {
        if (code.length !== 4) return;
        console.log(code, "-----code----------");
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div>
                <img
                    src={landingBannerImage}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover z-10"
                />
            </div>
            <div
                className="relative flex flex-row items-center justify-between py-3 z-10 h-screen w-screen">
                <div className="flex-2 relative lg:mr-10" />
                <div className="relative flex-2">
                    <OTPForm onSubmit={onSubmit} isLoading={false} />
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailPage
