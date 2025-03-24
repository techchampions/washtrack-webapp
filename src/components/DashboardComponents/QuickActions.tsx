import {
  FaBox,
  FaClipboardList,
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaChartBar,
} from "react-icons/fa";
import QuickActionItem from "./QuickActionItem";

const QuickActions = () => {
  const actions = [
    {
      label: "Inventory",
      icon: <FaBox size={24} className="text-black rounded-full p-3 bg-brand-100" />,
      path: "/inventory",
    },
    {
      label: "Orders",
      icon: (
        <FaClipboardList size={24} className="text-black rounded-full p-3 bg-brand-100" />
      ),
      path: "/orders",
    },
    {
      label: "Customers",
      icon: <FaUsers size={24} className="text-black rounded-full p-3 bg-brand-100" />,
      path: "/customers",
    },
    {
      label: "Expense",
      icon: (
        <FaMoneyBillWave size={24} className="text-black rounded-full p-3 bg-brand-100" />
      ),
      path: "/expense",
    },
    {
      label: "Revenue",
      icon: <FaChartLine size={24} className="text-black rounded-full p-3 bg-brand-100" />,
      path: "/revenue",
    },
    {
      label: "Reports",
      icon: <FaChartBar size={24} className="text-black rounded-full p-3 bg-brand-100" />,
      path: "/reports",
    },
  ];

  return (
    <div className="mt-5 w-full ">
      <h2 className="text-lg font-bold mb-4 text-left text-black">
        Quick Actions
      </h2>
      <div className="flex gap-6 justify-center">
        {actions.map((action, index) => (
          <QuickActionItem key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
