import { useCrispChat } from "@/hooks/crisp/useCrisp";
import { useAuthStore } from "@/store/auth.store";
import { useModal } from "@/store/useModal.store";
import {
  ChevronRight,
  MessageCircleMore,
  MessageCircleQuestionMark,
  Phone,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const GetHelp = () => {
  const modal = useModal();
  const { openChat } = useCrispChat("ea104d40-1abf-4455-a6a5-c2bbea68c68d");

  const ITEMS = [
    {
      icon: <Phone size={20} className="" />,
      label: "Contact us",
      href: "/dashboard/contact",
      onclick: () => modal.closeModal(),
    },
    {
      icon: <MessageCircleMore size={20} className="" />,
      label: "Live chat",
      href: "#",
      onclick: () => {
        openChat();
      },
    },
    {
      icon: <MessageCircleQuestionMark size={20} className="" />,
      label: "FAQs",
      href: "/dashboard/FAQs",
      onclick: () => modal.closeModal(),
    },
  ];
  const { user } = useAuthStore();

  return (
    <div className="text-left space-y-7">
      <div className="">
        <h2 className="text-4xl">
          Hi{" "}
          <span className="font-bold text-quick-action-icon">
            {user?.store?.store_name}
          </span>
        </h2>
        <div className="">How can we help you?</div>
      </div>
      <div className="space-y-2">
        {ITEMS.map((item, i) => (
          <Link
            onClick={item.onclick}
            to={item.href}
            key={i}
            className="flex items-center gap-2 p-4 text-left cursor-pointer bg-brand-200 rounded-xl text-quick-action-icon"
          >
            {item.icon}
            <div className="flex-1">{item.label}</div>
            <ChevronRight />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GetHelp;
