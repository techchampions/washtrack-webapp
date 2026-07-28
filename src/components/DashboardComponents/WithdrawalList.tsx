import { formatDate, formatPrice } from "@/utils/formatter";
import { BanknoteArrowDown, Info } from "lucide-react";
import React from "react";
interface Prop {
  withdrawals: ReferralTransaction[];
}
const WithdrawalList: React.FC<Prop> = ({ withdrawals }) => {
  // const renderStatus = (status: "success" | "pending" | "failed") => {
  //   if (status === "success") {
  //     return (
  //       <div className="bg-green-300/50 text-green-500 px-4 text-center font-semibold text-xs py-1 w-fit rounded-lg">
  //         {status}
  //       </div>
  //     );
  //   }
  //   if (status === "pending") {
  //     return (
  //       <div className="bg-indigo-300/50 text-indigo-500 px-4 text-center font-semibold text-xs py-1 w-fit rounded-lg">
  //         {status}
  //       </div>
  //     );
  //   }
  //   if (status === "failed") {
  //     return (
  //       <div className="bg-red-300/50 text-red-500 px-4 text-center font-semibold text-xs py-1 w-fit rounded-lg">
  //         {status}
  //       </div>
  //     );
  //   }
  // };
  return (
    <div className="">
      {withdrawals.length < 1 ? (
        <div className="bg-brand p-4 flex items-center gap-2 text-white">
          <Info />
          <span>No withdrawals yet.</span>
        </div>
      ) : (
        <div className="space-y-3 text-left">
          <div className="grid grid-cols-13 font-bold text-gray-500">
            <div className=""></div>
            <div className="col-span-3">Type</div>
            <div className="col-span-3">Date</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-3">Amount</div>
          </div>

          <div className="space-y-1">
            {withdrawals.map((item, i) => (
              <div
                key={i}
                className="bg-brand-100 cursor-pointer p-2 rounded-lg border border-gray-100 grid grid-cols-13"
              >
                {/* Icon */}
                <div className="w-7 h-7 rounded-full flex justify-center items-center bg-brand/30 text-quick-action-icon">
                  <BanknoteArrowDown className="h-5 w-5" />
                </div>

                <div className="text-quick-action-icon font-semibold col-span-3">
                  {"Withdrawal"}
                </div>
                <div className="col-span-3">{formatDate(item.date)}</div>
                <div className="col-span-3">{item.type}</div>
                <div className="col-span-3">{formatPrice(item.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalList;
