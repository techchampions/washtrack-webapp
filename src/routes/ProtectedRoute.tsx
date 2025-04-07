import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/AppStore";

const ProtectedRoute = () => {
  const { isLoggedIn } = useUserStore();

  // Redirect UNAUTHENTICATED users to login
  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
