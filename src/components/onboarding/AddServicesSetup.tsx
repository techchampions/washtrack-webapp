 import React from 'react';
import {  Edit2, Trash2, } from 'lucide-react';

const AddServicesSetup = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background-shirt.png')" }} // Replace with your image path
    >
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-[90%] text-center">
        <h2 className="text-[#00BCFF] text-xl font-semibold">Add your services</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Add the services you render below to complete your store setup
        </p>

     
        <button
          className="mt-6 w-full rounded-full bg-[#00BCFF] py-3 text-white font-medium hover:bg-[#00A8E4] transition"
        >
          Add a service
        </button>

        {/* Info */}
        <p className="text-gray-400 mt-6 text-xs">
          Click the “Add a service” button to add the type of services you render in your laundry store
        </p>

        {/* Next Button */}
        <button
          disabled
          className="mt-4 w-full rounded-full bg-[#00BCFF]/30 py-3 text-white font-medium cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddServicesSetup;