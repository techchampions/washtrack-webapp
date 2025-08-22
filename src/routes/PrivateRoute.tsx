import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { useAuthStore } from "@/store/auth.store";

export const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoading, user, token } = useAuth();
  const { otpVerified, storeUpdated } = useAuthStore();
  const location = useLocation();

  console.log(location, " location from useLocation")

  // Show loading while checking authentication
  // if (isLoading) {
  //   return <Loading />;
  // }

  // Redirect to login if not authenticated
  console.log(isAuthenticated)
  // if (!isAuthenticated) {
  //   return (
  //     <Navigate 
  //       to="/auth/login" 
  //       state={{ from: location }} 
  //       replace 
  //     />
  //   );
  // }

  // if(user && !otpVerified && !location.pathname.includes('/dashboard')) {
  //   return <Navigate 
  //   to="/onboarding"
  //   state={{from: location}}
  //   replace
  //   />
  // }

  // Check if user needs email verification
  // if (user && !user.isVerified && !location.pathname.includes('/auth/verify-email')) {
  //   return <Navigate to="/auth/verify-email" replace />;
  // }

  // Check onboarding status for specific routes
  // if (user && location.pathname.startsWith('/dashboard')) {
  //   const hasAddress = user.addresses && user.addresses.length > 0;
    
  //   // Redirect to onboarding if user hasn't completed setup
  //   if (!hasAddress) {
  //     return <Navigate to="/onboarding/address-setup" replace />;
  //   }
  // }

  // Prevent access to onboarding if already completed
  // if (user && location.pathname.startsWith('/onboarding')) {
  //   const hasAddress = user.addresses && user.addresses.length > 0;
    
  //   if (user.isVerified && hasAddress) {
  //     return <Navigate to="/dashboard" replace />;
  //   }
  // }

  // Render protected content
  return <Outlet />;
};