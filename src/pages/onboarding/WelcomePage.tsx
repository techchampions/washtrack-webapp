import React from "react";
import CongratsScreen from "@/components/onboarding/Congratulations";

const WelcomePage: React.FC = () => {

  return (
    <div className="min-h-screen flex w-full bg-white">
      <CongratsScreen />
    </div>
  )
}

export default WelcomePage;