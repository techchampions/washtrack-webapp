import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { LoginCredentials, AuthResponse } from '@/types/auth.types';
import { showError, showSuccess } from '@/utils/toast';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setError, setLoading, setAuthObject } = useAuthStore();

  const mutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: authService.login,
    onMutate: () => {
      setError(null);
      setLoading(true);
    },
    onSuccess: (response) => {

      if(response.status === 200 || response.status === 201) {
         console.log("✅ Login success:", response.data);
       showSuccess(response.data.message);
       setToken(response.data.token);
       setAuthObject(response.data);
      }
      
  
    

     /* if (!data.user.isVerified) {
        navigate('/auth/verify-email', { replace: true });
      } else {
      
        const hasAddress = data.user.addresses && data.user.addresses.length > 0;
        
        if (!hasAddress) {
          navigate('/onboarding/address-setup', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } */

    },
    onError: (error) => {
      // Handle specific error cases
      console.error("❌ Login error:", error.response.data.message);
      if (error.response.data.message.includes('not verified')) {
        showError('Please verify your email address before signing in.');
        navigate('/auth/verify-email');
      } else if (error.response.data.message.includes('invalid credentials')) {
        showError('Invalid email or password. Please try again.');
      } else {
        showError(error.response.data.message || 'Login failed. Please try again.');
      }
      
      setError(error.message);
    },
    onSettled: () => {
       console.log("🔁 Login request settled (success or error)");
       setLoading(false);
    }
  });

  return {
    ...mutation,
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
  };
};