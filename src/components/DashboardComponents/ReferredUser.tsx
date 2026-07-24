import { formatDate } from "@/utils/formatter";
import React from "react";

interface CustomerProps {
  user: ReferredUser;
}

const ReferredUser: React.FC<CustomerProps> = ({ user }) => {
  return (
    <div
      //   to={`/dashboard/users/order/${user.id}`}
      className="bg-brand-100 cursor-pointer p-2 rounded-lg border border-gray-100 grid grid-cols-10"
    >
      {/* Icon */}
      <img src="/images/user-icon.png" alt="inventory" className="h-7 w-7" />

      <div className="text-quick-action-icon font-semibold col-span-3">
        {user.store_name}
      </div>
      {/* user Details */}
      <div className="col-span-3 text-xs">
        <div className="">{user.email}</div>
      </div>
      <div className="col-span-3">{formatDate(user.referral_date)}</div>
    </div>
  );
};

export default ReferredUser;
