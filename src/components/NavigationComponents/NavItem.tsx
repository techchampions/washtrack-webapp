// import { NavLink } from "react-router-dom";

// interface NavItemProps {
//   label: string;
//   icon: JSX.Element;
//   path: string;
// }

// const NavItem: React.FC<NavItemProps> = ({ label, icon, path }) => {
//   return (
//     <NavLink
//       to={path}
//       className={({ isActive }) =>
//         `flex items-center space-x-2 px-3 py-1 rounded-md transition ${
//           isActive ? "bg-brand text-white" : "text-white hover:bg-brand-100"
//         }`
//       }>
//       {icon}
//       <span>{label}</span>
//     </NavLink>
//   );
// };

// export default NavItem;

import { useState } from "react";
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
          className={({ isActive }) =>
            `flex items-center justify-between px-3 py-1 rounded-md transition ${
              isActive
                ? "bg-blue-400 text-white"
                : "text-white hover:bg-blue-400"
            }`
          }>
          <div className="flex items-center space-x-2">
            {icon}
            <span className="text-white">{label}</span>
          </div>
        </NavLink>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-1 text-white rounded-md hover:bg-blue-400">
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
        <div className="ml-6 mt-2 space-y-2">
          {children.map((child, index) => (
            <NavLink
              key={index}
              to={child.path}
              className={({ isActive }) =>
                `block py-1 px-2 rounded-md transition text-left ${
                  isActive
                    ? "bg-blue-400 text-white"
                    : "text-white hover:bg-blue-400"
                }`
              }>
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
