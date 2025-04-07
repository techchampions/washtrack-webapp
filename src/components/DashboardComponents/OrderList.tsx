import React from "react";
import OrderItem from "./OrdetItem";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

// const orders = [
//   {
//     orderId: "676888",
//     customerName: "Victoria Idris",
//     phoneNumber: "09012345678",
//     date: "12/10/24",
//     amount: "₦250,000",
//   },
//   {
//     orderId: "676889",
//     customerName: "John Doe",
//     phoneNumber: "08123456789",
//     date: "13/10/24",
//     amount: "₦120,000",
//   },
//   {
//     orderId: "676890",
//     customerName: "Jane Smith",
//     phoneNumber: "08098765432",
//     date: "14/10/24",
//     amount: "₦80,000",
//   },
//   {
//     orderId: "676888",
//     customerName: "Victoria Idris",
//     phoneNumber: "09012345678",
//     date: "12/10/24",
//     amount: "₦250,000",
//   },
//   {
//     orderId: "676889",
//     customerName: "John Doe",
//     phoneNumber: "08123456789",
//     date: "13/10/24",
//     amount: "₦120,000",
//   },
//   {
//     orderId: "676890",
//     customerName: "Jane Smith",
//     phoneNumber: "08098765432",
//     date: "14/10/24",
//     amount: "₦80,000",
//   },
//   {
//     orderId: "676888",
//     customerName: "Victoria Idris",
//     phoneNumber: "09012345678",
//     date: "12/10/24",
//     amount: "₦250,000",
//   },
//   {
//     orderId: "676889",
//     customerName: "John Doe",
//     phoneNumber: "08123456789",
//     date: "13/10/24",
//     amount: "₦120,000",
//   },
//   {
//     orderId: "676890",
//     customerName: "Jane Smith",
//     phoneNumber: "08098765432",
//     date: "14/10/24",
//     amount: "₦80,000",
//   },
//   {
//     orderId: "676888",
//     customerName: "Victoria Idris",
//     phoneNumber: "09012345678",
//     date: "12/10/24",
//     amount: "₦250,000",
//   },
//   {
//     orderId: "676889",
//     customerName: "John Doe",
//     phoneNumber: "08123456789",
//     date: "13/10/24",
//     amount: "₦120,000",
//   },
//   {
//     orderId: "676890",
//     customerName: "Jane Smith",
//     phoneNumber: "08098765432",
//     date: "14/10/24",
//     amount: "₦80,000",
//   },
//   {
//     orderId: "676888",
//     customerName: "Victoria Idris",
//     phoneNumber: "09012345678",
//     date: "12/10/24",
//     amount: "₦250,000",
//   },
//   {
//     orderId: "676889",
//     customerName: "John Doe",
//     phoneNumber: "08123456789",
//     date: "13/10/24",
//     amount: "₦120,000",
//   },
//   {
//     orderId: "676890",
//     customerName: "Jane Smith",
//     phoneNumber: "08098765432",
//     date: "14/10/24",
//     amount: "₦80,000",
//   },
// ];

const OrderList = ({ orders }) => {
  const navigate = useNavigate();

  return orders.length === 0 ? (
    <div className="flex text-left text-brand font-brand-bold py-10">
      <FaExclamationCircle className="text-3xl text-brand mr-2" />
      You have no Orders
    </div>
  ) : (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderItem
          key={order.orderId}
          {...order}
          onClick={() => {
            // Navigate to a dynamic URL with the orderId
            navigate(`/dashboard/order/${order.orderId}`);
          }}
        />
      ))}
    </div>
  );
};

export default OrderList;
