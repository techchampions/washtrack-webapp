import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { LoginCredentials, AuthResponse } from '@/types/auth.types';
import { showError, showSuccess } from '@/utils/toast';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setError } = useAuthStore();

  const mutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Store user data and token
      setUser(data.user);
      setToken(data.token);
      
      // Clear any previous errors
      setError(null);
      
      // Show success message
      showSuccess(`Welcome back, ${data.user.firstName}!`);
      
      // Redirect based on user status
      if (!data.user.isVerified) {
        navigate('/auth/verify-email', { replace: true });
      } else {
        // Check if user needs to complete onboarding
        const hasAddress = data.user.addresses && data.user.addresses.length > 0;
        
        if (!hasAddress) {
          navigate('/onboarding/address-setup', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      }
    },
    onError: (error) => {
      // Handle specific error cases
      if (error.message.includes('not verified')) {
        showError('Please verify your email address before signing in.');
        navigate('/auth/verify-email');
      } else if (error.message.includes('invalid credentials')) {
        showError('Invalid email or password. Please try again.');
      } else {
        showError(error.message || 'Login failed. Please try again.');
      }
      
      setError(error.message);
    },
  });

  return {
    ...mutation,
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
  };
};