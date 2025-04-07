// import React, { useEffect, useState } from "react";
// import { BiCheckCircle } from "react-icons/bi";
// import { FaClockRotateLeft } from "react-icons/fa6";
// import QuickActions from "../components/DashboardComponents/QuickActions";
// import CustomDropdown from "../components/DashboardComponents/CustomDropdown";
// import OrderList from "../components/DashboardComponents/OrderList";
// import Badge from "../components/GeneralComponents/Badge";
// import MainCard from "../components/DashboardComponents/MainCard";
// import SmallMainCard from "../components/DashboardComponents/SmallMaiinCard";
// import SmallMainCardMobile from "../components/DashboardComponents/SmallMainCardMobile";
// import apiClient from "../utils/AxiosInstance";
// import { useUserStore } from "../store/AppStore";

// function HomeScreen() {
//   const options = ["Today", "Yesterday", "12th Feb", "13th Feb"];
//   const [selectedDay, setSelectedDay] = useState(options[0]);
//   const [showModal, setshowModal] = useState(false);

//   return (
//     <div className="w-full md:w-[90%] mx-auto">
//       <div className="flex flex-col md:flex-row gap-4 h-fit md:h-[200px]">
//         <MainCard>
//           <div className="text-black mb-4">
//             <CustomDropdown
//               options={options}
//               selected={selectedDay}
//               onSelect={setSelectedDay}
//             />{" "}
//           </div>
//           <div>
//             <p className="flex items-center text-lg flex-row gap-2">
//               Total Orders{" "}
//               <span>
//                 <Badge />
//               </span>
//             </p>
//             <h2 className="text-[40px] md:text-[60px] font-brand-bold">
//               <span className="font-black">₦</span>
//               28,000.00
//             </h2>
//           </div>
//         </MainCard>
//         <div className="hidden md:flex flex-row md:flex-col w-full md:w-[45%] h-full gap-1 justify-between">
//           <SmallMainCard>
//             <div className="bg-white p-1 flex justify-start items-center rounded-full">
//               <BiCheckCircle className="h-[30px] w-[30px] text-green-500" />
//             </div>

//             <div className="w-[70%] flex flex-col text-left">
//               <p className="flex items-center text-lg flex-row gap-2">
//                 Completed{" "}
//                 <span>
//                   <Badge />
//                 </span>
//               </p>
//               <h2 className="text-md lg:text-2xl font-bold">₦ 20,000</h2>
//             </div>
//           </SmallMainCard>
//           <SmallMainCard>
//             <div className="bg-white p-1 flex justify-start items-center rounded-full">
//               <FaClockRotateLeft className="h-[30px] w-[30px] text-red-500" />
//             </div>
//             <div className="w-[70%] flex flex-col text-left">
//               <p className="flex items-center text-lg flex-row gap-2">
//                 Pending{" "}
//                 <span>
//                   <Badge />
//                 </span>
//               </p>
//               <h2 className="text-md lg:text-2xl font-bold">₦ 20,000</h2>
//             </div>
//           </SmallMainCard>
//         </div>
//         <SmallMainCardMobile>
//           <div className="flex justify-center items-center gap-1">
//             <div className="bg-white p-1 flex justify-center items-center rounded-full">
//               <FaClockRotateLeft className="h-5 w-5 md:h-[30px] md:w-[30px] text-red-500" />
//             </div>
//             <div className="w-fill flex flex-col">
//               <p className="flex items-center justify-end text-sm md:text-lg flex-row gap-2 text-gray-200">
//                 Pending{" "}
//                 <span>
//                   <Badge />
//                 </span>
//               </p>
//               <h2 className="text-lg md:text-2xl font-bold">₦ 20,000</h2>
//             </div>
//           </div>

//           <div className="flex justify-center items-center gap-1">
//             <div className="bg-white p-1 flex justify-start items-center rounded-full">
//               <BiCheckCircle className="h-5 w-5 md:h-[30px] md:w-[30px] text-green-500" />
//             </div>

//             <div className="w-fill flex flex-col text-left">
//               <p className="flex items-center text-sm md:text-lg flex-row gap-2 text-gray-200">
//                 Completed{" "}
//                 <span>
//                   <Badge />
//                 </span>
//               </p>
//               <h2 className="text-lg md:text-2xl font-bold">₦ 20,000</h2>
//             </div>
//           </div>
//         </SmallMainCardMobile>
//       </div>

//       {/* Quick Actions */}
//       <QuickActions />

//       {/* Recent Orders */}
//       <div className="mt-6">
//         <h3 className="text-lg md:text-2xl text-black text-left font-brand-bold md-2 md:mb-4">
//           Recent Orders
//         </h3>
//         <OrderList />
//       </div>
//     </div>
//   );
// }

// export default HomeScreen;

import { useEffect, useState } from "react";
import { useUserStore } from "../store/AppStore";
import MainCard from "../components/DashboardComponents/MainCard";
import SmallMainCard from "../components/DashboardComponents/SmallMaiinCard";
import { BiCheckCircle } from "react-icons/bi";
import Badge from "../components/GeneralComponents/Badge";
import { FaClockRotateLeft } from "react-icons/fa6";
import QuickActions from "../components/DashboardComponents/QuickActions";
import OrderList from "../components/DashboardComponents/OrderList";
import CustomDropdown from "../components/DashboardComponents/CustomDropdown";

export default function HomeScreen() {
  const { orders, loadOrders } = useUserStore();
  const [selectedDay, setSelectedDay] = useState("Today");

  useEffect(() => {
    loadOrders();
  }, []);

  const completedOrders = orders.filter((o) => o.status === "completed");
  const pendingOrders = orders.filter((o) => o.status === "pending");

  const sumAmounts = (orderArray) =>
    orderArray.reduce(
      (acc, o) => acc + parseInt(o.amount.replace(/[^\d]/g, "")),
      0
    );

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
              Total Orders <Badge count={orders.length} />
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
}
