// import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import "./App.css";
// import Onboarding from "./pages/OnboardingScreen";
// import { useOnboardingStore } from "./store/AppStore";
// import ProtectedRoute from "./components/GeneralComponents/ProtectedRoute";
// import DashboardScreen from "./pages/DashboardScreen";
import AllRoutes from "./routes";

function App() {
  // const { hasCompletedOnboarding } = useOnboardingStore();

  return (
    <AllRoutes />
    // <BrowserRouter>
    //   <Routes>
    //     {/* If onboarding is not completed, redirect to onboarding */}
    //     <Route
    //       path="/"
    //       element={
    //         hasCompletedOnboarding ? (
    //           <Navigate to="/dashboard" />
    //         ) : (
    //           <Onboarding />
    //         )
    //       }
    //     />

    //     {/* Protected dashboard route */}
    //     <Route element={<ProtectedRoute />}>
    //       <Route path="/dashboard" element={<DashboardScreen />} />
    //     </Route>

    //     {/* Catch all: Redirect unknown routes */}
    //     <Route path="*" element={<Navigate to="/" />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
