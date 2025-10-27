import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export const PublicRoute: React.FC = () => {
  const { token, user, otpVerified, storeUpdated } = useAuthStore();

  if (token && user && otpVerified && storeUpdated) {
    return <Navigate to="/dashboard" replace />;
  }
  if (!token && location.pathname.includes("/auth/verify-email")) {
    return <Navigate to="/auth/login" replace />;
  }
  if (!token && location.pathname.includes("/auth/auth-flow-complete")) {
    return <Navigate to="/auth/login" replace />;
  }
  if (token && otpVerified && !storeUpdated) {
    return <Navigate to="/onboarding/store-profile-setup" replace />;
  }
  return <Outlet />;
};
