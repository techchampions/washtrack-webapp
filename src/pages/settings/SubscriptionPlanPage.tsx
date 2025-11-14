import { Header } from "@/components/DashboardComponents";
import SubscriptionPlanPageLoading from "@/components/DashboardComponents/LoadingComponents/SubscriptionPlanPageLoading";
import ConfirmUpgrade from "@/components/DashboardComponents/SubscriptionComponents/ConfirmUpgrade";
import { Button } from "@/components/FormComponents";
import {
  useGetAllSubscriptions,
  useGetSubscription,
} from "@/hooks/query/useGetUserSubscription";
import { useModal } from "@/store/useModal.store";
import { formatPrice } from "@/utils/formatter";
import { CheckCircle2, Info } from "lucide-react";
import React from "react";

const SubscriptionPlanPage = () => {
  const { data, isLoading } = useGetAllSubscriptions();
  const { data: subData, isLoading: subDataLoading } = useGetSubscription();
  const modal = useModal();
  if (isLoading || subDataLoading) {
    return <SubscriptionPlanPageLoading />;
  }
  const plans = data?.plans ?? [];
  const current_plan = data?.current;
  const currentPlan_benefits = JSON.parse(data?.current.benefits || "");
  return (
    <div>
      <Header />
      <div className="">
        <div className="flex flex-wrap justify-start gap-3 p-5 text-left text-white bg-quick-action-icon rounded-2xl">
          <div className="">
            <div className="">Active Plan</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{data?.current.name}</div>
              {subData?.expired && (
                <div className="bg-red-500 text-white rounded-2xl text-sm px-2">
                  Expired
                </div>
              )}
            </div>
            <div className="text-sm text-gray-200">{data?.current.caption}</div>
            <div className="">{data?.current.features}</div>
            <div className="flex items-center gap-1 text-gray-400">
              <Info size={16} />
              {subData?.ordersLeft} orders left
            </div>
          </div>
          <div className="w-full md:w-auto">
            <ul className="ml-5 space-y-1 text-sm text-left text-gray-300 list-inside">
              {currentPlan_benefits.map((item: string, i: number) => (
                <li className="flex items-center gap-2" key={i}>
                  <CheckCircle2 size={15} />
                  {item}
                </li>
              ))}
            </ul>
            {(data?.current.price || 0) > 1 && (
              <div className="px-4">
                <Button
                  label={`Renew at ${formatPrice(data?.current.price || 0)}`}
                  className="bg-white hover:bg-white/50 text-sm mt-3 !py-1 !text-quick-action-icon"
                  onClick={() =>
                    modal.openModal(<ConfirmUpgrade plan={current_plan} />)
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="">
        <div className="my-5 text-left">
          <h3 className="text-3xl font-bold">Monthly Subsripions</h3>
          <p>
            Unlock and enjoy fast laundry management experience like never
            before.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const benefits: (typeof plan.benefits)[] = JSON.parse(
              plan.benefits
            );
            return (
              <div
                className="flex flex-col border border-gray-300 cursor-pointer hover:border-none hover:shadow-2xl p-4 hover:bg-quick-action-icon hover:text-white hover:[&>div>ul]:text-gray-100 hover:[&>div>button]:bg-white hover:[&>div>button]:text-brand transition duration-300 rounded-2xl overflow-hidden min-h-[350px]"
                key={i}
              >
                <div className="pb-2 h-[150px] flex flex-col justify-between border-b border-gray-200 text-left px-1 lg:px-2">
                  <div className="">
                    <div className={`text-lg lg:text-2xl font-bold text-brand`}>
                      {plan.name}
                    </div>
                    <div className="text-xs text-gray-400">{plan.caption}</div>
                  </div>
                  <div className="">
                    <span className="text-lg font-bold lg:text-3xl">
                      {formatPrice(plan.price)}
                    </span>{" "}
                    <span className="text-gray-400">per month</span>
                  </div>
                </div>
                <div className="flex-1 py-4">
                  <ul className="ml-5 space-y-1 text-sm text-left text-gray-500 list-inside">
                    {benefits.map((item, i) => (
                      <li className="flex items-center gap-2" key={i}>
                        <CheckCircle2 size={15} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4">
                  <Button
                    label="Subscribe"
                    onClick={() =>
                      modal.openModal(<ConfirmUpgrade plan={plan} />)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlanPage;
