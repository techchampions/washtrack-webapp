import React, {useEffect} from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import {useUserProfile } from "@/hooks/auth/useUserProfile";
import { useAuthStore } from "@/store/auth.store";

const LoginPage: React.FC = () => {
  //  const { data } = useUserProfile();
  //  const {setUser} = useAuthStore();

  // useEffect(() => {
  //   console.log(data?.data.success, "success")
  //   if (data?.data.success) {
  //     console.log("Profile loaded:", data?.data.user);
  //     setUser(data.data.user);
  //   }
  // }, [data?.data?.user]);


  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={landingBannerImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
