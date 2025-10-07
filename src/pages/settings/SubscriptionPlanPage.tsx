import { Header } from "@/components/DashboardComponents";
import { Button } from "@/components/FormComponents";
import { useGetAllSubscriptions } from "@/hooks/query/useGetUserSubscription";
import { formatPrice } from "@/utils/formatter";
import { CheckCircle2 } from "lucide-react";
import React from "react";

const SubscriptionPlanPage = () => {
  const { data } = useGetAllSubscriptions();
  const plans = data?.plans ?? [];
  return (
    <div>
      <Header />
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
                className="flex flex-col border border-gray-100 hover:border-none hover:shadow-2xl p-4 hover:bg-brand hover:text-white hover:[&>div>ul]:text-gray-100 hover:[&>div>button]:bg-white hover:[&>div>button]:text-brand transition duration-300 rounded-2xl overflow-hidden min-h-[350px]"
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
                  <Button label="Subscribe" />
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
