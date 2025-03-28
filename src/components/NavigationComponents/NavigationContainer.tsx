import React from "react";
import { IoMdMore } from "react-icons/io";
import NavItem from "./NavItem";
import { FaChartBar, FaHome, FaList } from "react-icons/fa";
import { MdOutlineAddBox, MdOutlineInventory } from "react-icons/md";
import { LiaMoneyBillAltSolid, LiaStoreAltSolid } from "react-icons/lia";
import { TbMoneybag } from "react-icons/tb";
import { RiAppsLine } from "react-icons/ri";
import NavbarAddorder from "./NavbarAddorder";

function NavigationContainer() {
  return (
    <div className="flex flex-col px-10 h-screen justify-between">
      <div className="w-full py-8">
        <img src="../images/logo.png" alt="Wash Track" className="w-full" />
        <nav className="space-y-2 text-white py-8">
          <NavItem
            label="Overview"
            icon={<FaHome className="text-white" />}
            path="/"
          />
          <NavItem
            label="Add Order"
            icon={<MdOutlineAddBox className="text-white" />}
            path="/dashboard/add-order"
          />
          <NavItem
            label="Inventory"
            icon={<MdOutlineInventory className="text-white" />}
            path="/dashboard/inventory"
          />
          <NavItem
            label="My Store"
            icon={<LiaStoreAltSolid className="text-white" />}
            path="/dashboard/my-store"
          />
          <NavItem
            label="Orders"
            icon={<FaList className="text-white" />}
            path="/dashboard/my-order"
          />
          <NavItem
            label="Revenue"
            icon={<TbMoneybag className="text-white" />}
            path="/dashboard/revenue"
          />
          <NavItem
            label="Expense"
            icon={<LiaMoneyBillAltSolid className="text-white" />}
            path="/dashboard/expense"
          />
          <NavItem
            label="Report"
            icon={<FaChartBar className="text-white" />}
            path="/dashboard/reports"
          />

          {/* Nested nav */}
          <NavItem
            label="More"
            icon={<RiAppsLine className="text-white" />}
            children={[
              { label: "Setting", path: "/dashboard/settings" },
              { label: "Customer", path: "/dashboard/customers" },
              { label: "Outstanding", path: "/dashboard/outstanding" },
            ]}
          />
        </nav>
      </div>
      <NavbarAddorder />
    </div>
  );
}

export default NavigationContainer;
