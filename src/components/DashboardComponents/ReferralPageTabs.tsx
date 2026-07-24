import ReferralEarningsList from "@/components/DashboardComponents/EarningList";
import ReferredUserList from "@/components/DashboardComponents/ReferredUserList";
import WithdrawalList from "@/components/DashboardComponents/WithdrawalList";
import React, { useState } from "react";
interface Prop {
  data: ReferralStatData;
}
const ReferralPageTabs: React.FC<Prop> = ({ data }) => {
  const [activeTab, setactiveTab] = useState("referrals");
  const tabs = ["referrals", "earnings", "withdrawals"];
  const referrals = data.referred_users_details || [];
  const earnings = data.transaction_history.filter((i) => i.type === "credit");
  const withdrawals = data.transaction_history.filter(
    (i) => i.type === "debit"
  );
  const renderList = () => {
    if (activeTab === "referrals") {
      return <ReferredUserList referredUsers={referrals} />;
    }
    if (activeTab === "earnings") {
      return <ReferralEarningsList earnings={earnings} />;
    }
    if (activeTab === "withdrawals") {
      return <WithdrawalList withdrawals={withdrawals} />;
    }
  };
  return (
    <div className="space-y-3">
      <div className="w-full flex items-center gap-2">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${
              activeTab === tab
                ? "bg-brand text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } px-6 py-1.5 rounded-lg capitalize text-base truncate sm:text-lg cursor-pointer`}
            onClick={() => setactiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {renderList()}
    </div>
  );
};

export default ReferralPageTabs;
