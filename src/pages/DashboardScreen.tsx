import NavigationContainer from "../components/NavigationComponents/NavigationContainer";
import Header from "../components/DashboardComponents/Header";
import { Outlet } from "react-router-dom";
import MobileNavContainer from "../components/NavigationComponents/MobileNavContainer";
function DashboardScreen() {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="hidden w-[320px] bg-brand text-white p-4 md:flex flex-col">
        <NavigationContainer />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white overflow-y-auto">
        {/* Header */}
        <Header />
        <Outlet />
      </main>
      <div className="fixed bottom-0 w-full">
        <MobileNavContainer />
      </div>
    </div>
  );
}

export default DashboardScreen;
