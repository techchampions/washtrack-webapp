import React from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import { useOnboardingStore, useUserStore } from "../../store/AppStore";

function Header() {
  const { setIsLoggedIn } = useUserStore();
  const { setStep, setHasCompletedOnboarding } = useOnboardingStore();
  const handleLogout = () => {
    setStep("Get Started");
    setHasCompletedOnboarding(false);
    setIsLoggedIn(false);
  };
  return (
    <div className="flex justify-between items-center mb-6 w-[90%] mx-auto">
      <div className="flex flex-row gap-1">
        <img
          src="./images/profile-img.png"
          alt=""
          className="h-8 w-8 rounded-full"
        />
        <h1 className="text-lg font-bold text-black">Victoria's Laundry</h1>
      </div>
      <div className="flex items-center space-x-4">
        <FiBell className="text-xl text-black" />
        <FiSettings className="text-xl text-black" onClick={handleLogout} />
      </div>
    </div>
  );
}

export default Header;
