import GetStarted from "./GetStarted";
import SignUp from "./SignupPage";
import Login from "./LoginPage";
import OTP from "./OTP";
import StoreSetup from "../onboarding/StoreSetup";
import SignupComplete from "./SignupComplete";
import AddServices from "../onboarding/AddServices";
import AddItems from "../onboarding/AddItems";
import OnboardingComplete from "../onboarding/OnboardingComplete";
import { useOnboardingStore, useAuthStore } from "@/store/onboardingStore";
import { useEffect, useCallback, useState } from "react";

const Onboarding = () => {
  const step = useOnboardingStore((state) => state.step);
  const [renderStepContainer, setStepContainer] = useState<any>(null)

   const stepContainer = () => {
    switch (step) {
      case "Get Started":
        return <GetStarted />;
      case "signup":
        return <SignUp />;
      case "login":
        return <Login />;
      case "verify OTP":
        return <OTP />;
      case "signup completed":
        return <SignupComplete />;
      case "setup store":
        return <StoreSetup />;
      case "add services":
        return <AddServices />;
      case "add items":
        return <AddItems />;
      case "onboarding complete":
        return <OnboardingComplete />;
      default:
        return <GetStarted />;
    }
  };

  const handleReset = () => {
    useAuthStore.getState().reset(); // Reset user store
    useOnboardingStore.getState().reset(); // Reset onboarding store

    localStorage.removeItem("user-state"); // Clear persisted user state
    localStorage.removeItem("onboarding-state"); // Clear persisted onboarding state

    window.location.reload(); // Optional: Refresh page to clear UI state
  };


  useEffect(() => {
     console.log(step,"------step------------")
    setStepContainer(<>
    <div className="fixed inset-0 z-50 h-screen w-full overflow-y-auto">
      {/* Background Image */}
      <img
        src="../images/onboardingBG.png"
        alt="Onboarding Background"
        className="absolute inset-0 w-full h-screen object-cover"
      />
      <img
        src="./images/logo.png"
        alt="Wash Track"
        className="absolute top-[40px] left-[60px] w-[250px] h-[50px] opacity-70"
        onClick={handleReset}
      />
      <div className="flex w-full justify-center">
        <div className="absolute flex flex-row justify-end items-start my-auto h-screen w-[95%] md:w-[80%]">
          {/* Onboarding Content Container */}
          <div className="w-full md:w-[480px] max-w-[600px] min-h-[600px] md:min-h-[600px] max-h-[80vh] md:max-h-max bg-white py-[20px] px-5 md:px-8 rounded-[25px] shadow-lg flex flex-col items-center justify-start my-auto ">
            {
              stepContainer()
            }
            
          </div>
        </div>
      </div>
    </div>
    </>)
  }, [step, ]);

  // const AuthFlowContent = useCallback(() => {
  //  console.log("Current onboarding step:", step);
    
  //   setStepContainer(<>
  //    {stepContainer()}
  //   </>)

    
  // }, [step])



 
  return (
    <>
  {renderStepContainer}

    </>
  );
};

export default Onboarding;
