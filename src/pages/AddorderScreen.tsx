// import React, { useState } from "react";
// import { FaChevronRight } from "react-icons/fa";
// import { FiPlusCircle } from "react-icons/fi";
// import { MdOutlineCalendarToday } from "react-icons/md";

// const AddorderScreen: React.FC = () => {
//   const [pickupDate, setPickupDate] = useState<string>("2024-07-22");

//   return (
//     <div className="flex flex-col md:flex-row gap-6 w-full">
//       {/* Left Section */}
//       <div className="w-full md:w-2/3">
//         {/* Customer Info */}
//         <div className="flex items-center justify-between p-4 bg-brand-100 rounded-lg">
//           <div className="flex items-center gap-4">
//             <img
//               src="../images/user-icon.png"
//               alt="User"
//               className="w-10 h-10 rounded-full"
//             />
//             <div className="text-left">
//               <p className="font-bold text-quick-action-icon">Victoria Idris</p>
//               <p className="text-gray-500 text-sm">
//                 09034394849 - victoria@gmail.com
//               </p>
//             </div>
//           </div>
//           <FaChevronRight className="text-quick-action-icon" />
//         </div>

//         {/* Added Item */}
//         <div className="flex text-black items-center justify-between w-full py-3 mt-10">
//           <div className="font-brand-bold text-2xl">Add Item</div>
//           <FiPlusCircle className="text-black h-8 w-8" />
//         </div>
//         <div className="mt-4 bg-brand-100 rounded-lg flex justify-between p-4 items-center">
//           <div className="flex items-center gap-4">
//             <img src="../images/order-icon.png" className="w-10" alt="" />
//             <div className="text-left">
//               <p className="font-semibold text-quick-action-icon">
//                 Wash & Iron
//               </p>
//               <p className="text-gray-500 text-sm">Trouser - 2 pieces</p>
//             </div>
//           </div>
//           <button className="text-gray-500">✖</button>
//         </div>

//         {/* Pickup Date */}
//         <div className="mt-4">
//           <label className="text-black text-left font-semibold">
//             Pickup Date
//           </label>
//           <div className="relative mt-2">
//             <input
//               date-picker={true}
//               type="date"
//               value={pickupDate}
//               onChange={(e) => setPickupDate(e.target.value)}
//               className="w-full p-3 border border-gray-500 rounded-lg text-gray-500"
//             />
//             <MdOutlineCalendarToday className="absolute right-3 top-3 text-gray-400" />
//           </div>
//         </div>

//         {/* Payment Details */}
//         <div className="mt-4 bg-gray-100 p-4 rounded-lg">
//           <p className="text-black font-semibold mb-2">Payment</p>
//           <div className="flex justify-between text-black">
//             <span>Cost of service</span>
//             <span className="font-bold">₦30,000</span>
//           </div>
//           <div className="flex justify-between text-black">
//             <span>Amount Paid</span>
//             <span className="font-bold">₦10,000</span>
//           </div>
//           <div className="flex justify-between text-black">
//             <span>Balance</span>
//             <span className="font-bold">₦20,000</span>
//           </div>
//           <div className="flex justify-between mt-2 text-black font-bold">
//             <span>Total Amount</span>
//             <span>₦30,000</span>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button className="w-full bg-blue-500 text-white p-3 mt-4 rounded-lg">
//           Create Order
//         </button>
//       </div>

//       {/* Right Sidebar */}
//       <div className="w-full md:w-1/3 flex flex-col gap-4">
//         <div className="p-4 bg-blue-500 text-white rounded-lg text-center">
//           <p className="font-bold">GET STARTED WITH WASHTRACK</p>
//           <button className="bg-white text-blue-500 p-2 rounded-lg mt-2">
//             GET STARTED
//           </button>
//         </div>

//         <div className="p-4 bg-gray-100 rounded-lg text-center">
//           <p className="font-bold">DOWNLOAD MOBILE APP</p>
//           <div className="flex justify-center gap-2 mt-2">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Google_Play_Store_badge_EN.svg/192px-Google_Play_Store_badge_EN.svg.png"
//               alt="Google Play"
//               className="w-20"
//             />
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Download_on_the_App_Store_Badge_US-UK.svg/192px-Download_on_the_App_Store_Badge_US-UK.svg.png"
//               alt="App Store"
//               className="w-20"
//             />
//           </div>
//         </div>

//         <div className="p-4 bg-gray-100 rounded-lg text-center">
//           <p className="font-bold">DO MORE WITH WASHTRACK</p>
//           <p className="text-sm text-gray-500">
//             Build with Tech Champions today.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddorderScreen;
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaChevronRight } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineCalendarToday } from "react-icons/md";
import Button from "../components/FormComponents/Button";

const AddorderScreen: React.FC = () => {
  const [pickupDate, setPickupDate] = useState<Date | null>(new Date());

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full md:w-[90%] mx-auto">
      {/* Left Section */}
      <div className="w-full md:w-2/3">
        {/* Customer Info */}
        <div className="flex items-center justify-between p-4 bg-brand-100 rounded-lg">
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
        <div className="mt-4 bg-brand-100 rounded-lg flex justify-between p-4 items-center">
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
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div className="px-16 py-12 bg-brand text-white rounded-lg text-center flex items-center justify-between">
          <div className="leading-5 text-white text-[22px] text-left p-2 rounded-lg font-brand-bold">
            GET STARTED
          </div>
          <img
            src="../images/white-logo.png"
            alt=""
            className="items-end w-16"
          />
        </div>

        <p className="font-bold text-black text-left">DOWNLOAD MOBILE APP</p>
        <div className="flex justify-center gap-2 mt-2">
          <img
            src="../images/playstore.png"
            alt="Google Play"
            className="w-1/2"
          />
          <img src="../images/appstore.png" alt="App Store" className="w-1/2" />
        </div>

        <p className="font-bold text-black text-left">DO MORE WITH WASHTRACK</p>
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-sm text-gray-500">
            Build with Tech Champions today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddorderScreen;
