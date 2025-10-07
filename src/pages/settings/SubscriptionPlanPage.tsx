import { useGetAllSubscriptions } from "@/hooks/query/useGetUserSubscription";
import React from "react";

const SubscriptionPlanPage = () => {
  const { data } = useGetAllSubscriptions();
  const plans = data?.plans ?? [];
  console.log(plans[0].benefits);
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <div
            className=" border border-gray-300 shadow rounded-2xl overflow-hidden"
            key={i}
          >
            <div className="py-4 h-28 flex flex-col justify-end bg-brand text-white">
              <div className={`text-2xl font-bold`}>{plan.name}</div>
              <div className="text-xs">{plan.caption}</div>
            </div>
            <div className="">
              {plan.benefits}
              {/* {plan.benefits.map((benefit, i) => (
                <li className="" key={i}>
                  {benefit}
                </li>
              ))} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlanPage;
