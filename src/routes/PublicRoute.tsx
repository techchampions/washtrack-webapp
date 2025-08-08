import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { Loading } from '@/components/common/Loading/Loading';

export const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading while checking authentication
  // if (isLoading) {
  //   return <Loading />;
  // }

  // If user is authenticated, redirect based on their status
  if (isAuthenticated && user) {
    // Check if user needs email verification
    if (!user.isVerified) {
      return <Navigate to="/auth/verify-email" replace />;
    }

    // Check if user needs to complete onboarding
    const hasAddress = user.addresses && user.addresses.length > 0;
    
    if (!hasAddress) {
      return <Navigate to="/onboarding/address-setup" replace />;
    }

    // User is fully set up, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // User is not authenticated, show public pages
  return <Outlet />;
};