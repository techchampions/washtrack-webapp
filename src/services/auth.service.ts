import apiClient from "@/api/apiClient";
import { useAuthStore } from "@/store/auth.store";
import { useOnboardingStore } from "@/store/onboarding.store";
import {
  LoginCredentials,
  SignupData,
  ForgotPasswordData,
  ChangePasswordData,
  AuthResponse,
  AuthUser,
  OTP,
} from "@/types/auth.types";
import { showSuccess } from "@/utils/toast";
import { AxiosResponse } from "axios";

class AuthService {
  async login(credentials: LoginCredentials): Promise<AxiosResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/api/login",
      credentials
    );
    return response;
  }

  async signup(signupData: SignupData): Promise<AxiosResponse> {
    const response = await apiClient.post("/api/register", signupData);
    return response;
  }

  async logout(): Promise<unknown> {
    const response = await apiClient.post("/api/logout");

    localStorage.removeItem("auth-token");
    return response;
  }
  logout2() {
    useAuthStore.getState().logout(); // Reset user store
    // useOnboardingStore.getState().reset(); // Reset onboarding store

    localStorage.removeItem("auth-storage"); // Clear persisted user state
    // localStorage.removeItem("onboarding-state"); // Clear persisted onboarding state

    // window.location.reload(); // Optional: Refresh page to clear UI state
    showSuccess("Logged out successfully!"); // Show logout success message
  }
  async verifyUser(data: OTP) {
    const response = await apiClient.post("/api/verify-otp", data);
    return response;
  }

  async forgotPassword(email: ForgotPasswordData) {
    const response = await apiClient.post<{ message: string }>(
      "/api/forgot-password",
      email
    );
    return response;
  }

  async changePassword(passwordData: ChangePasswordData) {
    const response = await apiClient.post<{ message: string }>(
      "/api/update/change-password",
      passwordData
    );
    return response;
  }

  resendCode = async (data: OTP) => {
    const response = await apiClient.post("/api/resend-otp", data);
    return response;
  };

  async getCurrentUser(): Promise<AuthUser> {
    const response = await apiClient.get<{ user: AuthUser }>(
      "/api/user-profile"
    );
    return response;
  }

  async getProfile() {
    const response = await apiClient.get("/api/user-profile");
    return response.data;
  }
}

export const authService = new AuthService();
