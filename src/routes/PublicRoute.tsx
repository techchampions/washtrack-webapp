import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export const PublicRoute: React.FC = () => {
  const { token, user, otpVerified, storeUpdated } = useAuthStore();

  if (token && user && otpVerified && storeUpdated) {
    return <Navigate to="/dashboard" replace />;
  }
  // if (token && !otpVerified) {
  //   return <Navigate to="/auth/verify-email" replace />;
  // }
  if (token && otpVerified && !storeUpdated) {
    return <Navigate to="/onboarding/store-profile-setup" replace />;
  }
  return <Outlet />;
};
