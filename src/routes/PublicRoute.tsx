import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';

export const PublicRoute: React.FC = () => {
  const {token, user} = useAuth()


  if(token && user) {

    if(!user.email_verified_at) {
      return <Navigate to={"/auth/verify-email"} replace />
    }

    const hasAddress = user.address && user.address.length > 0;
    if(!hasAddress) {
      return <Navigate  to={"/onboarding/store-profile-setup"}/>
    }

    return <Navigate to="/dashboard" replace />;
  }
 
  return <Outlet />;
};