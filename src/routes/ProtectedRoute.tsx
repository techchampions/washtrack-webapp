import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/AppStore";
// import { useUserStore } from "../store/AppStore";

const ProtectedRoute = () => {
  const { isLoggedIn } = useUserStore();
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
