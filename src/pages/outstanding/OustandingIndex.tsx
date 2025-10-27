import {
  CustomDropdown,
  Header,
  MainCard,
  RightSideBar,
} from "@/components/DashboardComponents";
import OrderItemLoading from "@/components/DashboardComponents/OrderItemLoading";
import OutstandingList from "@/components/DashboardComponents/OutstandingComponents/OutstandingList";
import LinkButton from "@/components/GeneralComponents/LinkButton";
import { useGetOustanding } from "@/hooks/query/useGetOustanding";
import { formatPrice } from "@/utils/formatter";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

const OutstandingIndex = () => {
  const [filter, setfilter] = useState("all");
  const { data, isLoading } = useGetOustanding(filter);
  if (isLoading) {
    return <OrderItemLoading />;
  }
  const outstandings = data?.Outstanding ?? [];
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full space-y-5 lg:w-2/3">
          <div className="h-[240px]">
            <MainCard>
              <div className="mb-4 text-black">
                <CustomDropdown
                  options={["all", "Today", "Yesterday", "this_week"]}
                  selected={filter}
                  onSelect={setfilter}
                />
              </div>
              <div>
                <p className="flex flex-row items-center gap-2 text-lg">
                  Total Oustanding
                </p>
                <h2 className="text-[40px] md:text-[60px] font-bold">
                  {formatPrice(data?.totalOutStanding || "")}
                </h2>
              </div>
            </MainCard>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-left">Outstandings</h3>
            <OutstandingList outstandings={outstandings} />
            {outstandings.length > 2 && (
              <div className="mt-5">
                <LinkButton
                  href="/dashboard/outstandings/list"
                  label="View More"
                  rightIcon={<ArrowRight />}
                  className="!font-bold !text-quick-action-icon"
                />
              </div>
            )}
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default OutstandingIndex;
