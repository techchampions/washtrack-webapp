import { useAuthStore } from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    logout,
    setUser,
    setToken,
    setError,
    clearError,
    otpVerified,
  } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login', { replace: true });
  };

   const checkAuthStatus = () => {
    if (token && (user && user?.email_verified_at)) {
      return true;
    }
    return false;
  };

  const requireAuth = () => {
    if (!token || !checkAuthStatus()) {
      navigate('/auth/login', { replace: true });
      return false;
    }
    return true;
  };

  const requireGuest = () => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
      return false;
    }
    return true;
  };

  // useEffect(() => {
  //   if (token) {
  //     const checkInterval = setInterval(() => {
  //       checkAuthStatus();
  //     }, 60000);

  //     return () => clearInterval(checkInterval);
  //   }
  // }, [token, isAuthenticated]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    otpVerified,
    logout: handleLogout,
    setUser,
    setToken,
    setError,
    clearError,
    checkAuthStatus,
    requireAuth,
    requireGuest,
  };
};