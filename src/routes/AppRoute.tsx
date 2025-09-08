import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AppLayout } from "@/components/layout/AppLayout/AppLayout";
import Loader from "@/components/GeneralComponents/Loader";
import { useAuth } from "@/hooks/auth/useAuth";
import { HomeScreen } from "@/pages/home";
// import { Loading } from '@/components/common/Loading/Loading';

// Lazy load pages for better performance
const LoginPage = React.lazy(() => import("@/pages/auth/LoginPage"));
const SignupPage = React.lazy(() => import("@/pages/auth/SignupPage"));
const ForgotPasswordPage = React.lazy(
  () => import("@/pages/auth/ForgotPasswordPage")
);
const VerifyEmailPage = React.lazy(
  () => import("@/pages/auth/VerifyEmailPage")
);
const AuthFlowCompletePage = React.lazy(
  () => import("@/pages/auth/AuthFlowCompletePage")
);

// Onboarding pages
const WelcomePage = React.lazy(() => import("@/pages/onboarding/WelcomePage"));
const StoreProfileSetupPage = React.lazy(
  () => import("@/pages/onboarding/StoreProfileSetupPage")
);
const AddServicesSetupPage = React.lazy(
  () => import("@/pages/onboarding/AddServicesSetupPage")
);
const AddItemsSetup = React.lazy(
  () => import("@/pages/onboarding/AddItemsSetupPage")
);

// Main app pages
const DashboardPage = React.lazy(
  () => import("@/pages/dashboard/DashboardPage")
);
// const CreateOrderPage = React.lazy(() => import('@/pages/orders/CreateOrderPage'));
// const OrderHistoryPage = React.lazy(() => import('@/pages/orders/OrderHistoryPage'));
// const OrderDetailsPage = React.lazy(() => import('@/pages/orders/OrderDetailsPage'));
// const ProfilePage = React.lazy(() => import('@/pages/profile/ProfilePage'));
// const SettingsPage = React.lazy(() => import('@/pages/profile/SettingsPage'));

// Error pages
const NotFoundPage = React.lazy(() => import("@/pages/NotFoundPage"));

export const AppRoutes: React.FC = () => {
  const { token, isAuthenticated, otpVerified, storeUpdated, store } =
    useAuth();
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                token && isAuthenticated && otpVerified && storeUpdated
                  ? "/dashboard"
                  : "/auth"
              }
              replace
            />
          }
        />

        {/* Public Routes - Only accessible when not authenticated */}
        <Route path="/auth" element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="auth-flow-complete" element={<AuthFlowCompletePage />} />
          <Route index element={<Navigate to="/auth/login" replace />} />
        </Route>

        {/* Onboarding Routes - For new users */}
        <Route path="/onboarding" element={<PrivateRoute />}>
          <Route path="welcome" element={<WelcomePage />} />
          <Route
            path="store-profile-setup"
            element={<StoreProfileSetupPage />}
          />
          <Route path="add-services-setup" element={<AddServicesSetupPage />} />
          <Route path="add-items-setup" element={<AddItemsSetup />} />
          <Route
            index
            element={<Navigate to="/onboarding/welcome" replace />}
          />
        </Route>

        {/* Private Routes - Main application */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<HomeScreen />} />

            {/* Order Routes */}
            <Route path="orders">
              {/* <Route path="new" element={<CreateOrderPage />} /> */}
              {/* <Route path="history" element={<OrderHistoryPage />} /> */}
              {/* <Route path=":orderId" element={<OrderDetailsPage />} /> */}
              <Route
                index
                element={<Navigate to="/orders/history" replace />}
              />
            </Route>

            {/* Profile Routes */}
            <Route path="profile">
              {/* <Route index element={<ProfilePage />} /> */}
              {/* <Route path="settings" element={<SettingsPage />} /> */}
            </Route>

            {/* Default redirect to dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>

        {/* Legal pages (public) */}
        <Route path="/terms" element={<div>Terms of Service</div>} />
        <Route path="/privacy" element={<div>Privacy Policy</div>} />

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
