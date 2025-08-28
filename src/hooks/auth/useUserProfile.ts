import {  useQuery } from '@tanstack/react-query';

import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { showError, showSuccess } from '@/utils/toast';



export function useUserProfile() {
  const {token, setUser, setToken, setAuthObject} = useAuthStore();
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
            const res = await  authService.getProfile()
            console.log(res, "_____get user  profile_____")
            
            setAuthObject(res);
            return res; 
        },
    enabled: !!token,
  });
}

