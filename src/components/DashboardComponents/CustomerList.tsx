import React from "react";
import OrderItem from "./OrdetItem";
import CustomerItem from "./CustomerItem";

const customers = [
  {
    name: "Victoria Idris",
    phoneNumber: "09012345678",
    email: "vicky@email.com",
  },
  {
    name: "Victoria Idris",
    phoneNumber: "09012345678",
    email: "vicky@email.com",
  },
  {
    name: "Victoria Idris",
    phoneNumber: "09012345678",
    email: "vicky@email.com",
  },
  {
    name: "Victoria Idris",
    phoneNumber: "09012345678",
    email: "vicky@email.com",
  },
  {
    name: "Victoria Idris",
    phoneNumber: "09012345678",
    email: "vicky@email.com",
  },
  {
    name: "Victoria Idris",
    phoneNumber: "09012345678",
    email: "vicky@email.com",
  },
  {
    name: "Victoria Idris",
    phoneNumber: "09012345678",
    email: "vicky@email.com",
  },
];

const CustomerList = () => {
  return (
    <div className="space-y-4">
      {customers.map((user) => (
        <CustomerItem key={user.name} {...user} />
      ))}
    </div>
  );
};

export default CustomerList;
