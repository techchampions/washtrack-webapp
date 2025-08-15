import React from 'react';
import {  Upload, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StoreProfileSetup = () => {
    const navigate = useNavigate();
    
   return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">Setup your store</h2>
          <p className="text-gray-600 text-sm">Fill in the information's below to setup your store</p>
        </div>

        <div className="mb-8">
          <div className="w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-center text-sm text-gray-600">Upload your store logo</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Location</label>
            <input 
              type="text" 
              placeholder="Enter your location"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store description</label>
            <textarea 
              placeholder="Enter Store description"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload store banner</label>
            <p className="text-xs text-gray-500 mb-3">Add your store banner, discounts and ads here</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Upload Store Image</p>
                <p className="text-xs text-gray-400">(Recommended Dimensions: 930*1365)</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Upload Store Image</p>
                <p className="text-xs text-gray-400">(Recommended Dimensions: 930*1365)</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('addServices')}
          className="w-full bg-cyan-400 text-white font-semibold py-4 rounded-2xl mt-8 hover:bg-cyan-500 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

}

export default StoreProfileSetup;