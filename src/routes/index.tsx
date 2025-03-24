import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/GeneralComponents/Loader";
import { useOnboardingStore, useUserStore } from "../store/AppStore";
import Onboarding from "../pages/OnboardingScreen";
import ProtectedRoute from "./ProtectedRoute";
const DashboardScreen = lazy(() => import("../pages/DashboardScreen"));

const AllRoutes = () => {
  const { hasCompletedOnboarding } = useOnboardingStore();
  const { isLoggedIn } = useUserStore();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader className="h-[100px] w-[100px] " />}>
        {/* <Routes>
          <Route path="/" element={<DashboardScreen />} />
        </Routes> */}
        <Routes>
          {/* If user has completed onboarding, redirect them to login */}
          <Route
            path="/"
            element={
              hasCompletedOnboarding ? (
                isLoggedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              ) : (
                <Onboarding />
              )
            }
          />

          {/* Protect routes after login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardScreen />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default AllRoutes;
