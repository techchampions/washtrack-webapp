import {
  Header,
  MainCard,
  RightSideBar,
} from "@/components/DashboardComponents";
import LinkButton from "@/components/GeneralComponents/LinkButton";
import { useGetSubscription } from "@/hooks/query/useGetUserSubscription";
import { formatDate } from "@/utils/formatter";
import React from "react";

const SubscriptionPage = () => {
  const { data } = useGetSubscription();
  const subscriptions = data?.subscriptions ?? [];
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full space-y-5 lg:w-2/3">
          <div className="h-fit md:h-48">
            <MainCard>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex-1">
                  <div className="flex flex-col">
                    <h3 className="text-xl">Active Plan</h3>
                    <div className="flex gap-2 items-end-safe">
                      <div className="text-3xl font-bold">
                        {data?.currentPlan.name}
                      </div>
                      <div className="px-2 bg-red-500 rounded-3xl">
                        {data?.ordersLeft} orders left
                      </div>
                    </div>
                    <div className="">{data?.currentPlan.features}</div>
                    <div className="">
                      {data?.start_date} - {data?.end_date}
                    </div>
                  </div>
                </div>
              </div>

              <LinkButton
                href="/dashboard/settings/subscription/all"
                label="Change"
                className="bg-white block hover:bg-white/70 hover:!text-brand !text-brand !w-fit px-10 text-sm !py-1 mt-4"
              />
            </MainCard>
          </div>
          <div className="space-y-7">
            <div className="text-left ">
              <h3 className="mb-2 text-xl font-bold text-brand">
                Subscription History
              </h3>
              <div className="grid grid-cols-4 text-left px-4 py-2 rounded-2xl font-bold my-5 bg-brand-100">
                <div className="">Plan</div>
                <div className="">Used Orders</div>
                <div className="">Start</div>
                <div className="">Expires</div>
              </div>
              {subscriptions.map((item, index) => (
                <div
                  className="grid grid-cols-4 text-left even:bg-brand-100 rounded-2xl px-4 py-2"
                  key={index}
                >
                  <div className="">{item.plan_name}</div>
                  <div className="">{item.order_used}</div>
                  <div className="">{formatDate(item.start_date)}</div>
                  <div className="">{formatDate(item.end_date)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default SubscriptionPage;
