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
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        
        if (isExpired) {
          handleLogout();
          return false;
        }
        return true;
      } catch {
        handleLogout();
        return false;
      }
    }
    return false;
  };

  const requireAuth = () => {
    if (!isAuthenticated || !checkAuthStatus()) {
      navigate('/auth/login', { replace: true });
      return false;
    }
    return true;
  };

  const requireGuest = () => {
    if (isAuthenticated && checkAuthStatus()) {
      navigate('/dashboard', { replace: true });
      return false;
    }
    return true;
  };

  useEffect(() => {
    console.log(token, isAuthenticated)
    if (token && isAuthenticated) {
      const checkInterval = setInterval(() => {
        checkAuthStatus();
      }, 60000);

      return () => clearInterval(checkInterval);
    }
  }, [token, isAuthenticated]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
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