import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { showError, showSuccess } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

export const useVerifyEmail = () => {
    const navigate = useNavigate();
    const { setUser, setToken, setError, setLoading, setOtpVerified } = useAuthStore();

    const mutation = useMutation({
        mutationFn: authService.verifyUser,
        onMutate: () => {
            setError(null);
            setLoading(true);
        },
        onSuccess: (response) => {
            console.log("✅ Verify Email success:", response.data);
            if (response.status === 200 || response.status === 201) {
                console.log(response.data.message, "in verfiy email")
                showSuccess(response.data.message)
                setOtpVerified(response.data.verify);
                setError(null);
                console.log(response.data, "---------response data--------")
                navigate('/auth/auth-flow-complete');
            }
        },
        onError: (error) => {
            console.error("❌ Verify Email error:", error.response);
            showError(error.response.data.message);

            setError(error.message);
        },
        onSettled: () => {
            console.log("🔁 Verify Email request settled (success or error)");
            setLoading(false);
        }
    });

    return {
        ...mutation,
        verifyEmail: mutation.mutate,
        verifyEmailAsync: mutation.mutateAsync,
    };
};