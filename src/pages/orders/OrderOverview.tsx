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
import { useModal } from "@/store/useModal.store";
import OrderReceipt from "@/components/DashboardComponents/OrderComponents/OrderReciept";
import ItemImages from "@/components/DashboardComponents/ItemImages";
import CompleteOrder from "@/components/DashboardComponents/CompleteOrder";

const OrderOverview = () => {
  const modal = useModal();
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
        <Button
          label="View Reciept"
          className="!min-w-fit px-4"
          onClick={() =>
            modal.openModal(
              <OrderReceipt
                order={order}
                customer={customer}
                noOfItems={noOfItems}
                orderItems={orderItems}
              />
            )
          }
        />
        {(order?.balance || 0) > 1 ? (
          <LinkButton
            href={`/dashboard/orders/outstanding/${order?.id}`}
            label="Update Outstanding Balance"
            className="!min-w-fit px-4 truncate hidden lg:flex"
          />
        ) : (
          <LinkButton
            href={`/dashboard/orders/outstanding/${order?.id}`}
            label="View Payment history"
            className="!min-w-fit px-4 truncate hidden lg:flex"
          />
        )}
      </Header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col w-full gap-2 p-4 divide-y divide-gray-300 rounded-lg bg-brand-100">
          <div className="flex justify-start gap-2 pb-2 text-black ">
            <img src="/images/washing_machine.svg" alt="" />
            <div className="flex flex-col justify-start text-left">
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

        <div className="p-4 rounded-lg bg-brand-100 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="py-2 text-lg font-bold text-left text-black md:text-2xl">
              Payment Details
            </h3>
            {(order?.balance || 0) > 1 ? (
              <LinkButton
                href={`/dashboard/orders/outstanding/${order?.id}`}
                label="Update Outstanding Balance"
                className="!w-fit text-xs px-4 truncate flex lg:hidden"
              />
            ) : (
              <LinkButton
                href={`/dashboard/orders/outstanding/${order?.id}`}
                label="View Payment history"
                className="!w-fit text-xs px-4 truncate flex lg:hidden"
              />
            )}
          </div>
          <div className="flex justify-between py-2 text-black">
            <span>Cost of service</span>
            <span className="font-bold">
              {formatPrice(order?.total_amount || "")}
            </span>
          </div>
          <div className="flex justify-between py-2 text-black">
            <span>Amount Paid</span>
            <span className="font-bold">
              {formatPrice(order?.paid_amount || "")}
            </span>
          </div>
          <div className="flex justify-between py-2 text-black">
            <span>Balance</span>
            <span className="font-bold text-red-500">
              {formatPrice(order?.balance || "")}
            </span>
          </div>
          <div className="flex justify-between p-2 mt-2 font-bold text-black bg-white border border-gray-300 rounded-lg">
            <span>Total Amount</span>
            <span>{formatPrice(order?.total_amount || "")}</span>
          </div>
        </div>

        <div className="flex px-8 py-4 rounded-lg flel-col bg-brand-100">
          <ol className="relative text-left text-gray-500 border-gray-500 border-s ">
            <li className="mb-10 cursor-pointer ms-6">
              <span
                className={`absolute flex items-center text-white justify-center w-8 h-8  ${
                  order?.created_at ? "bg-brand" : "bg-gray-100"
                } rounded-full -start-4 ring-4 ring-white`}
              >
                01
              </span>
              <h3 className="font-medium leading-tight text-black">
                Order Created
              </h3>
              <p className="text-sm">{formatDate(order?.created_at || "")}</p>
            </li>
            <li
              className="mb-10 cursor-pointer ms-6"
              onClick={() => {
                if (!order?.processing_date) {
                  updateStatus(1);
                }
              }}
            >
              <span
                className={`absolute flex items-center justify-center w-8 h-8 ${
                  order?.processing_date ? "bg-brand text-white" : "bg-gray-100"
                } rounded-full -start-4 ring-4 ring-white`}
              >
                02{" "}
              </span>
              <h3 className="font-medium leading-tight text-black">
                Order Processing
              </h3>
              <p className="text-sm">
                {formatDate(order?.processing_date || "")}
              </p>
            </li>
            <li
              className="mb-10 cursor-pointer ms-6"
              onClick={() => {
                if (order?.processing_date && !order?.ready_pickup_date) {
                  updateStatus(2);
                }
              }}
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
              <h3 className="font-medium leading-tight text-black">
                Ready for Pickup
              </h3>
              <p className="text-sm">
                {formatDate(order?.ready_pickup_date || "")}
              </p>
            </li>
            <li
              className="cursor-pointer ms-6"
              onClick={() => {
                if (
                  order?.processing_date &&
                  order?.ready_pickup_date &&
                  !order?.completed_date
                ) {
                  modal.openModal(<CompleteOrder id={order_id || ""} />);
                }
              }}
            >
              <span
                className={`absolute flex items-center justify-center w-8 h-8 ${
                  order?.completed_date ? "bg-brand text-white" : "bg-gray-100"
                } rounded-full -start-4 ring-4 ring-white`}
              >
                04{" "}
              </span>
              <h3 className="font-medium leading-tight text-black">
                Order Completed
              </h3>
              <p className="text-sm">
                {formatDate(order?.completed_date || "")}
              </p>
            </li>
          </ol>
        </div>

        <div className="p-4 space-y-1 rounded-lg lg:col-span-2">
          <h3 className="font-bold text-left text-black">Items</h3>
          {orderItems.map((item, index) => (
            <div
              className=""
              key={index}
              onClick={() =>
                modal.openModal(<ItemImages item_photos={item.photos} />)
              }
            >
              <Item
                services={item.service_name}
                items={item.item_type}
                quantity={item.no_of_items}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;
