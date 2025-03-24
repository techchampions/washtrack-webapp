// import Button from "../components/FormComponents/Button";
import { useOnboardingStore, useUserStore } from "../store/AppStore";
import { useState } from "react";
import { FiSettings, FiBell } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";

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
    // <div className="min-h-screen bg-secondary flex flex-grow text-tertiary">
    //   <aside className="md:w-[14rem] lg:w-64 h-full bg-secondary p-4 hidden flex-col justify-between z-20 sm:flex lg:fixed lg:left-0 lg:top-0">
    //     <Navigation />
    //   </aside>
    //   <header>
    //     <MobileNavigation />
    //   </header>
    //   <main className="flex-1 bg-secondary lg:ml-64 lg:mr-96 min-h-screen md:mb-0 pb-20 md:py-0">
    //     <Button
    //       label="Log Out"
    //       className="text-white bg-red-700 w-full px-8"
    //       onClick={handleSignOut}
    //     />
    //   </main>
    //   <aside className="lg:fixed right-0 top-0 w-[23.5rem] h-full bg-secondary p-4 flex-col justify-between pt-5 sm:block hidden md:hidden lg:flex"></aside>
    // </div>

    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-brand text-white p-4 flex flex-col">
        <img
          src="./images/logo.png"
          alt="Wash Track"
          className="w-full h-[45px]"
        />
        <nav className="space-y-4 text-white">
          <a href="#" className="block">
            Add Order
          </a>
          <a href="#" className="block">
            Inventory
          </a>
          <a href="#" className="block">
            My Store
          </a>
          <a href="#" className="block">
            Orders
          </a>
          <a href="#" className="block">
            Revenue
          </a>
          <a href="#" className="block">
            Expense
          </a>
          <a href="#" className="block">
            Reports
          </a>
          <a href="#" className="block flex items-center">
            More <IoMdMore className="ml-2" />
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Victoria's Laundry</h1>
          <div className="flex items-center space-x-4">
            <FiBell className="text-xl" />
            <FiSettings className="text-xl" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-brand text-white p-6 rounded-lg">
            <p>Total Orders</p>
            <h2 className="text-2xl font-bold">₦28,000.00</h2>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg">
            <p>Completed</p>
            <h2 className="text-2xl font-bold">₦20,000</h2>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg">
            <p>Pending</p>
            <h2 className="text-2xl font-bold">₦20,000</h2>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-6 gap-4">
            <button className="bg-gray-200 p-4 rounded-lg">Inventory</button>
            <button className="bg-gray-200 p-4 rounded-lg">Orders</button>
            <button className="bg-gray-200 p-4 rounded-lg">Customers</button>
            <button className="bg-gray-200 p-4 rounded-lg">Expense</button>
            <button className="bg-gray-200 p-4 rounded-lg">Revenue</button>
            <button className="bg-gray-200 p-4 rounded-lg">Reports</button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
            <p>Order #676888 - Victoria Idris</p>
            <p>₦250,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md mt-2 flex justify-between">
            <p>Order #676889 - Victoria Idris</p>
            <p>₦250,000</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardScreen;
