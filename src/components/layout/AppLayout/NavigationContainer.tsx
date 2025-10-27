import React from "react";
import NavItem from "../Header/NavItem";
import { FaChartBar } from "react-icons/fa";
import { RiAppsLine } from "react-icons/ri";
// import NavbarAddorder from "../Header/NavbarAddorder";
import {
  ClipboardCheck,
  Home,
  List,
  LogIn,
  PlusSquare,
  Users2,
} from "lucide-react";
import { authService } from "@/services/auth.service";
import { useModal } from "@/store/useModal.store";
import CreateOrderModal from "@/components/DashboardComponents/CreateOrderComponents/CreateOrderModal";
import { useGetSubscription } from "@/hooks/query/useGetUserSubscription";
import ExhaustedOrder from "@/components/DashboardComponents/CreateOrderComponents/ExhaustedOrder";

function NavigationContainer() {
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
    <div className="flex flex-col justify-between h-screen px-4 overflow-y-scroll scrollbar-hide">
      <div className="w-full pb-8">
        <img src="/images/logo.png" alt="Wash Track" className="w-[70%]" />
        <nav className="py-8 space-y-2 text-white">
          <NavItem
            label="Overview"
            icon={<Home className="h-5 w-5 text-white" />}
            path="/dashboard"
          />

          {/* Replace Add Order NavItem with a button to open modal */}
          <button
            onClick={handleCreateOrder}
            className="flex items-center w-full px-3 py-[7px] text-white rounded-md hover:bg-brand-400"
          >
            <PlusSquare className="h-5 w-5  mr-2 text-white" />
            Add Order
          </button>

          <NavItem
            label="Inventory"
            icon={<ClipboardCheck className="h-5 w-5  text-white" />}
            path="/dashboard/inventory"
          />
          {/* <NavItem
            label="My Store"
            icon={<LiaStoreAltSolid className="text-white" />}
            path="/dashboard/my-store"
          /> */}
          <NavItem
            label="Orders"
            icon={<List className="h-5 w-5 text-white" />}
            path="/dashboard/orders"
          />
          <NavItem
            label="Customers"
            icon={<Users2 className="w-5 h-5 text-white" />}
            path="/dashboard/customers"
          />
          <NavItem
            label="Report"
            icon={<FaChartBar className="w-5 h-5 text-white" />}
            path="/dashboard/reports"
          />

          {/* Nested nav */}
          <NavItem
            label="More"
            icon={<RiAppsLine className="w-5 h-5 text-white" />}
            children={[
              { label: "Setting", path: "/dashboard/settings" },
              { label: "Revenue", path: "/dashboard/revenues" },
              { label: "Outstanding", path: "/dashboard/outstandings" },
              { label: "Expense", path: "/dashboard/expenses" },
              {
                label: "Subscription",
                path: "/dashboard/settings/subscription",
              },
            ]}
          />
        </nav>
      </div>
      <button
        onClick={authService.logout2}
        className="flex items-center w-full gap-2 px-3 py-2 mt-5 text-sm font-bold text-red-500 rounded-lg cursor-pointer hover:text-white bg-red-50 hover:bg-red-400 text-leftf"
      >
        <LogIn size={16} className="font-brand-bold" />
        <span>Log Out</span>
      </button>
      {/* <NavbarAddorder /> */}
    </div>
  );
}

export default NavigationContainer;
