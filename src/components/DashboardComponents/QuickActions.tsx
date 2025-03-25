import {
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaMoneyBill,
} from "react-icons/fa";
import QuickActionItem from "./QuickActionItem";
import { BsFillGridFill } from "react-icons/bs";
import { FaSackDollar } from "react-icons/fa6";

const QuickActions = () => {
  const actions = [
    {
      label: "Inventory",
      icon: (
        <div className="p-2 md:p-5 bg-brand-200 rounded-full">
          <BsFillGridFill className="text-quick-action-icon h-6 w-6 md:h-12 md:w-12" />
        </div>
      ),
      path: "/inventory",
    },
    {
      label: "Orders",
      icon: (
        <div className="p-2 md:p-5 bg-brand-200 rounded-full">
          <FaClipboardList className="text-quick-action-icon h-6 w-6 md:h-12 md:w-12" />
        </div>
      ),
      path: "/orders",
    },
    {
      label: "Customers",
      icon: (
        <div className="p-2 md:p-5 bg-brand-200 rounded-full">
          <FaUsers className="text-quick-action-icon h-6 w-6 md:h-12 md:w-12" />
        </div>
      ),
      path: "/customers",
    },
    {
      label: "Expense",
      icon: (
        <div className="p-2 md:p-5 bg-brand-200 rounded-full">
          <FaMoneyBill className="text-quick-action-icon h-6 w-6 md:h-12 md:w-12" />
        </div>
      ),
      path: "/expense",
    },
    {
      label: "Revenue",
      icon: (
        <div className="p-2 md:p-5 bg-brand-200 rounded-full">
          <FaSackDollar className="text-quick-action-icon h-6 w-6 md:h-12 md:w-12" />
        </div>
      ),
      path: "/revenue",
    },
    {
      label: "Reports",
      icon: (
        <div className="p-2 md:p-5 bg-brand-200 rounded-full">
          <FaChartBar className="text-quick-action-icon h-6 w-6 md:h-12 md:w-12" />
        </div>
      ),
      path: "/reports",
    },
  ];

  return (
    <div className="mt-5 mx-auto ">
      <h2 className="text-2xl font-brand-bold mb-4 text-left text-black">
        Quick Actions
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-6 justify-between">
        {actions.map((action, index) => (
          <QuickActionItem key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
