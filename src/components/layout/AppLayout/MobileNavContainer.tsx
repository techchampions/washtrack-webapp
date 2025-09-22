import { FaHome, FaPlus } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { MdOutlineInventory } from "react-icons/md";
import { RiAppsLine } from "react-icons/ri";
import MobileNavItem from "../Header/MobileNavItem";
import React from "react";
import { useModal } from "@/store/useModal.store";
import CreateOrderModal from "@/components/DashboardComponents/CreateOrderComponents/CreateOrderModal";

const BottomNav: React.FC = () => {
  const modal = useModal();
  return (
    <nav className="fixed flex bottom-0  left-0 right-0 bg-white shadow-lg shadow-black py-4 px-2 md:hidden justify-around">
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
        className="bg-brand text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg -mt-6"
        onClick={() => modal.openModal(<CreateOrderModal />)}
      >
        <FaPlus size={24} />
      </button>
      <MobileNavItem
        label="Orders"
        icon={<CiCircleList size={24} />}
        path="/dashboard/orders"
        badgeCount={4} // Example badge for notifications
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
