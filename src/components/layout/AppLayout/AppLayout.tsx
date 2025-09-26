// import { Header } from "@/components/DashboardComponents";
import BottomNav from "@/components/layout/AppLayout/MobileNavContainer";
import NavigationContainer from "@/components/layout/AppLayout/NavigationContainer";
import React from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="fixed inset-0 z-50 flex w-screen h-screen scrollbar-hide">
      {/* Sidebar */}
      <aside className="hidden w-[300px] bg-brand text-white p-4 md:flex flex-col">
        <NavigationContainer />
      </aside>

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
