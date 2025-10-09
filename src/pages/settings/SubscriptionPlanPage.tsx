import { Header } from "@/components/DashboardComponents";
import SubscriptionPlanPageLoading from "@/components/DashboardComponents/LoadingComponents/SubscriptionPlanPageLoading";
import ConfirmUpgrade from "@/components/DashboardComponents/SubscriptionComponents/ConfirmUpgrade";
import { Button } from "@/components/FormComponents";
import { useGetAllSubscriptions } from "@/hooks/query/useGetUserSubscription";
import { useModal } from "@/store/useModal.store";
import { formatPrice } from "@/utils/formatter";
import { CheckCircle2 } from "lucide-react";
import React from "react";

const SubscriptionPlanPage = () => {
  const { data, isLoading } = useGetAllSubscriptions();
  const modal = useModal();
  if (isLoading) {
    return <SubscriptionPlanPageLoading />;
  }
  const plans = data?.plans ?? [];
  const current_plan = data?.current;
  const currentPlan_benefits = JSON.parse(data?.current.benefits || "");
  return (
    <div>
      <Header />
      <div className="">
        <div className="bg-quick-action-icon text-white text-left p-5 rounded-2xl flex flex-wrap gap-3 justify-start">
          <div className="">
            <div className="">Active Plan</div>
            <div className="text-2xl font-bold">{data?.current.name}</div>
            <div className="text-sm text-gray-200">{data?.current.caption}</div>
            <div className="">{data?.current.features}</div>
          </div>
          <div className="w-full md:w-auto">
            <ul className="list-inside text-left ml-5 text-sm text-gray-300 space-y-1">
              {currentPlan_benefits.map((item: string, i: number) => (
                <li className="flex gap-2 items-center" key={i}>
                  <CheckCircle2 size={15} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="px-4">
              <Button
                label={`Renew at ${formatPrice(data?.current.price || 0)}`}
                className="bg-white hover:bg-white/50 text-sm mt-3 !py-1 !text-quick-action-icon"
                onClick={() =>
                  modal.openModal(<ConfirmUpgrade plan={current_plan} />)
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="text-left my-5">
          <h3 className="text-3xl font-bold">Monthly Subsripions</h3>
          <p>
            Unlock and enjoy fast laundry management experience like never
            before.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          {plans.map((plan, i) => {
            const benefits: (typeof plan.benefits)[] = JSON.parse(
              plan.benefits
            );
            return (
              <div
                className="flex flex-col border border-gray-300 cursor-pointer hover:border-none hover:shadow-2xl p-4 hover:bg-brand hover:text-white hover:[&>div>ul]:text-gray-100 hover:[&>div>button]:bg-white hover:[&>div>button]:text-brand transition duration-300 rounded-2xl overflow-hidden min-h-[350px]"
                key={i}
              >
                <div className="pb-2 h-[150px] flex flex-col justify-end border-b border-gray-200 text-left px-1 lg:px-2">
                  <div className={`text-lg lg:text-2xl font-bold`}>
                    {plan.name}
                  </div>
                  <div className="text-xs">{plan.caption}</div>
                  <div className="">
                    <span className="text-lg lg:text-3xl font-bold">
                      {formatPrice(plan.price)}
                    </span>{" "}
                    <span className="text-gray-400">per month</span>
                  </div>
                </div>
                <div className="py-4 flex-1">
                  <ul className="list-inside text-left ml-5 text-sm text-gray-500 space-y-1">
                    {benefits.map((item, i) => (
                      <li className="flex gap-2 items-center" key={i}>
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
