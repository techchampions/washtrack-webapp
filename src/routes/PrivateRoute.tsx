import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';

export const PrivateRoute: React.FC = () => {
  const {token, user} = useAuth();
  const location = useLocation();

  if(!token) {
    return <Navigate to={"/auth/login"}  state={{ from: location }} 
        replace  />
  }

  if (!token) {
    return (
      <Navigate 
        to="/auth/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

   if (user && !user.email_verified_at && !location.pathname.includes('/auth/verify-email')) {
    return <Navigate to="/auth/verify-email" replace />;
  }

  if(user && location.pathname.startsWith('/dashboard')) {
    const hasAddress = user.address && user.address.length > 0;
    
    // Redirect to onboarding if user hasn't completed setup
    if (!hasAddress) {
      return <Navigate to="/onboarding/store-profile-setup" replace />;
    }
  }

  if(!user && !location.pathname.includes('/dashboard')) {
    return <Navigate to={'/auth/login'}/>
  }

  // console.log(location)


  return <Outlet />;

};