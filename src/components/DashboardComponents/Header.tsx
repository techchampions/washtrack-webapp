import { useEffect } from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import { useOnboardingStore, useAuthStore } from "@/store/onboardingStore";
import Button from "../FormComponents/Button";
import { useProfileStore } from "@/store/ProfileStore";

function Header() {
  const { setStep, setHasCompletedOnboarding } = useOnboardingStore();
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const {getUserProfile, user, storeDetails, logoUrl} = useProfileStore();

  const handleLogout = async () => {
    await logoutUser(); 
    setStep("Get Started");
    setHasCompletedOnboarding(false);
  };

  useEffect(() => {
    getUserProfile();

  }, [])

   return (
    <div className="flex flex-col w-full md:w-[90%] mx-auto mb-6 space-y-3">
      <div className="flex justify-between items-center ">
        <div className="flex flex-row gap-1 items-center">
          <img
            // src="/images/profile-img.png"
            src={logoUrl || "/images/profile-img.png"}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="text-lg font-bold text-black">{storeDetails?.store_name}</h1>
          <span className="bg-brand-100 text-brand px-4 py-0.5 ml-2 rounded-md">
            {user?.plan?.name}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <FiBell className="text-xl text-black" />
          <FiSettings className="text-xl text-black" onClick={handleLogout} />
        </div>
      </div>
      <div className="bg-brand-100 text-brand flex md:hidden py-2 px-4 ml-2 rounded-md w-full justify-between">
        <p className="text-sm font-bold text-left w-full py-2">
          {user?.plan.name}
        </p>
        <Button label="Upgrade" className="rounded-md py-0" />
      </div>
    </div>
  );

}

export default Header;
