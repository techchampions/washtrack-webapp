import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { SignupData, AuthResponse } from '@/types/auth.types';
import { showError, showSuccess } from '@/utils/toast';

export const useSignup = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setError } = useAuthStore();

  const mutation = useMutation<AuthResponse, Error, SignupData>({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      // Store user data and token
      setUser(data.user);
      setToken(data.token);
      
      // Clear any previous errors
      setError(null);
      
      // Show success message
      showSuccess('Account created successfully! Welcome to WashTrack!');
      
      // Redirect to email verification if not verified
      if (!data.user.isVerified) {
        navigate('/auth/verify-email', { replace: true });
      } else {
        // Start onboarding flow
        navigate('/onboarding/welcome', { replace: true });
      }
    },
    onError: (error) => {
      // Handle specific error cases
      if (error.message.includes('already exists')) {
        showError('An account with this email already exists. Please sign in instead.');
      } else if (error.message.includes('weak password')) {
        showError('Password is too weak. Please choose a stronger password.');
      } else if (error.message.includes('invalid email')) {
        showError('Please enter a valid email address.');
      } else {
        showError(error.message || 'Failed to create account. Please try again.');
      }
      
      setError(error.message);
    },
  });

  return {
    ...mutation,
    signup: mutation.mutate,
    signupAsync: mutation.mutateAsync,
  };
};