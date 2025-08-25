import {  useQuery } from '@tanstack/react-query';

import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { showError, showSuccess } from '@/utils/toast';



export function useUserProfile() {
  const {token, setUser, setToken} = useAuthStore();
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => authService.getProfile(),
    enabled: !!token,
  });
}

