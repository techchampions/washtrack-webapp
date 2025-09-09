import React from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import logo from "@/assets/images/logo.png";
import { Button } from "../common/Button";
import { useCompleteOnboardingStore } from "@/hooks/mutations/useCompleteOnboardingStore";

export default function CongratsScreen() {
  const { mutate: completeStore } = useCompleteOnboardingStore();
  const goHome = () => {
    completeStore();
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-center bg-cover min-w-screen md:min-h-0"
      style={{ backgroundImage: `url(${landingBannerImage})` }}
    >
      {/* <div className="absolute p-6 -top-4 left-8 -z-0 ">
        <img src={logo} alt="Wash Track Logo" className="w-40 h-40" />
      </div> */}
      <div className="w-full max-w-md p-8 mx-4 text-center bg-white shadow-lg rounded-2xl md:p-12">
        <div className="flex items-center justify-center h-0 p-0 mt-2 mb-7 ">
          <img
            src="/src/assets/images/logo.png"
            alt="Wash Track"
            className="w-25 h-25"
          />
          <div className="ml-5" />
        </div>

        <div className="flex justify-center mb-6">
          <div
            className="flex items-center justify-center w-20 h-20 rounded-full"
            style={{ backgroundColor: "#E6F8FF" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#00BCFF"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Congratulations!
        </h2>

        <p className="text-[#00BCFF] font-medium mb-4">
          Your setup is complete
        </p>

        <p className="mb-8 text-sm text-gray-600">
          You’re all set to start managing your laundry business with WashTrack
        </p>
        <Button
          type="button"
          onClick={goHome}
          className="w-full px-6 py-3 font-medium text-white transition rounded-full"
          style={{ backgroundColor: "#00BCFF", borderRadius: "40px" }}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
