import React, { useEffect } from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import { useOnboardingStore, useUserStore } from "../../store/AppStore";
import apiClient from "../../utils/AxiosInstance";
import Button from "../FormComponents/Button";

function Header() {
  const { setIsLoggedIn, currentPlan, store } = useUserStore();
  const { setStep, setHasCompletedOnboarding } = useOnboardingStore();

  const handleLogout = () => {
    setStep("Get Started");
    setHasCompletedOnboarding(false);
    setIsLoggedIn(false);
  };
  // useEffect(() => {
  //   const fetchPlans = async () => {
  //     try {
  //       console.log("Fetching plans...");
  //       const response = await apiClient.get("/plans");
  //       if (response.status === 200) {
  //         const { current, plans, start_date, end_date, email } = response.data;

  //         useUserStore.getState().setPlans({
  //           current,
  //           plans,
  //           start_date,
  //           end_date,
  //         });

  //         useUserStore.getState().setEmail(email); // optionally update email too
  //       }
  //     } catch (error) {
  //       console.log("Error fetching data:", error);
  //     }
  //   };

  //   fetchPlans();
  // }, []);

  return (
    <div className="flex flex-col w-full md:w-[90%] mx-auto mb-6 space-y-3">
      <div className="flex justify-between items-center ">
        <div className="flex flex-row gap-1 items-center">
          <img
            // src="/images/profile-img.png"
            src={store?.logoUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="text-lg font-bold text-black">{store?.name}</h1>
          <span className="bg-brand-100 text-brand px-4 py-0.5 ml-2 rounded-md">
            {currentPlan?.name}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <FiBell className="text-xl text-black" />
          <FiSettings className="text-xl text-black" onClick={handleLogout} />
        </div>
      </div>
      <div className="bg-brand-100 text-brand flex md:hidden py-2 px-4 ml-2 rounded-md w-full justify-between">
        <p className="text-sm font-bold text-left w-full py-2">
          {currentPlan?.name}
        </p>
        <Button label="Upgrade" className="rounded-md py-0" />
      </div>
    </div>
  );
}

export default Header;
