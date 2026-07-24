import {
  Header,
  MainCard,
  RightSideBar,
} from "@/components/DashboardComponents";
import CopyButton from "@/components/DashboardComponents/CopyButton";
import ReferralPageTabs from "@/components/DashboardComponents/ReferralPageTabs";
import WithdrawalModal from "@/components/DashboardComponents/WithdrawalModal";
import { Button } from "@/components/FormComponents";
import { useGetReferralStats } from "@/hooks/query/useReferral";
import { useModal } from "@/store/useModal.store";
import { formatCompactPrice, formatPrice } from "@/utils/formatter";
import { BanknoteArrowDown, DollarSign, Users2 } from "lucide-react";
import React from "react";

const ReferralPage = () => {
  const { data, isLoading } = useGetReferralStats();
  const modal = useModal();
  const handleWithdrawal = () => {
    modal.openModal(<WithdrawalModal />);
  };
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full sm:w-2/3 space-y-6">
          <div className="grid sm:grid-cols-3 gap-2">
            <div className="sm:col-span-2 order-2 sm:order-1">
              <MainCard
                isLoading={isLoading}
                className="rounded-xl py-4! px-4!"
              >
                <div className="">
                  <div className=" space-y-2">
                    <div className="text-2xl font-semibold w-2/3">
                      Referr & Earn with Washtrack
                    </div>
                    <div className="">
                      <div className="">Current Balance</div>
                      <div className="text-3xl sm:text-4xl font-bold">
                        {formatPrice(data?.data.wallet.balance || 0)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={handleWithdrawal}
                        label="Withdraw"
                        className="bg-white text-brand!"
                        icon={<BanknoteArrowDown />}
                      />
                      <CopyButton
                        text={data?.data.referral_code || "No code"}
                        className="flex-1 justify-between"
                      />
                    </div>
                  </div>
                </div>
              </MainCard>
            </div>
            <div className="grid order-1 sm:order-2 gap-2">
              <MainCard
                isLoading={isLoading}
                className="rounded-xl py-2! px-2!"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-white/50 flex justify-center items-center rounded-full">
                    <Users2 className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">Total Referrals</div>
                    <div className="text-xl font-bold">
                      {data?.data.number_of_referrals || 0}
                    </div>
                  </div>
                </div>
              </MainCard>
              <MainCard
                isLoading={isLoading}
                className="rounded-xl py-2! px-2!"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-white/50 flex justify-center items-center rounded-full">
                    <DollarSign className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">Total Earnings</div>
                    <div className="text-xl font-bold">
                      {formatCompactPrice(data?.data.wallet.total_earned || 0)}
                    </div>
                  </div>
                </div>
              </MainCard>
              <MainCard
                isLoading={isLoading}
                className="rounded-xl py-2! px-2!"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-white/50 flex justify-center items-center rounded-full">
                    <BanknoteArrowDown className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">Total Withdrawals</div>
                    <div className="text-xl font-bold">
                      {formatCompactPrice(
                        data?.data.wallet.total_withdrawn || 0
                      )}
                    </div>
                  </div>
                </div>
              </MainCard>
            </div>
          </div>
          {data?.data && <ReferralPageTabs data={data.data} />}
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default ReferralPage;
