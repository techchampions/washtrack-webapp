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
      className="flex flex-col items-center justify-center w-20 h-20 p-3 text-black transition">
      {icon}
      <span className="mt-2 text-sm font-medium text-black">{label}</span>
    </NavLink>
  );
};

export default QuickActionItem;
