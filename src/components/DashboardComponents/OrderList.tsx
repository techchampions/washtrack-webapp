// import React from "react";
// import { BsClipboard2Check } from "react-icons/bs";

// const OrderList = () => {
//   const orders = [];
//   return (
//     <div className="bg-brand-100 text-[25px] p-4 rounded-lg border border-gray-200 flex flex-row justify-start items-center gap-6">
//       <div className="bg-brand-250 p-3 flex justify-center items-center rounded-full border border-brand-border">
//         <BsClipboard2Check size={25} className="text-dark-purple" />
//       </div>
//       <div className="flex flex-col w-full text-left justify-start text-black">
//         <p className="text-dark-purple">Order #676888 </p>
//         <p className="text-gray-500">Victoria Idris - 09012345678</p>
//       </div>
//       <div className="flex flex-col">
//         <p className="text-gray-500">12/10/24</p>
//         <p className="text-dark-purple">₦250,000</p>
//       </div>
//     </div>
//   );
// };

// export default OrderList;
import React from "react";
import OrderItem from "./OrdetItem";

const orders = [
  {
    orderId: "676888",
    customerName: "Victoria Idris",
    phoneNumber: "09012345678",
    date: "12/10/24",
    amount: "₦250,000",
  },
  {
    orderId: "676889",
    customerName: "John Doe",
    phoneNumber: "08123456789",
    date: "13/10/24",
    amount: "₦120,000",
  },
  {
    orderId: "676890",
    customerName: "Jane Smith",
    phoneNumber: "08098765432",
    date: "14/10/24",
    amount: "₦80,000",
  },
];

const OrderList = () => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderItem key={order.orderId} {...order} />
      ))}
    </div>
  );
};

export default OrderList;
