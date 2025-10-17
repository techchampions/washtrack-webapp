// components/ChatButton.tsx
import React from "react";
import { useCrispChat } from "@/hooks/crisp/useCrisp";
import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const ChatButton: React.FC<ChatButtonProps> = ({
  className = "",
  variant = "primary",
  size = "md",
}) => {
  const { openChat } = useCrispChat("ea104d40-1abf-4455-a6a5-c2bbea68c68d");

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  };

  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <button
      onClick={openChat}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      Chat with Support
    </button>
  );
};
