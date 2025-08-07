import apiClient from '@/api/apiClient';
import {
    LoginCredentials,
    SignupData,
    ForgotPasswordData,
    ResetPasswordData,
    ChangePasswordData,
    AuthResponse,
    AuthUser,
    OTP,
} from "@/types/auth.types";

class AuthService {

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/api/login', credentials);
        return response;
    }

    async signup(signupData: SignupData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/api/register', signupData);
        return response
    }

    async logout(): Promise<unknown> {
        const response = await apiClient.post('/api/logout');

        localStorage.removeItem('auth-token');
        return response;
    }

    async verifyUser(data: OTP) {
        const response = await apiClient.post("/api/verify-otp", data);
        return response;
    }

    async forgotPassword(email: ForgotPasswordData) {
        const response = await apiClient.post<{ message: string }>('/api/forgot-password', email);
        return response;
    }

    async changePassword(passwordData: ChangePasswordData) {
        const response = await apiClient.post<{ message: string }>('/api/update/change-password', passwordData);
        return response;
    }

    resendCode = async (data: OTP) => {
        const response = await apiClient.post("/api/resend-otp", data);
        return response;
    };

    async getCurrentUser(): Promise<AuthUser> {
        const response = await apiClient.get<{ user: AuthUser }>('/api/user-profile');
        return response
    }

}

export const authService = new AuthService();