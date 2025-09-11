import React, { useState } from "react";
import MainCard from "../../components/DashboardComponents/MainCard";
import SmallMainCard from "../../components/DashboardComponents/SmallMaiinCard";
import { BiCheckCircle } from "react-icons/bi";
import Badge from "../../components/GeneralComponents/Badge";
import { FaClockRotateLeft } from "react-icons/fa6";
import QuickActions from "../../components/DashboardComponents/QuickActions";
import OrderList from "../../components/DashboardComponents/OrderList";
import CustomDropdown from "../../components/DashboardComponents/CustomDropdown";
import { useGetUserProfile } from "@/hooks/query/useGetUserProfile";
import { showError } from "@/utils/toast";
import Loader from "@/components/GeneralComponents/Loader";
import { useGetDashboard } from "@/hooks/query/useGetDashboard";

const HomeScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState("Today");
  const { isError } = useGetUserProfile();
  const { data, isLoading, isError: isErrorOrder } = useGetDashboard();
  if (isError) {
    showError("Failed to get user profile");
  }
  if (isErrorOrder) {
    showError("Failed to get user Orders");
  }
  if (isLoading) {
    return <Loader />;
  }
  // const orders = data.;
  // const completedOrders = orders?.filter((o) => o.status === "completed");
  // const pendingOrders = orders?.filter((o) => o.status === "pending");

  // const sumAmounts = (orderArray: typeof orders) =>
  //   orderArray?.reduce((acc, o) => acc + o.totalAmount, 0);

  return (
    <div className="w-full md:w-[90%] mx-auto">
      <div className="flex flex-col md:flex-row gap-4 h-fit md:h-[200px]">
        <MainCard>
          <div className="mb-4 text-black">
            <CustomDropdown
              options={["Today", "Yesterday"]}
              selected={selectedDay}
              onSelect={setSelectedDay}
            />
          </div>
          <div>
            <p className="flex flex-row items-center gap-2 text-lg">
              Total Orders <Badge count={data?.total_order_count} />
            </p>
            <h2 className="text-[40px] md:text-[60px] font-brand-bold">
              ₦{data?.total_amount.toLocaleString()}
            </h2>
          </div>
        </MainCard>

        <div className="hidden md:flex flex-row md:flex-col w-full md:w-[45%] h-full gap-1 justify-between">
          <SmallMainCard>
            <div className="flex items-center justify-start p-1 bg-white rounded-full">
              <BiCheckCircle className="h-[30px] w-[30px] text-green-500" />
            </div>
            <div className="w-[70%] flex flex-col text-left">
              <p className="flex flex-row items-center gap-2 text-lg">
                Completed <Badge count={data?.completed_order_count} />
              </p>
              <h2 className="font-bold text-md lg:text-2xl">
                ₦{data?.completed_amount.toLocaleString()}
              </h2>
            </div>
          </SmallMainCard>

          <SmallMainCard>
            <div className="flex items-center justify-start p-1 bg-white rounded-full">
              <FaClockRotateLeft className="h-[30px] w-[30px] text-red-500" />
            </div>
            <div className="w-[70%] flex flex-col text-left">
              <p className="flex flex-row items-center gap-2 text-lg">
                Pending <Badge count={data?.pending_order_count} />
              </p>
              <h2 className="font-bold text-md lg:text-2xl">
                ₦{data?.pending_amount.toLocaleString()}
              </h2>
            </div>
          </SmallMainCard>
        </div>
      </div>

      <QuickActions />

      <div className="mt-6">
        <h3 className="text-lg text-left text-black md:text-2xl font-brand-bold md-2 md:mb-4">
          Recent Orders
        </h3>
        <OrderList orders={data?.recent_orders} />
      </div>
    </div>
  );
};
export default HomeScreen;
