import OTPForm from "@/components/auth/OTPForm"
import React from "react";

const VerifyEmailPage = () => {

    
    return (
        <div className="relative w-screen h-screen overflow-hidden">

            <div className="relative flex justify center flex-row py-3  z-10">
                <div className="relative flex-1" />
            <OTPForm onSubmit={""} />

            </div>
        </div>
    )
    
}

export default VerifyEmailPage