// CongratsScreen.tsx
import React from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import logo from "@/assets/images/logo.png"
export default function CongratsScreen() {
  return (
   <div
      className="min-h-screen relative  min-w-screen md:min-h-0 overflow-hidden flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${landingBannerImage})` }}
    >
       <div className="p-6 absolute inset-0 -top-8 ">
          <img src={logo}  alt="Wash Track Logo" className="h-50 w-50" />
        </div>
       
      <div className="">
        <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 text-center max-w-md w-full mx-4">
    
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full" style={{ backgroundColor: "#E6F8FF" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#00BCFF"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

        
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Congratulations!
          </h2>

          {/* Subtitle */}
          <p className="text-[#00BCFF] font-medium mb-4">
            Your setup is complete
          </p>

          {/* Description */}
          <p className="text-gray-600 mb-8 text-sm">
            You’re all set to start managing your laundry business with WashTrack
          </p>

          {/* Button */}
          <button
            className="w-full rounded-full py-3 px-6 text-white font-medium transition"
            style={{ backgroundColor: "#00BCFF" }}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
