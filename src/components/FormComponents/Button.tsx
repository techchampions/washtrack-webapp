import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode; // Optional icon (e.g., a spinner or an arrow)
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  onClick,
  isLoading = false,
  disabled = false,
  className = "",
  icon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full bg-brand text-white py-2 rounded-full hover:bg-blue-600 transition duration-300 
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"} ${className}`}
    >
      {isLoading ? (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </>
      )}
    </button>
  );
};

export default Button;
