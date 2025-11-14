import React, { JSX, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

interface NavItemProps {
  label: string;
  icon: JSX.Element;
  path?: string;
  children?: { label: string; path: string }[];
}

const NavItem: React.FC<NavItemProps> = ({ label, icon, path, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Parent Item */}
      {path ? (
        <NavLink
          to={path}
          end={true}
          className={({ isActive }) =>
            `flex items-center justify-between px-3 py-[7px] rounded-md transition ${
              isActive
                ? "bg-brand-100 text-brand"
                : "text-black hover:text-brand hover:bg-brand-100"
            }`
          }
        >
          <div className="flex items-center space-x-2">
            {icon}
            <span className="">{label}</span>
          </div>
        </NavLink>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-[7px] text-black rounded-md hover:bg-brand-100"
        >
          <div className="flex items-center space-x-2">
            {icon}
            <span>{label}</span>
          </div>
          <FaChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {/* Nested Items */}
      {isOpen && children && (
        <div className="px-0 mt-2 ml-6 space-y-2 border-l-1 border-gray-300">
          {children.map((child, index) => (
            <div className="flex items-center">
              <div className="h-[0.5px] w-[10px] text-black bg-gray-300"></div>
              <NavLink
                key={index}
                to={child.path}
                end={true}
                className={({ isActive }) =>
                  `block py-[7px] flex-1 px-2 rounded-md transition text-left text-[12px] ${
                    isActive
                      ? "bg-brand-100 text-brand"
                      : "text-black hover:text-brand hover:bg-brand-100"
                  }`
                }
              >
                {child.label}
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
