import { useOnboardingStore, useUserStore } from "../../store/AppStore";
import Button from "../FormComponents/Button";

function GetStarted() {
  const { setStep } = useOnboardingStore();
  const { isLoggedIn } = useUserStore();
  const handleGetStarted = () => {
    setStep("signup");
  };

  return (
    <div className=" w-full">
      {/* Logo */}
      <div className="flex justify-center">
        <img
          src="./images/logo-blue.png"
          alt="WashTrack"
          className="h-[75px]"
        />
      </div>

      <div className="flex justify-center mb-4">
        <img
          src="./images/onboardingt-shirt.png"
          alt="WashTrack"
          className="h-[300px]"
        />
      </div>

      {/* Action Button */}
      <Button
        label={isLoggedIn ? "Log in" : "Create Account"}
        onClick={handleGetStarted}
      />

      {/* Toggle Login / Signup */}
      <p className="text-gray-500 mt-4 text-center font-medium">
        {isLoggedIn ? "New here?" : "Have an account?"}
        <span
          className="text-blue-500 cursor-pointer ml-1"
          onClick={() => setStep("login")}>
          {isLoggedIn ? "Sign up" : "Log in"}
        </span>
      </p>
    </div>
  );
}

export default GetStarted;
