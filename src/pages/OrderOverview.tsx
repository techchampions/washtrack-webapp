import React from "react";

const OrderOverview = () => {
  return (
    <div className="w-full md:w-[90%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="flex flex-col rounded-lg bg-brand-100 p-4 divider-y divide-black">
          <div className="flex justify-start gap-2 text-black">
            <img src="/images/washing_machine.svg" alt="" />
            <div className="flex flex-col text-left justify-start">
              <h2 className="text-2xl font-bold">Order #75940398</h2>
              <p className="text-sm">Order Date: 22/04/2024 - 10AM</p>
              <p className="text-sm">Pickup Date: 22/04/2024 - 02PM</p>
              <p className="text-sm">No of Items: 8 Items</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-100 p-4 rounded-lg col-span-2">
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
      </div>
    </div>
  );
};

export default OrderOverview;
