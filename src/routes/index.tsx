// import { Suspense, lazy } from "react";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Loader from "../components/GeneralComponents/Loader";
// import { useOnboardingStore, useAuthStore } from "@/store/onboardingStore";
// import Onboarding from "../pages/auth/OnboardingScreen";
// import ProtectedRoute from "./ProtectedRoute";
// import { HomeScreen } from "../pages/home";
// import InventoryScreen from "@/pages/inventory/InventoryScreen";
// import { AddOrderNewUser, AddOrderExistingUser } from "../pages/orders";
// import OrdersScreen from "@/pages/orders/OrdersScreen";
// import MyStoreScreen from "../pages/my-store/MyStoreScreen";
// import ReportScreen from "@/pages/stats/ReportScreen";
// import CustomerScreen from "@/pages/customers/CustomerScreen";
// import OrderOverview from "@/pages/orders/OrderOverview";

// const DashboardScreen = lazy(() => import("../pages/home/DashboardScreen"));

// const AllRoutes = () => {
//   const { hasCompletedOnboarding } = useOnboardingStore();
//   const { isLoggedIn } = useAuthStore();

//   return (
//     <BrowserRouter>
//       <Suspense fallback={<Loader className="h-[100px] w-[100px]" />}>
//         <Routes>
//           {/* Onboarding Logic */}
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

//           {/* Protected Routes */}
//           <Route path="/dashboard" element={<ProtectedRoute />}>
//             <Route element={<DashboardScreen />}>
//               <Route index element={<HomeScreen />} />
//               <Route path="inventory" element={<InventoryScreen />} />
//               <Route
//                 path="add-order/existing-customer"
//                 element={<AddOrderExistingUser />}
//               />
//               <Route
//                 path="add-order/new-customer"
//                 element={<AddOrderNewUser />}
//               />
//               <Route path="customers" element={<CustomerScreen />} />
//               <Route path="orders" element={<OrdersScreen />} />
//               <Route path="order/orderID" element={<OrderOverview />} />
//               <Route path="my-store" element={<MyStoreScreen />} />
//               <Route path="reports" element={<ReportScreen />} />
//             </Route>
//           </Route>

//           {/* Catch-All Redirect */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// };

// export default AllRoutes;
