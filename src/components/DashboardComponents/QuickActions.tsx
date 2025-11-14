import React from "react";
import QuickActionItem from "./QuickActionItem";
const QuickActions: React.FC = () => {
  const actions = [
    {
      label: "Inventory",
      icon: <img src="../images/inventory-icon.png" alt="inventory" />,
      path: "inventory",
    },
    {
      label: "Orders",
      icon: <img src="../images/order-icon.png" alt="inventory" />,
      path: "orders",
    },
    {
      label: "Customers",
      icon: <img src="../images/users-icon.png" alt="inventory" />,
      path: "customers",
    },
    {
      label: "Expense",
      icon: <img src="../images/expense-icon.png" alt="inventory" />,
      path: "expenses",
    },
    {
      label: "Revenue",
      icon: <img src="../images/revenue-icon.png" alt="inventory" />,
      path: "revenues",
    },
    {
      label: "Reports",
      icon: <img src="../images/report-icon.png" alt="inventory" />,
      path: "reports",
    },
  ];

  return (
    <div className="mt-10 mx-auto ">
      <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-left text-black">
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
