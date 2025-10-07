import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AppLayout } from "@/components/layout/AppLayout/AppLayout";
import Loader from "@/components/GeneralComponents/Loader";
import { useAuth } from "@/hooks/auth/useAuth";
import { HomeScreen } from "@/pages/home";
import ReportScreen from "@/pages/stats/ReportScreen";
import { AddOrderNewUser } from "@/pages/orders/AddOrderNewUser";
import { AddOrderExistingUser } from "@/pages/orders/AddOrderExistingUser";
import OrderOverview from "@/pages/orders/OrderOverview";
import OrdersScreen from "@/pages/orders/OrdersScreen";
import InventoryScreen from "@/pages/inventory/InventoryScreen";
import CustomerScreen from "@/pages/customers/CustomerScreen";
import OutstandingHistory from "@/pages/orders/OutstandingHistory";
import InventoryCustomers from "@/pages/inventory/InventoryCustomers";
import CustomerOrderByType from "@/pages/customers/CustomerOrderByType";
import ExpenseIndex from "@/pages/expense/ExpenseIndex";
import AllExpenseList from "@/pages/expense/AllExpenseList";
import RevenueIndex from "@/pages/revenue/RevenueIndex";
import AllRevenueList from "@/pages/revenue/RevenueList";
import OutstandingIndex from "@/pages/outstanding/OustandingIndex";
import AllOutstandingList from "@/pages/outstanding/OutstandingList";
import SettingsPage from "@/pages/settings/SettingsPage";
import SettingStoreSetup from "@/pages/settings/StoreSetup";
import ServicesSetup from "@/pages/settings/ServicesSetup";
import ItemsSetup from "@/pages/settings/ItemsSetup";
import SubscriptionPage from "@/pages/settings/SubscriptionPage";
import SubscriptionPlanPage from "@/pages/settings/SubscriptionPlanPage";
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
// Error pages
const NotFoundPage = React.lazy(() => import("@/pages/NotFoundPage"));

export const AppRoutes: React.FC = () => {
  const { token, isAuthenticated, otpVerified, storeUpdated } = useAuth();
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
            index
            path="store-profile-setup"
            element={<StoreProfileSetupPage />}
          />
          <Route path="add-services-setup" element={<AddServicesSetupPage />} />
          <Route path="add-items-setup" element={<AddItemsSetup />} />
        </Route>

        {/* Private Routes - Main application */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<HomeScreen />} />
            <Route path="/dashboard/reports" element={<ReportScreen />} />
            <Route path="/dashboard/orders" element={<OrdersScreen />} />
            <Route
              path="/dashboard/orders/create/new-customer"
              element={<AddOrderNewUser />}
            />
            <Route
              path="/dashboard/orders/create/existing-customer/:user_id"
              element={<AddOrderExistingUser />}
            />
            <Route
              path="/dashboard/orders/outstanding/:order_id"
              element={<OutstandingHistory />}
            />
            <Route
              path="/dashboard/orders/:order_id"
              element={<OrderOverview />}
            />
            <Route path="/dashboard/inventory" element={<InventoryScreen />} />
            <Route
              path="/dashboard/inventory/:item_type/customers"
              element={<InventoryCustomers />}
            />
            <Route path="/dashboard/customers" element={<CustomerScreen />} />
            <Route
              path="/dashboard/customers/:customer_name/:customer_id/:item_type/orders"
              element={<CustomerOrderByType />}
            />
            <Route path="/dashboard/expenses" element={<ExpenseIndex />} />
            <Route
              path="/dashboard/expenses/list"
              element={<AllExpenseList />}
            />
            <Route path="/dashboard/revenues" element={<RevenueIndex />} />
            <Route
              path="/dashboard/revenues/list"
              element={<AllRevenueList />}
            />
            <Route
              path="/dashboard/outstandings"
              element={<OutstandingIndex />}
            />
            <Route
              path="/dashboard/outstandings/list"
              element={<AllOutstandingList />}
            />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route
              path="/dashboard/settings/store-setup"
              element={<SettingStoreSetup />}
            />
            <Route
              path="/dashboard/settings/services"
              element={<ServicesSetup />}
            />
            <Route
              path="/dashboard/settings/items-setup"
              element={<ItemsSetup />}
            />
            <Route
              path="/dashboard/settings/subscription"
              element={<SubscriptionPage />}
            />
            <Route
              path="/dashboard/settings/subscription/all"
              element={<SubscriptionPlanPage />}
            />

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
