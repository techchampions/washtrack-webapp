import { MainCard } from "@/components/DashboardComponents";
import ChangePassword from "@/components/DashboardComponents/SettingsComponents/ChangePassword";
import DeleteAccount from "@/components/DashboardComponents/SettingsComponents/DeleteAccount";
import GetHelp from "@/components/DashboardComponents/SettingsComponents/GetHelp";
import { Button } from "@/components/FormComponents";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useModal } from "@/store/useModal.store";
import {
  CalendarSync,
  ChartBar,
  ClipboardClock,
  ClipboardPlus,
  DollarSign,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Settings,
  Store,
  Trash,
  Users2,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const More = () => {
  const modal = useModal();
  const NAVLIST = [
    {
      icon: <DollarSign size={20} className="" />,
      label: "Expense",
      href: "/dashboard/expense",
    },
    {
      icon: <ChartBar size={20} className="" />,
      label: "Reports",
      href: "/dashboard/reports",
    },
    {
      icon: <ClipboardPlus size={20} className="" />,
      label: "Revenue",
      href: "/dashboard/revenues",
    },
    {
      icon: <ClipboardClock size={20} className="" />,
      label: "Oustanding",
      href: "/dashboard/outstandings",
    },
    {
      icon: <Users2 size={20} className="" />,
      label: "Customers",
      href: "/dashboard/customers",
    },
    {
      icon: <CalendarSync size={20} className="" />,
      label: "Subscription",
      href: "/dashboard/settings/subscription",
    },
  ];
  const SETTINGSLIST = [
    {
      icon: <Store size={20} className="" />,
      label: "Store Info",
      href: "/dashboard/settings/store-setup",
    },
    {
      icon: <Settings size={20} className="" />,
      label: "Services",
      href: "/dashboard/settings/services",
    },
    {
      icon: <Package size={20} className="" />,
      label: "Items",
      href: "/dashboard/settings/items-setup",
    },
  ];
  const ACTIONSLIST = [
    {
      icon: <Lock size={20} className="" />,
      label: "Password & Security",
      href: "#",
      onclick: () => modal.openModal(<ChangePassword />),
    },
    {
      icon: <Trash size={20} className="" />,
      label: "Delete Account",
      href: "#",
      onclick: () => modal.openModal(<DeleteAccount />),
    },
    {
      icon: <MessageCircle size={20} className="" />,
      label: "Help and Support",
      href: "#",
      onclick: () => modal.openModal(<GetHelp />),
    },
    {
      icon: <LogOut size={20} className="" />,
      label: "Log out",
      href: "#",
      onclick: () => authService.logout2(),
    },
  ];
  const { user } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div>
      {/* <Header /> */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full space-y-5">
          <div className="h-fit md:h-48">
            <MainCard>
              <div className="flex flex-col gap-2 md:flex-row">
                <img
                  src={user?.profile_picture || ""}
                  alt=""
                  className="w-16 h-full md:w-24 md:h-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-bold">{user?.store_name}</h3>
                    <div className="px-4 border border-gray-300 rounded-md cursor-pointer bg-brand/70">
                      {user?.plan?.name}
                    </div>
                  </div>
                  <div className="flex items-center divide-x divide-gray-300">
                    <div className="flex items-center gap-1">
                      <Phone size={15} />
                      <p>{user?.phone_num}</p>
                    </div>
                  </div>
                  <div className="flex items-center divide-x divide-gray-300">
                    <div className="flex items-center gap-1">
                      <Mail size={15} />
                      <p>{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={15} />
                    <p>{user?.store?.store_location}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-4 md:ml-24 gap-2">
                <Button
                  onClick={() => navigate("/dashboard/settings/store-setup")}
                  label="Edit"
                  className="bg-white/70 hover:bg-white hover:!text-brand !text-brand !w-fit px-10 text-sm !py-1 "
                />
                <Button
                  label="Log Out"
                  onClick={() => authService.logout2()}
                  className="text-sm !bg-black !w-fit px-10 !py-1"
                />
              </div>
            </MainCard>
          </div>
          <div className="space-y-7">
            <div className="text-left ">
              <div className="p-2 rounded-xl space-y-1">
                {NAVLIST.map((item, index) => (
                  <Link
                    to={item.href}
                    className="flex items-center bg-brand-100 gap-3 px-4 py-2 rounded-lg text-gray-600 hover:text-brand"
                    key={index}
                  >
                    <div className="bg-brand-200 p-2 rounded-full">
                      {item.icon}
                    </div>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-left ">
              <h3 className="mb-2 text-xl font-bold text-brand">Store Setup</h3>
              <div className="p-2 rounded-xl space-y-1">
                {SETTINGSLIST.map((item, index) => (
                  <Link
                    to={item.href}
                    className="flex items-center bg-brand-100 gap-3 px-4 py-2 rounded-lg text-gray-600 hover:text-brand"
                    key={index}
                  >
                    <div className="bg-brand-200 p-2 rounded-full">
                      {item.icon}
                    </div>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-left ">
              <h3 className="mb-2 text-xl font-bold text-brand">Actions</h3>
              <div className="p-2 border border-gray-200 rounded-xl">
                {ACTIONSLIST.map((item, index) => (
                  <Link
                    to={item.href}
                    onClick={item.onclick}
                    className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-brand"
                    key={index}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default More;
