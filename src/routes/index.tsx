// import { Suspense, lazy } from "react";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Loader from "../components/GeneralComponents/Loader";
// import { useOnboardingStore, useUserStore } from "../store/AppStore";
// import Onboarding from "../pages/OnboardingScreen";
// import ProtectedRoute from "./ProtectedRoute";
// const DashboardScreen = lazy(() => import("../pages/DashboardScreen"));

// const AllRoutes = () => {
//   const { hasCompletedOnboarding } = useOnboardingStore();
//   const { isLoggedIn } = useUserStore();

//   return (
//     <BrowserRouter>
//       <Suspense fallback={<Loader className="h-[100px] w-[100px] " />}>
//         <Routes>
//           {/* If user has completed onboarding, redirect them to login */}
//           <Route
//             path="/"
//             element={
//               hasCompletedOnboarding ? (
//                 isLoggedIn ? (
//                   <Navigate to="/dashboard" replace />
//                 ) : (
//                   <Navigate to="/" replace />
//                 )
//               ) : (
//                 <Onboarding />
//               )
//             }
//           />

//           {/* Protect routes after login */}
//           <Route path="/dashboard" element={<ProtectedRoute />}>
//             <Route path="*" element={<DashboardScreen />}></Route>
//           </Route>
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// };
// export default AllRoutes;
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/GeneralComponents/Loader";
import { useOnboardingStore, useUserStore } from "../store/AppStore";
import Onboarding from "../pages/OnboardingScreen";
import ProtectedRoute from "./ProtectedRoute";
import HomeScreen from "../pages/HomeScreen";
import InventoryScreen from "../pages/InventoryScreen";
import { AddorderNewUser, AddorderExistingUser } from "../pages/AddorderScreen";
import OrdersScreen from "../pages/OrdersScreen";
import MyStoreScreen from "../pages/MyStoreScreen";
import ReportScreen from "../pages/ReportScreen";
import CustomerScreen from "../pages/CustomerScreen";
import OrderOverview from "../pages/OrderOverview";

const DashboardScreen = lazy(() => import("../pages/DashboardScreen"));

const AllRoutes = () => {
  const { hasCompletedOnboarding } = useOnboardingStore();
  const { isLoggedIn } = useUserStore();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader className="h-[100px] w-[100px]" />}>
        <Routes>
          {/* Onboarding Logic */}
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

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route element={<DashboardScreen />}>
              <Route index element={<HomeScreen />} />
              <Route path="inventory" element={<InventoryScreen />} />
              <Route
                path="add-order/existing-customer"
                element={<AddorderExistingUser />}
              />
              <Route
                path="add-order/new-customer"
                element={<AddorderNewUser />}
              />
              <Route path="customers" element={<CustomerScreen />} />
              <Route path="my-order" element={<OrdersScreen />} />
              <Route path="order/orderID" element={<OrderOverview />} />
              <Route path="my-store" element={<MyStoreScreen />} />
              <Route path="reports" element={<ReportScreen />} />
            </Route>
          </Route>

          {/* Catch-All Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AllRoutes;
