// import { Header } from "@/components/DashboardComponents";
import BottomNav from "@/components/layout/AppLayout/MobileNavContainer";
import NavigationContainer from "@/components/layout/AppLayout/NavigationContainer";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AppLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex w-screen h-screen scrollbar-hide">
      {/* Sidebar */}
      <aside className="hidden w-[300px] bg-brand text-white p-4 md:flex flex-col">
        <NavigationContainer />
      </aside>
      <div
        onClick={() => navigate(-1)}
        className="bg-white hover:bg-gray-100 cursor-pointer text-gray-500 font-bold hidden md:flex items-center justify-center p-2 rounded-full absolute top-4 left-[277px] border border-gray-300"
      >
        <ChevronLeft strokeWidth={3} />
      </div>
      {/* Main Content */}
      <main className="flex-1 mb-16 overflow-y-auto bg-white md:mb-0 scrollbar-hide py-2">
        {/* Header */}
        {/* <Header /> */}
        <div className="px-2.5 md:px-7">
          <Outlet />
        </div>
      </main>
      <div className="fixed bottom-0 w-full md:block">
        <BottomNav />
      </div>
    </div>
  );
};
