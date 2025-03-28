import { FaHome, FaStore, FaPlus } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { RiAppsLine } from "react-icons/ri";
import MobileNavItem from "./MobileNavItem";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed flex bottom-0  left-0 right-0 bg-white shadow-lg shadow-black py-4 px-2 md:hidden justify-around">
      <MobileNavItem label="Home" icon={<FaHome size={24} />} path="/" />
      <MobileNavItem
        label="Inventory"
        icon={<MdOutlineInventory size={24} />}
        path="/dashboard/inventory"
      />
      <button
        className="bg-brand text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg -mt-6"
        onClick={() => navigate("/dashboard/inventory")}>
        <FaPlus size={24} />
      </button>
      <MobileNavItem
        label="E-store"
        icon={<FaStore size={24} />}
        path="/dashboard/my-store"
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
