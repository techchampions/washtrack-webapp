import OTPForm from "@/components/auth/OTPForm"
import React, { useEffect } from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import {useVerifyEmail} from "@/hooks/auth/useVerifyEmail";
import {useMutation} from "@tanstack/react-query"
import { authService } from "@/services/auth.service";
import { showError, showSuccess } from "@/utils/toast";
const VerifyEmailPage = () => {
    const {isPending, mutate: verifyEmail} = useVerifyEmail();
    const mutation = useMutation({
        mutationFn: authService.resendCode
    })

    const onSubmit =  (code: string) => {
        if (code.length !== 4) return;
        console.log(code, "-----code----------");
        verifyEmail({otp: parseInt(code)});
    }

       const resendOtpAgain = async () => {
        const payload = parseInt(code)
   
           mutation.mutate(payload, {
               onSuccess: (response) => {
                   if(response.status === 200 || response.status === 201) {
                       console.log(response.data.message, "in otp screen")
                       showSuccess(response.data.message)
                       console.log(response.data, "---------response data--------")
                   }
               },
               onError: (error: any) => {
                     
                       console.error("Unexpected error:", error);
                       showError(error.response.data.message)
                   
               },
               onSettled: () => {
                   
               },
           });
   
       };
   

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
                    <OTPForm onSubmit={onSubmit} resendOtp={resendOtpAgain}/>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailPage

