import React, { useState } from "react";
import NavItem from "./NavItem";
import { FaChartBar, FaHome, FaList, FaUsers } from "react-icons/fa";
import { MdOutlineAddBox, MdOutlineInventory } from "react-icons/md";
import { LiaMoneyBillAltSolid, LiaStoreAltSolid } from "react-icons/lia";
import { TbMoneybag } from "react-icons/tb";
import { RiAppsLine } from "react-icons/ri";
import NavbarAddorder from "./NavbarAddorder";
import Button from "../FormComponents/Button";
import Modal from "../DashboardComponents/Modal";
import { useNavigate } from "react-router-dom";

function NavigationContainer() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-10 h-screen justify-between">
      <div className="w-full py-8">
        <img src="/images/logo.png" alt="Wash Track" className="w-full" />
        <nav className="space-y-2 text-white py-8">
          <NavItem
            label="Overview"
            icon={<FaHome className="text-white w-4 h-4" />}
            path="/dashboard"
          />

          {/* Replace Add Order NavItem with a button to open modal */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center w-full px-3 py-[7px] text-[12px] text-white rounded-md hover:bg-brand-400"
          >
            <MdOutlineAddBox className="mr-2 text-white w-4 h-4" />
            Add Order
          </button>

          <NavItem
            label="Inventory"
            icon={<MdOutlineInventory className="text-white w-4 h-4" />}
            path="/dashboard/inventory"
          />
          {/* <NavItem
            label="My Store"
            icon={<LiaStoreAltSolid className="text-white" />}
            path="/dashboard/my-store"
          /> */}
          <NavItem
            label="Orders"
            icon={<FaList className="text-white w-4 h-4" />}
            path="/dashboard/orders"
          />
          <NavItem
            label="Customers"
            icon={<FaUsers className="text-white w-4 h-4" />}
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
            icon={<FaChartBar className="text-white w-4 h-4" />}
            path="/dashboard/reports"
          />

          {/* Nested nav */}
          <NavItem
            label="More"
            icon={<RiAppsLine className="text-white w-4 h-4" />}
            children={[
              { label: "Setting", path: "/dashboard/settings" },
              { label: "Customer", path: "/dashboard/customers" },
              { label: "Outstanding", path: "/dashboard/outstanding" },
            ]}
          />
        </nav>
      </div>
      <NavbarAddorder />

      {/* Add Order Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center">
          <img src="/images/1171275266.png" alt="" className="w-[150px]" />
          <h2 className="text-2xl font-brand-bold mb-4 text-black">
            Create Order
          </h2>
          <p className="text-gray-600 mb-6">
            Please select if you are creating a new customer or existing
            customer order
          </p>
          <div className="flex flex-col justify-between w-full gap-2">
            <Button
              label="Existing User"
              className="bg-brand text-white px-4 py-2"
              onClick={() => {
                setShowModal(false);
                navigate("/dashboard/add-order/existing-customer");
                // window.location.href = "/dashboard/add-order/existing-customer";
              }}
            />
            <Button
              label="New User"
              className="bg-brand-muted text-white px-4 py-2 w-full"
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
