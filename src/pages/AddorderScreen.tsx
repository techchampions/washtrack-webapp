import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";

const AddorderScreen: React.FC = () => {
  const [pickupDate, setPickupDate] = useState<string>("2024-07-22");

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full p-6 bg-white shadow-lg rounded-lg">
      {/* Left Section */}
      <div className="w-full md:w-2/3">
        {/* Customer Info */}
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-4">
            <FaUserCircle size={30} className="text-blue-500" />
            <div>
              <p className="font-bold">Victoria Idris</p>
              <p className="text-gray-500 text-sm">
                09034394849 - victoria@gmail.com
              </p>
            </div>
          </div>
          <button className="text-gray-500">▶</button>
        </div>

        {/* Added Item */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-semibold">Wash & Iron</p>
            <p className="text-gray-500 text-sm">Trouser - 2 pieces</p>
          </div>
          <button className="text-gray-500">✖</button>
        </div>

        {/* Pickup Date */}
        <div className="mt-4">
          <label className="text-gray-600 font-semibold">Pickup Date</label>
          <div className="relative mt-2">
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <MdOutlineCalendarToday className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Payment Details */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600 font-semibold mb-2">Payment</p>
          <div className="flex justify-between text-gray-600">
            <span>Cost of service</span>
            <span className="font-bold">₦30,000</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Amount Paid</span>
            <span className="font-bold">₦10,000</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Balance</span>
            <span className="font-bold">₦20,000</span>
          </div>
          <div className="flex justify-between mt-2 text-black font-bold">
            <span>Total Amount</span>
            <span>₦30,000</span>
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-500 text-white p-3 mt-4 rounded-lg">
          Create Order
        </button>
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div className="p-4 bg-blue-500 text-white rounded-lg text-center">
          <p className="font-bold">GET STARTED WITH WASHTRACK</p>
          <button className="bg-white text-blue-500 p-2 rounded-lg mt-2">
            GET STARTED
          </button>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <p className="font-bold">DOWNLOAD MOBILE APP</p>
          <div className="flex justify-center gap-2 mt-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Google_Play_Store_badge_EN.svg/192px-Google_Play_Store_badge_EN.svg.png"
              alt="Google Play"
              className="w-20"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Download_on_the_App_Store_Badge_US-UK.svg/192px-Download_on_the_App_Store_Badge_US-UK.svg.png"
              alt="App Store"
              className="w-20"
            />
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <p className="font-bold">DO MORE WITH WASHTRACK</p>
          <p className="text-sm text-gray-500">
            Build with Tech Champions today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddorderScreen;
