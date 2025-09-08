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
import { useGetProcessingOrders } from "@/hooks/query/useGetUserOrders";
import Loader from "@/components/GeneralComponents/Loader";

const HomeScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState("Today");
  const { isError } = useGetUserProfile();
  const { data, isLoading, isError: isErrorOrder } = useGetProcessingOrders();
  if (isError) {
    showError("Failed to get user profile");
  }
  if (isErrorOrder) {
    showError("Failed to get user Orders");
  }
  if (isLoading) {
    return <Loader />;
  }
  const orders = data || [];
  const completedOrders = orders?.filter((o) => o.status === "completed");
  const pendingOrders = orders?.filter((o) => o.status === "pending");

  const sumAmounts = (orderArray: typeof orders) =>
    orderArray?.reduce((acc, o) => acc + o.totalAmount, 0);

  return (
    <div className="w-full md:w-[90%] mx-auto">
      <div className="flex flex-col md:flex-row gap-4 h-fit md:h-[200px]">
        <MainCard>
          <div className="text-black mb-4">
            <CustomDropdown
              options={["Today", "Yesterday"]}
              selected={selectedDay}
              onSelect={setSelectedDay}
            />
          </div>
          <div>
            <p className="flex items-center text-lg flex-row gap-2">
              Total Orders <Badge count={orders?.length} />
            </p>
            <h2 className="text-[40px] md:text-[60px] font-brand-bold">
              ₦{sumAmounts(orders).toLocaleString()}
            </h2>
          </div>
        </MainCard>

        <div className="hidden md:flex flex-row md:flex-col w-full md:w-[45%] h-full gap-1 justify-between">
          <SmallMainCard>
            <div className="bg-white p-1 flex justify-start items-center rounded-full">
              <BiCheckCircle className="h-[30px] w-[30px] text-green-500" />
            </div>
            <div className="w-[70%] flex flex-col text-left">
              <p className="flex items-center text-lg flex-row gap-2">
                Completed <Badge count={completedOrders.length} />
              </p>
              <h2 className="text-md lg:text-2xl font-bold">
                ₦{sumAmounts(completedOrders).toLocaleString()}
              </h2>
            </div>
          </SmallMainCard>

          <SmallMainCard>
            <div className="bg-white p-1 flex justify-start items-center rounded-full">
              <FaClockRotateLeft className="h-[30px] w-[30px] text-red-500" />
            </div>
            <div className="w-[70%] flex flex-col text-left">
              <p className="flex items-center text-lg flex-row gap-2">
                Pending <Badge count={pendingOrders.length} />
              </p>
              <h2 className="text-md lg:text-2xl font-bold">
                ₦{sumAmounts(pendingOrders).toLocaleString()}
              </h2>
            </div>
          </SmallMainCard>
        </div>
      </div>

      <QuickActions />

      <div className="mt-6">
        <h3 className="text-lg md:text-2xl text-black text-left font-brand-bold md-2 md:mb-4">
          Recent Orders
        </h3>
        <OrderList orders={orders} />
      </div>
    </div>
  );
};
export default HomeScreen;
