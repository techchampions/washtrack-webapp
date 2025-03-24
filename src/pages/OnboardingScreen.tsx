import GetStarted from "../components/OnboardingComponents/GetStarted";
import SignUp from "../components/OnboardingComponents/SignUp";
import Login from "../components/OnboardingComponents/Login";
import { useOnboardingStore } from "../store/AppStore";
import OTP from "../components/OnboardingComponents/OTP";
import StoreSetup from "../components/OnboardingComponents/StoreSetup";
import SignupComplete from "../components/OnboardingComponents/SignupComplete";
import AddServices from "../components/OnboardingComponents/AddServices";
import AddItems from "../components/OnboardingComponents/AddItems";
import OnboardingComplete from "../components/OnboardingComponents/OnboardingComplete";

const Onboarding = () => {
  const { step } = useOnboardingStore();
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
  return (
    <div className="fixed inset-0 z-50 h-screen w-full ">
      {/* Background Image */}
      <img
        src="./images/onboardingBG.png"
        alt="Onboarding Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <img
        src="./images/logo.png"
        alt="Wash Track"
        className="relative top-[70px] left-[60px] w-[250px] h-[50px] opacity-70"
      />
      <div className="flex w-full justify-center">
        <div className="absolute flex flex-row justify-center items-start my-auto h-screen w-[90%]">
          <div className="w-1/2 bg-opacity-40"></div>
          {/* <GetStarted/> */}

          {/* Onboarding Content Container */}
          <div className=" w-1/2 max-w-[600px] min-h-[600px] bg-white py-[20px] px-20 rounded-[25px] shadow-lg flex flex-col items-center justify-start">
            {stepContainer()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
