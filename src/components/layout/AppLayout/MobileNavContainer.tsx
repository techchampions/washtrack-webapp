import { FaHome, FaPlus } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { MdOutlineInventory } from "react-icons/md";
import { RiAppsLine } from "react-icons/ri";
import MobileNavItem from "../Header/MobileNavItem";
import React from "react";
import { useModal } from "@/store/useModal.store";
import CreateOrderModal from "@/components/DashboardComponents/CreateOrderComponents/CreateOrderModal";
import { useGetSubscription } from "@/hooks/query/useGetUserSubscription";
import ExhaustedOrder from "@/components/DashboardComponents/CreateOrderComponents/ExhaustedOrder";

const BottomNav: React.FC = () => {
  const modal = useModal();
  const { data } = useGetSubscription();
  const handleCreateOrder = () => {
    if (data?.expired || (data?.ordersLeft || 0) < 1) {
      modal.openModal(<ExhaustedOrder />);
    } else {
      modal.openModal(<CreateOrderModal />);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around px-2 py-4 bg-white shadow-lg shadow-black md:hidden">
      <MobileNavItem
        label="Home"
        icon={<FaHome size={24} />}
        path="/dashboard"
      />
      <MobileNavItem
        label="Inventory"
        icon={<MdOutlineInventory size={24} />}
        path="/dashboard/inventory"
      />
      <button
        className="flex items-center justify-center w-12 h-12 -mt-6 text-white rounded-full shadow-lg bg-brand"
        onClick={handleCreateOrder}
      >
        <FaPlus size={24} />
      </button>
      <MobileNavItem
        label="Orders"
        icon={<CiCircleList size={24} />}
        path="/dashboard/orders"
        // badgeCount={4} // Example badge for notifications
      />
      <MobileNavItem
        label="More"
        icon={<RiAppsLine size={24} />}
        path="/dashboard/more"
      />
    </nav>
  );
};

export default BottomNav;
