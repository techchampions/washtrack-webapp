import { NavLink } from "react-router-dom";

interface QuickActionProps {
  label: string;
  icon: JSX.Element;
  path: string;
}

const QuickActionItem: React.FC<QuickActionProps> = ({ label, icon, path }) => {
  return (
    <NavLink
      to={path}
      className={` flex-col items-center justify-center p-1 text-black transition ${
        label === "Expense" || label === "Revenue" ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="w-[50px]">{icon}</div>
      <span className="mt-2 text-lg font-medium text-black">{label}</span>
    </NavLink>
  );
};

export default QuickActionItem;
