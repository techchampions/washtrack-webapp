import { Header } from "@/components/DashboardComponents";
import InventoryCustomersLoading from "@/components/DashboardComponents/LoadingComponents/InventoryCustomersLoading";
import { useGetCustomerInventory } from "@/hooks/query/useGetInventory";
import React from "react";
import { Link, useParams } from "react-router-dom";

const InventoryCustomers = () => {
  const { item_type } = useParams<{ item_type: string }>();

  const { data, isLoading } = useGetCustomerInventory(item_type || "");
  if (isLoading) {
    return <InventoryCustomersLoading />;
  }
  const customers = data?.customers ?? [];

  return (
    <div>
      <Header />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Inventory Customers</h2>
      </div>
      <div className="grid grid-cols-4 text-left px-4 py-2 rounded-2xl font-bold my-5">
        <div className="">S/N</div>
        <div className="">Customer name</div>
        <div className="">No. of items</div>
        <div className="">Action</div>
      </div>
      {customers.map((item, index) => (
        <div
          className="grid grid-cols-4 text-left even:bg-brand-100 rounded-2xl px-4 py-2"
          key={index}
        >
          <div className="">{index + 1}</div>
          <div className="">{item.name}</div>
          <div className="">{item.total_no_of_items}</div>
          <Link
            to={`/dashboard/customers/${item.name}/${item.id}/${item_type}/orders`}
            className="text-brand"
          >
            view
          </Link>
        </div>
      ))}
    </div>
  );
};

export default InventoryCustomers;
