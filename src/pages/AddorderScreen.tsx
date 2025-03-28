import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaChevronRight } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineCalendarToday } from "react-icons/md";
import Button from "../components/FormComponents/Button";
import RightSideBar from "../components/DashboardComponents/RightSideBar";
import Modal from "../components/DashboardComponents/Modal";
import Loader from "../components/GeneralComponents/Loader";

const AddorderScreen: React.FC = () => {
  const [pickupDate, setPickupDate] = useState<Date | null>(new Date());

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full md:w-[90%] mx-auto">
      {/* Left Section */}
      <div className="w-full md:w-2/3">
        {/* Customer Info */}
        <div className="flex items-center justify-between py-2 px-4 bg-brand-100 rounded-lg">
          <div className="flex items-center gap-4">
            <img
              src="../images/user-icon.png"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-left">
              <p className="font-bold text-quick-action-icon">Victoria Idris</p>
              <p className="text-gray-500 text-sm">
                09034394849 - victoria@gmail.com
              </p>
            </div>
          </div>
          <FaChevronRight className="text-quick-action-icon" />
        </div>

        {/* Added Item */}
        <div className="flex text-black items-center justify-between w-full py-3 mt-10">
          <div className="font-brand-bold text-2xl">Add Item</div>
          <FiPlusCircle className="text-black h-8 w-8" />
        </div>
        <div className="mt-4 bg-brand-100 rounded-lg flex justify-between py-2 px-4 items-center">
          <div className="flex items-center gap-4">
            <img src="../images/order-icon.png" className="w-10" alt="" />
            <div className="text-left">
              <p className="font-semibold text-quick-action-icon">
                Wash & Iron
              </p>
              <p className="text-gray-500 text-sm">Trouser - 2 pieces</p>
            </div>
          </div>
          <button className="text-gray-500">✖</button>
        </div>

        {/* Pickup Date with Date Picker */}
        <div className="mt-4">
          <div className="text-black text-left text-2xl font-brand-bold">
            Pickup Date
          </div>
          <div className="relative mt-2 w-full flex flex-row border border-gray-300 rounded-lg">
            <DatePicker
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              className="w-full p-3 outline-none rounded-lg text-gray-500"
              dateFormat="dd-MM-yyyy"
              placeholderText="Select date"
            />
            <MdOutlineCalendarToday className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Payment Details */}
        <div className="text-black font-brand-bold text-2xl mb-2 text-left mt-4">
          Payment
        </div>
        <div className="mt-4 bg-brand-100 p-4 mb-4 rounded-lg">
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

        {/* Submit Button */}
        <Button label="Create Order" />
      </div>

      {/* Right Sidebar */}
      <RightSideBar />
    </div>
  );
};

export default AddorderScreen;
