import React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

  const AuthFlowComplete = () => {

    const navigate = useNavigate();
    
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <div className="w-12 h-8 bg-blue-600 rounded-t-full mx-auto mb-2"></div>
          <div className="w-16 h-12 bg-yellow-400 rounded-b-2xl mx-auto"></div>
        </div>
        
        <p className="text-cyan-400 text-sm mb-2">Hi Timothy best store!</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to WashTrack</h1>
        <p className="text-gray-600 mb-8">
          Would you like to continue with your store,<br />
          setup to get started
        </p>
        
        <button 
          onClick={() => navigate('/onboarding/store-profile-setup')}
          className="w-full bg-cyan-400 text-white font-semibold py-4 rounded-2xl hover:bg-cyan-500 transition-colors"
        >
          Continue Setup
        </button>
      </div>
    </div>
  )};

export default AuthFlowComplete;