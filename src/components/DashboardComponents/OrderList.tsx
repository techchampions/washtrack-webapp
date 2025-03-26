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
