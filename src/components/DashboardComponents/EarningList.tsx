import { referredUsers } from "@/data/constants";
import { formatDate, formatPrice } from "@/utils/formatter";
import { Info } from "lucide-react";
import React from "react";
interface Prop {
  earnings: ReferralTransaction[];
}
const ReferralEarningsList: React.FC<Prop> = ({ earnings }) => {
  return (
    <div className="">
      {referredUsers.length < 1 ? (
        <div className="bg-brand p-4 flex items-center gap-2 text-white">
          <Info />
          <span>No Earnings yet.</span>
        </div>
      ) : (
        <div className="space-y-3 text-left">
          <div className="grid grid-cols-10 font-bold text-gray-500">
            <div className=""></div>
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Date joined</div>
            <div className="col-span-3">Commission</div>
          </div>

          <div className="space-y-1">
            {earnings.map((item) => (
              <div
                key={item.id}
                className="bg-brand-100 cursor-pointer p-2 rounded-lg border border-gray-100 grid grid-cols-10"
              >
                {/* Icon */}
                <img
                  src="/images/user-icon.png"
                  alt="inventory"
                  className="h-7 w-7"
                />

                <div className="text-quick-action-icon font-semibold col-span-3">
                  {item.source_type}
                </div>
                <div className="col-span-3">{formatDate(item.date)}</div>
                <div className="col-span-3">{formatPrice(item.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralEarningsList;
