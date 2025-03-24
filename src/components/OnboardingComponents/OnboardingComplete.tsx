import { useOnboardingStore, useUserStore } from "../../store/AppStore";
import Button from "../FormComponents/Button";
import { FaCheckCircle } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";

const OnboardingComplete = () => {
  const { setHasCompletedOnboarding } = useOnboardingStore();
  const { setIsLoggedIn } = useUserStore();
  const navigate = useNavigate();
  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-lg mx-auto p-4 relative">
      <DotLottieReact
        src="./images/animation.lottie"
        autoplay
        loop
        className="absolute w-[600px] top-0"
      />
      <FaCheckCircle className="text-brand h-[150px] w-[150px]" />
      <h2 className="text-2xl font-semibold text-black text-center">
        Congratulations
      </h2>
      <p className="text-brand font-bold text-center">Your setup is complete</p>

      <p className="text-gray-600 text-center mt-6">
        You’re all set to start managing your laundry business with WashTrack
      </p>

      <Button label="Go to Home" onClick={handleCompleteOnboarding} />
    </div>
  );
};

export default OnboardingComplete;
