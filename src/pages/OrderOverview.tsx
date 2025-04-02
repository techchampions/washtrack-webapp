import React from "react";
import Item from "../components/DashboardComponents/Item";

const OrderOverview = () => {
  return (
    <div className="w-full md:w-[90%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col rounded-lg bg-brand-100 p-4 divide-y divide-gray-300 gap-2 w-full">
          <div className="flex justify-start gap-2 text-black pb-2 ">
            <img src="/images/washing_machine.svg" alt="" />
            <div className="flex flex-col text-left justify-start">
              <h2 className="text-2xl font-bold">Order #75940398</h2>
              <p className="text-sm">Order Date: 22/04/2024 - 10AM</p>
              <p className="text-sm">Pickup Date: 22/04/2024 - 02PM</p>
              <p className="text-sm">No of Items: 8 Items</p>
            </div>
          </div>
          <div className="flex flex-col justify-start text-left text-black">
            <h2 className="text-2xl font-bold">Order details</h2>
            <p className="text-sm">Order number: #84993393</p>
            <p className="text-sm">Customer name: Victoria idris</p>
            <p className="text-sm">Phone number: Victoria idris</p>
            <p className="text-sm">Customer email: victoria@gmail.com</p>
          </div>
        </div>

        <div className="bg-brand-100 p-4 rounded-lg md:col-span-2">
          <h3 className="text-black text-lg md:text-2xl text-left font-brand-bold py-2">
            Payment Details
          </h3>
          <div className="flex justify-between text-black py-2">
            <span>Cost of service</span>
            <span className="font-bold">₦30,000</span>
          </div>
          <div className="flex justify-between text-black py-2">
            <span>Amount Paid</span>
            <span className="font-bold">₦10,000</span>
          </div>
          <div className="flex justify-between text-black py-2">
            <span>Balance</span>
            <span className="font-bold">₦20,000</span>
          </div>
          <div className="flex justify-between mt-2 bg-white p-2 rounded-lg border border-gray-300 text-black font-bold">
            <span>Total Amount</span>
            <span>₦30,000</span>
          </div>
        </div>

        <div className="flex flel-col bg-brand-100 rounded-lg py-4 px-8">
          <ol className="relative text-gray-500 border-s border-gray-500 text-left ">
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center text-white justify-center w-8 h-8 bg-brand rounded-full -start-4 ring-4 ring-white">
                01
              </span>
              <h3 className="font-brand-bold text-black leading-tight">
                Order Created
              </h3>
              <p className="text-sm">22 Oct 2021 10:45AM</p>
            </li>
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white ">
                02{" "}
              </span>
              <h3 className="font-brand-bold text-black leading-tight">
                Order Processing
              </h3>
              <p className="text-sm">22 Oct 2021 10:45AM</p>
            </li>
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white ">
                03{" "}
              </span>
              <h3 className="font-brand-bold text-black leading-tight">
                Ready for Pickup
              </h3>
              <p className="text-sm">22 Oct 2021 10:45AM</p>
            </li>
            <li className="ms-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white ">
                04{" "}
              </span>
              <h3 className="font-brand-bold text-black leading-tight">
                Order Completed
              </h3>
              <p className="text-sm">22 Oct 2021 10:45AM</p>
            </li>
          </ol>
        </div>

        <div className=" rounded-lg md:col-span-2 p-4 space-y-2">
          <h3 className="text-left text-black font-brand-bold">Items</h3>
          <Item services="Wash and Iron" items="Shirts" quantity={2} />
          <Item services="Wash and Iron" items="Shirts" quantity={2} />
          <Item services="Wash and Iron" items="Shirts" quantity={2} />
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;
