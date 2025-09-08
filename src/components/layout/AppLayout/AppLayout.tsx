import { Header, Modal } from "@/components/DashboardComponents";
import BottomNav from "@/components/layout/AppLayout/MobileNavContainer";
import NavigationContainer from "@/components/layout/AppLayout/NavigationContainer";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex w-screen h-screen">
      {/* Sidebar */}
      <aside className="hidden w-[320px] bg-brand text-white p-4 md:flex flex-col">
        <NavigationContainer />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 mb-16 overflow-y-auto bg-white md:mb-0">
        {/* Header */}
        <Header />
        <Outlet />
      </main>
      <div className="fixed bottom-0 w-full md:block">
        <BottomNav />
      </div>
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="text-2xl text-black">
            Create Order for New user or Existing user
          </div>
        </Modal>
      )}
    </div>
  );
};
