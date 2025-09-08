import React, { useState } from "react";
import NavItem from "../Header/NavItem";
import { FaChartBar, FaHome, FaList, FaUsers } from "react-icons/fa";
import { MdOutlineAddBox, MdOutlineInventory } from "react-icons/md";
import { RiAppsLine } from "react-icons/ri";
import NavbarAddorder from "../Header/NavbarAddorder";
import { useNavigate } from "react-router-dom";
import { Modal } from "@/components/DashboardComponents";
import { Button } from "@/components/FormComponents";
import { LogIn } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";

function NavigationContainer() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between h-screen px-10">
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
            onClick={() => setShowModal(true)}
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
            className="text-red-500 cursor-pointer w-full px-3 text-sm mt-5 font-brand-bold text-leftf flex items-center gap-2"
          >
            <LogIn size={16} className="font-brand-bold" />
            <span>Log Out</span>
          </button>
        </nav>
      </div>
      <NavbarAddorder />

      {/* Add Order Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center">
          <img src="/images/1171275266.png" alt="" className="w-[150px]" />
          <h2 className="mb-4 text-2xl text-black font-brand-bold">
            Create Order
          </h2>
          <p className="mb-6 text-gray-600">
            Please select if you are creating a new customer or existing
            customer order
          </p>
          <div className="flex flex-col justify-between w-full gap-2">
            <Button
              label="Existing User"
              className="px-4 py-2 text-white bg-brand"
              onClick={() => {
                setShowModal(false);
                navigate("/dashboard/add-order/existing-customer");
                // window.location.href = "/dashboard/add-order/existing-customer";
              }}
            />
            <Button
              label="New User"
              className="w-full px-4 py-2 text-white bg-brand-muted"
              onClick={() => {
                setShowModal(false);
                navigate("/dashboard/add-order/new-customer");

                // window.location.href = "/dashboard/add-order/new-customer";
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NavigationContainer;
