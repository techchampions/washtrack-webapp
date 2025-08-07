import { User } from "@/types/OnboardingTypes/mainTypes";
import { OTP } from "@/types/OnboardingTypes/otpTypes";
import {
  ChangePassword,
  ForgotPassword,
  Login,
  Register,
  RegisterResponse,
} from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChangePasswordResponse {
  success: boolean;
  message?: string;
}
interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  otpVerified: boolean;
  storeUpdated: boolean;
}

interface AuthState {
  success: boolean;
  user: User | null;
  otpResponse: OTP | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  regSuccess: boolean;
  error: string | null | unknown;
  isLoggedIn: boolean;
  fieldErrors: {
    [key: string]: string[];
  } | null;

  // Actions
  setIsLoggedIn: (status: boolean) => void;
  verifyOTP: (otp: OTP) => Promise<void>;
  resendOTP: () => Promise<void>;
  registerUser: (data: Register) => Promise<RegisterResponse | void>;
  loginUser: (data: Login) => Promise<void>;
  forgotPassword: (email: ForgotPassword) => Promise<void>;
  changePassword: (email: ChangePassword) => Promise<ChangePasswordResponse>;
  logoutUser: () => Promise<void>;
  reset: () => void;
}

export interface ValidationErrorResponse {
  errors?: {
    [key: string]: string[];
  };
  message?: string;
}

type OnboardingState = {
  step:
    | "Get Started"
    | "signup"
    | "login"
    | "verify OTP"
    | "signup completed"
    | "setup store"
    | "add services"
    | "add items"
    | "onboarding complete";
  setStep: (newStep: OnboardingState["step"]) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (newHasCompletedOnboarding: boolean) => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: "Get Started",
      setStep: (newStep) => set({ step: newStep }),
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (newHasCompletedOnboarding) =>
        set({ hasCompletedOnboarding: newHasCompletedOnboarding }),

      // RESET
      reset: () =>
        set({
          step: "Get Started",
          hasCompletedOnboarding: false,
        }),
    }),

    { name: "onboarding-storage" } // Key for localStorage
  )
);
