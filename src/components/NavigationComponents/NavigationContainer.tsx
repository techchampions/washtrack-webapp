import React from "react";
import { IoMdMore } from "react-icons/io";
import NavItem from "./NavItem";
import { FaBox, FaChartBar, FaList, FaTh } from "react-icons/fa";
import { MdAddBox, MdOutlineAddBox, MdOutlineInventory } from "react-icons/md";
import { LiaMoneyBillAltSolid, LiaStoreAltSolid } from "react-icons/lia";
import { TbMoneybag } from "react-icons/tb";
import { RiAppsLine } from "react-icons/ri";

function NavigationContainer() {
  return (
    <div className="flex flex-col py-10 px-10">
      <img src="./images/logo.png" alt="Wash Track" className="w-full" />
      <nav className="space-y-4 text-white py-8">
        <NavItem
          label="Add Order"
          icon={<MdOutlineAddBox className="text-white" />}
          path="/dashbord/add-order"
        />
        <NavItem
          label="Inventory"
          icon={<MdOutlineInventory className="text-white" />}
          path="/dashbord/inventory"
        />
        <NavItem
          label="My Store"
          icon={<LiaStoreAltSolid className="text-white" />}
          path="/dashbord/my-store"
        />
        <NavItem
          label="Orders"
          icon={<FaList className="text-white" />}
          path="/dashbord/my-order"
        />
        <NavItem
          label="Revenue"
          icon={<TbMoneybag className="text-white" />}
          path="/dashbord/revenue"
        />
        <NavItem
          label="Expense"
          icon={<LiaMoneyBillAltSolid className="text-white" />}
          path="/dashbord/expense"
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
        <a href="#" className="block flex items-center">
          More <IoMdMore className="ml-2" />
        </a>
      </nav>
    </div>
  );
}

export default NavigationContainer;
