import { useMutation, useQueryClient} from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { LoginCredentials, AuthResponse } from '@/types/auth.types';

export const useLogin = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    loginMutation,
  };
}
