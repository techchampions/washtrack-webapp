import React from 'react';
import { useNavigate } from 'react-router-dom';

import cappedMan from '@/assets/images/capped.png';
import { Button } from '../common/Button';
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import { useAuthStore } from '@/store/auth.store';

const AuthFlowComplete = () => {
  const { user } = useAuthStore();

  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen min-w-screen overflow-hidden flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${landingBannerImage})` }}
    >


      <div className=" min-h-3/6 flex items-center  justify-center md:max-sm:bg-white p-4">
        <div className="bg-white border-0 rounded-none  md:rounded-3xl md:shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-8">
            <div className='w-20 h-20 flex items-center justify-center mx-auto mb-t'>
              <img
                src={cappedMan}
                alt="Background"
                className="relative"
              />
            </div>

            {/* <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <div className="w-12 h-8 bg-blue-600 rounded-t-full mx-auto mb-2"></div>
          <div className="w-16 h-12 bg-yellow-400 rounded-b-2xl mx-auto"></div> */}
          </div>

          <p className="text-brand text-sm mb-2">Hi {user?.store_name} best store!</p>
          <h1 className="text-2xl font-bold text-dark mb-4">Welcome to WashTrack</h1>
          <p className="text-gray-600 mb-8">
            Would you like to continue with your store,<br />
            setup to get started
          </p>
          <Button
            style={{ "borderRadius": "40px" }}
            type="submit"
            className="w-full p-0 m-0 mb-1"
            size="md"
            onClick={() => navigate('/onboarding/store-profile-setup')}

          >
            Continue Setup
          </Button>
          {/* <button
          onClick={() => navigate('/onboarding/store-profile-setup')}
          className="w-full bg-cyan-400 text-white font-semibold py-4 rounded-2xl hover:bg-cyan-500 transition-colors"
        >
          
        </button> */}
        </div>
      </div>

    </div>


  )
};

export default AuthFlowComplete;