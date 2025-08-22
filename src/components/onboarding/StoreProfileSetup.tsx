import React from 'react';
import { Upload, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import { LoadScript } from "@react-google-maps/api";
const GOOGLE_MAPS_API_KEY = "AIzaSyBPIyWllHG8je77s56Pyp69b5mzlghzD9U";
const StoreProfileSetup = () => {
  const navigate = useNavigate();

  return (

    <div
      className="min-h-screen min-w-screen md:min-h-0 overflow-hidden flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${landingBannerImage})` }}
    >

      <div className="flex items-center justify-center min-h-0 overflow-hidden">
        <div 
        className="bg-white rounded-2xl max-w-md md:max-w-2xl sm:h-auto md:h-[90vh] lg:h-[100%] md:rounded-3xl p-3 sm:p-3 md:p-5  shadow-xl overflow-x-hidden">
          <div className="text-center mb-3">
            <h2 className="text-lg md:text-2xl font-bold text-brand mb-1 md:mb-2">Setup your store</h2>
            <p className="text-dark text-sm md:text-lg lg:text-sm">Fill in the information's below to setup your store</p>
          </div>

          <div className="mb-3">
            <div className="w-10 h-10 md:w-15 md:h-15 bg-brand rounded-full flex items-center justify-center mx-auto mb-2">
              <User className="w-3 w-3 md:w-8 md:h-8 text-white" />
            </div>
            <p className="text-center text-sm text-dark">Upload your store logo</p>
          </div>

          <div className="space-y-3  flex flex-col px-3 w-full md:w-[60vw] lg:w-[30vw] lg:max-w-lg">
            <div className=''>
              <label className="block text-left text-sm  font-medium text-[#090A0A] mb-2">Store Location</label>
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full px-4 py-3 md:px2 md:py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-left text-sm md:text-lg font-medium text-[#090A0A] mb-2">Store description</label>
              <textarea
                placeholder="Enter Store description"
                rows={3}
                className="w-full px-4 h-15 md:py-3 md:px2 md:py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand focus:border-transparent outline-none resize-none"
              />
            </div>

            <div className=''>
              <label className="block md:hidden text-left text-sm font-medium text-[#090A0A] mb-2">Upload store banner</label>
              <p className="text-xs text-left md:hidden text-gray-500 mb-3">Add your store banner</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="border-2 lg:w-50 lg:h-20 border-dashed border-gray-300 rounded-xl px-3 py-2 md:p-4 text-center">
                  <Upload className="w-4 h-4 md:w-8 md:h-8 lg:h-3 text-gray-400 mx-auto lg:mb-1" />
                  <p className="hidden lg:block text-sm md:text-xs leading-tight text-[#090A0A]">Upload Store Image</p>
                  <p className="text-xs hidden lg:block text-[#090A0A] leading-tight">(Recommended Dimensions: 930*1365)</p>
                </div>

              </div>
            </div>
          </div>

          <Button
            style={{ "borderRadius": "40px" }}
            type="submit"
            className="w-5/6 md:w-8/9 mb-1 mt-6"
            size="md"
            onClick={() => navigate('/onboarding/add-services-setup')}

          >
            Next
          </Button>
        </div>

      </div>
    </div>

  );

}

export default StoreProfileSetup;