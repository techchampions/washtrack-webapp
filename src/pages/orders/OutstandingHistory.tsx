import { Header } from "@/components/DashboardComponents";
import OutstandingHistoryLoading from "@/components/DashboardComponents/LoadingComponents/OutstandingHistoryLoading";
import PayOutstandingBalance from "@/components/DashboardComponents/UpdateOrderComponents/PayOutstandingBalance";
import { Button } from "@/components/FormComponents";
import { useGetOutstandingList } from "@/hooks/query/useGetOutStandingHistory";
import { useModal } from "@/store/useModal.store";
import { formatDate, formatPrice } from "@/utils/formatter";
import React from "react";
import { useParams } from "react-router-dom";

const OutstandingHistory = () => {
  const modal = useModal();
  const { order_id } = useParams<{ order_id: string }>();
  const { data, isLoading } = useGetOutstandingList(order_id || "");
  if (isLoading) {
    return <OutstandingHistoryLoading />;
  }
  const order = data?.order;
  const oustandingHistory = data?.outstandingHistory ?? [];
  return (
    <div>
      <Header title="Outstanding History" />
      <div className="">
        <div className="bg-brand-100 text-[12px] md:text-[16px] p-2 rounded-lg border cursor-pointer border-gray-200 flex flex-row justify-between items-center gap-4">
          {/* Icon */}
          <img src="/images/order-icon.png" alt="inventory" className="h-12" />

          {/* Order Details */}
          <div className="flex flex-col flex-1 text-left">
            <p className="font-semibold text-quick-action-icon">
              Order #{order?.order_number}
            </p>
            <p className="text-gray-500">
              Amount paid :{" "}
              <span className="text-quick-action-icon">
                {formatPrice(order?.paid_amount || "")}
              </span>
            </p>
          </div>

          {/* Order Date & Amount */}
          <div className="flex flex-col text-right">
            <p className="text-sm text-gray-500">
              {formatDate(order?.created_at ?? "")}
            </p>
            <p className="font-bold text-gray-500">
              Balance :{" "}
              <span className="text-red-500">
                {formatPrice(order?.balance ?? "")}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex justify-between items center">
            <h3 className="text-lg md:text-3xl font-bold">Payment History</h3>
            {(order?.balance || 0) > 1 && (
              <Button
                label="Pay Oustanding"
                className="!w-fit px-4 text-sm"
                onClick={() =>
                  modal.openModal(<PayOutstandingBalance id={order_id || ""} />)
                }
              />
            )}
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 text-left bg-gray-100 px-4 py-2 rounded-2xl font-bold mt-5">
            <div className="hidden lg:block">No.</div>
            <div className="">Paid amount</div>
            <div className="">Balance</div>
            <div className="">Date</div>
          </div>
          {oustandingHistory.map((item, index) => (
            <div
              className="grid grid-cols-3 lg:grid-cols-4 text-left even:bg-gray-100 rounded-2xl px-4 py-2"
              key={index}
            >
              <div className="hidden lg:block">{index + 1}</div>
              <div className="">{formatPrice(item.outstanding_paid)}</div>
              <div className="">{formatPrice(item.amount_remaining)}</div>
              <div className="">{formatDate(item.created_at)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutstandingHistory;
