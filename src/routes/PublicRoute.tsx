import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { useAuthStore } from '@/store/auth.store';

export const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const {otpVerified, storeUpdated} = useAuthStore();

  // If user is authenticated, redirect based on their status
  if (isAuthenticated && user) {
    // Check if user needs email verification
    if (!otpVerified) {
      return <Navigate to="/auth/" replace />;
    }
    
    if (!storeUpdated) {
      return <Navigate to="/onboarding/store-profile-setup" replace />;
    }

    // User is fully set up, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // User is not authenticated, show public pages
  return <Outlet />;
};