// import Button from "../components/FormComponents/Button";
import { useOnboardingStore, useUserStore } from "../store/AppStore";
import { useState } from "react";
import NavigationContainer from "../components/NavigationComponents/NavigationContainer";
import Header from "../components/DashboardComponents/Header";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./HomeScreen";

function DashboardScreen() {
  const [activeTab, setActiveTab] = useState("Today");

  const { setIsLoggedIn } = useUserStore();
  const { setHasCompletedOnboarding, setStep } = useOnboardingStore();
  const handleSignOut = () => {
    // Sign out logic
    setStep("Get Started");
    setHasCompletedOnboarding(false);
    setIsLoggedIn(false);
    console.log("Logging out");
  };
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-brand text-white p-4 flex flex-col">
        <NavigationContainer />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Header */}
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          {/* <Route path="/add-order" element={<HomeScreen />}></Route> */}
        </Routes>
      </main>
    </div>
  );
}

export default DashboardScreen;
