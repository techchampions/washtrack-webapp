import React from "react";
import Item from "@/components/DashboardComponents/Item";
import { useParams } from "react-router-dom";
import { useGetSingleOrder } from "@/hooks/query/usegetOrders";
import { formatDate, formatPrice } from "@/utils/formatter";
import { useUpdateOrderStatus } from "@/hooks/mutations/useUpdateOrderStatus";
import { Button } from "@/components/FormComponents";
import { Header } from "@/components/DashboardComponents";
import LinkButton from "@/components/GeneralComponents/LinkButton";
import OrderDetailsLoading from "@/components/DashboardComponents/LoadingComponents/OrderOverviewLoading";

const OrderOverview = () => {
  const { order_id } = useParams<{ order_id: string }>();
  const { data, isLoading } = useGetSingleOrder(order_id || "");
  const { mutate: update, isPending } = useUpdateOrderStatus();
  if (isLoading || isPending) {
    return (
      <div className="">
        <Header />
        <OrderDetailsLoading />
      </div>
    );
  }
  const order = data?.order;
  const customer = data?.customer;
  const orderItems = data?.order_item ?? [];
  const noOfItems = data?.total_item_count;
  const updateStatus = (status: number) => {
    const payload = { id: order_id || "", status: status };
    update(payload);
  };
  return (
    <div className="w-full">
      <Header>
        <Button label="View Reciept" className="!min-w-fit px-4" />
        {(order?.balance || 0) > 0 ? (
          <LinkButton
            href={`/dashboard/orders/outstanding/${order?.id}`}
            label="Update Outstanding Balance"
            className="!min-w-fit px-4"
          />
        ) : (
          <Button label="View Payment history" className="!min-w-fit px-4" />
        )}
      </Header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col rounded-lg bg-brand-100 p-4 divide-y divide-gray-300 gap-2 w-full">
          <div className="flex justify-start gap-2 text-black pb-2 ">
            <img src="/images/washing_machine.svg" alt="" />
            <div className="flex flex-col text-left justify-start">
              <h2 className="text-2xl font-bold">
                Order #{order?.order_number}
              </h2>
              <p className="text-sm">
                Order Date: {formatDate(order?.created_at || "")}
              </p>
              <p className="text-sm">
                Pickup Date: {formatDate(order?.pickup_date || "")}
              </p>
              <p className="text-sm">No of Items: {noOfItems} Items</p>
            </div>
          </div>
          <div className="flex flex-col justify-start text-left text-black">
            <h2 className="text-2xl font-bold">Order details</h2>
            <p className="text-sm">Order number: #{order?.order_number}</p>
            <p className="text-sm">Customer name: {customer?.name}</p>
            <p className="text-sm">Phone number: {customer?.phone_number}</p>
            <p className="text-sm">Customer email: {customer?.email}</p>
          </div>
        </div>

        <div className="bg-brand-100 p-4 rounded-lg md:col-span-2">
          <h3 className="text-black text-lg md:text-2xl text-left font-bold py-2">
            Payment Details
          </h3>
          <div className="flex justify-between text-black py-2">
            <span>Cost of service</span>
            <span className="font-bold">
              {formatPrice(order?.total_amount || "")}
            </span>
          </div>
          <div className="flex justify-between text-black py-2">
            <span>Amount Paid</span>
            <span className="font-bold">
              {formatPrice(order?.paid_amount || "")}
            </span>
          </div>
          <div className="flex justify-between text-black py-2">
            <span>Balance</span>
            <span className="font-bold text-red-500">
              {formatPrice(order?.balance || "")}
            </span>
          </div>
          <div className="flex justify-between mt-2 bg-white p-2 rounded-lg border border-gray-300 text-black font-bold">
            <span>Total Amount</span>
            <span>{formatPrice(order?.total_amount || "")}</span>
          </div>
        </div>

        <div className="flex flel-col bg-brand-100 rounded-lg py-4 px-8">
          <ol className="relative text-gray-500 border-s border-gray-500 text-left ">
            <li className="mb-10 ms-6 cursor-pointer">
              <span
                className={`absolute flex items-center text-white justify-center w-8 h-8  ${
                  order?.created_at ? "bg-brand" : "bg-gray-100"
                } rounded-full -start-4 ring-4 ring-white`}
              >
                01
              </span>
              <h3 className="font-medium text-black leading-tight">
                Order Created
              </h3>
              <p className="text-sm">{formatDate(order?.created_at || "")}</p>
            </li>
            <li
              className="mb-10 ms-6 cursor-pointer"
              onClick={() => updateStatus(1)}
            >
              <span
                className={`absolute flex items-center justify-center w-8 h-8 ${
                  order?.processing_date ? "bg-brand text-white" : "bg-gray-100"
                } rounded-full -start-4 ring-4 ring-white`}
              >
                02{" "}
              </span>
              <h3 className="font-medium text-black leading-tight">
                Order Processing
              </h3>
              <p className="text-sm">
                {formatDate(order?.processing_date || "")}
              </p>
            </li>
            <li
              className="mb-10 ms-6 cursor-pointer"
              onClick={() => updateStatus(2)}
            >
              <span
                className={`absolute flex items-center justify-center w-8 h-8 ${
                  order?.ready_pickup_date
                    ? "bg-brand text-white"
                    : "bg-gray-100"
                } rounded-full -start-4 ring-4 ring-white`}
              >
                03{" "}
              </span>
              <h3 className="font-medium text-black leading-tight">
                Ready for Pickup
              </h3>
              <p className="text-sm">
                {formatDate(order?.ready_pickup_date || "")}
              </p>
            </li>
            <li className="ms-6 cursor-pointer" onClick={() => updateStatus(3)}>
              <span
                className={`absolute flex items-center justify-center w-8 h-8 ${
                  order?.completed_date ? "bg-brand text-white" : "bg-gray-100"
                } rounded-full -start-4 ring-4 ring-white`}
              >
                04{" "}
              </span>
              <h3 className="font-medium text-black leading-tight">
                Order Completed
              </h3>
              <p className="text-sm">
                {formatDate(order?.completed_date || "")}
              </p>
            </li>
          </ol>
        </div>

        <div className=" rounded-lg md:col-span-2 p-4 space-y-1">
          <h3 className="text-left text-black font-bold">Items</h3>
          {orderItems.map((item, index) => (
            <Item
              services={item.service_name}
              items={item.item_type}
              quantity={item.no_of_items}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;
