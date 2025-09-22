import React from "react";
import NavItem from "../Header/NavItem";
import { FaChartBar, FaHome, FaList, FaUsers } from "react-icons/fa";
import { MdOutlineAddBox, MdOutlineInventory } from "react-icons/md";
import { RiAppsLine } from "react-icons/ri";
import NavbarAddorder from "../Header/NavbarAddorder";
import { LogIn } from "lucide-react";
import { authService } from "@/services/auth.service";
import { useModal } from "@/store/useModal.store";
import CreateOrderModal from "@/components/DashboardComponents/CreateOrderComponents/CreateOrderModal";

function NavigationContainer() {
  const modal = useModal();
  return (
    <div className="flex flex-col justify-between h-screen px-4 overflow-y-scroll scrollbar-hide">
      <div className="w-full py-8">
        <img src="/images/logo.png" alt="Wash Track" className="w-full" />
        <nav className="py-8 space-y-2 text-white">
          <NavItem
            label="Overview"
            icon={<FaHome className="w-4 h-4 text-white" />}
            path="/dashboard"
          />

          {/* Replace Add Order NavItem with a button to open modal */}
          <button
            // onClick={() => setShowModal(true)}
            onClick={() => modal.openModal(<CreateOrderModal />)}
            className="flex items-center w-full px-3 py-[7px] text-[12px] text-white rounded-md hover:bg-brand-400"
          >
            <MdOutlineAddBox className="w-4 h-4 mr-2 text-white" />
            Add Order
          </button>

          <NavItem
            label="Inventory"
            icon={<MdOutlineInventory className="w-4 h-4 text-white" />}
            path="/dashboard/inventory"
          />
          {/* <NavItem
            label="My Store"
            icon={<LiaStoreAltSolid className="text-white" />}
            path="/dashboard/my-store"
          /> */}
          <NavItem
            label="Orders"
            icon={<FaList className="w-4 h-4 text-white" />}
            path="/dashboard/orders"
          />
          <NavItem
            label="Customers"
            icon={<FaUsers className="w-4 h-4 text-white" />}
            path="/dashboard/customers"
          />
          {/* <NavItem
            label="Revenue"
            icon={<TbMoneybag className="text-white" />}
            path="/dashboard/revenue"
          />
          <NavItem
            label="Expense"
            icon={<LiaMoneyBillAltSolid className="text-white" />}
            path="/dashboard/expense"
          /> */}
          <NavItem
            label="Report"
            icon={<FaChartBar className="w-4 h-4 text-white" />}
            path="/dashboard/reports"
          />

          {/* Nested nav */}
          <NavItem
            label="More"
            icon={<RiAppsLine className="w-4 h-4 text-white" />}
            children={[
              { label: "Setting", path: "/dashboard/settings" },
              { label: "Customer", path: "/dashboard/customers" },
              { label: "Outstanding", path: "/dashboard/outstanding" },
            ]}
          />

          <button
            onClick={authService.logout2}
            className="flex items-center w-full gap-2 px-3 mt-5 text-sm text-red-500 cursor-pointer font-brand-bold text-leftf"
          >
            <LogIn size={16} className="font-brand-bold" />
            <span>Log Out</span>
          </button>
        </nav>
      </div>
      <NavbarAddorder />
    </div>
  );
}

export default NavigationContainer;
