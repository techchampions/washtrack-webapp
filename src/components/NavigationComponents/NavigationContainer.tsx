import React from "react";
import { IoMdMore } from "react-icons/io";
import NavItem from "./NavItem";
import { FaChartBar, FaHome, FaList } from "react-icons/fa";
import { MdOutlineAddBox, MdOutlineInventory } from "react-icons/md";
import { LiaMoneyBillAltSolid, LiaStoreAltSolid } from "react-icons/lia";
import { TbMoneybag } from "react-icons/tb";
import { RiAppsLine } from "react-icons/ri";

function NavigationContainer() {
  return (
    <div className="flex flex-col py-10 px-10">
      <img src="./images/logo.png" alt="Wash Track" className="w-full" />
      <nav className="space-y-4 text-white py-8">
        <NavItem
          label="Overview"
          icon={<FaHome className="text-white" />}
          path="/dashboard"
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
          path="/dashboard/report"
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
  );
}

export default NavigationContainer;
