import { api } from "@/data/api";
import { User } from "@/types/OnboardingTypes/mainTypes";
import { OTP } from "@/types/OnboardingTypes/otpTypes";
import {
  ChangePassword,
  ForgotPassword,
  Login,
  Register,
  RegisterResponse,
} from "@/types/OnboardingTypes/registerTypes";
import axios, { AxiosError } from "axios";
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

    { name: "onboarding-state" } // Key for localStorage
  )
);

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial states
      success: false,
      user: null,
      otpResponse: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      fieldErrors: null,
      regSuccess: false,
      isLoggedIn: false,
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),

      registerUser: async (data) => {
        set({ isLoading: true, error: null, fieldErrors: null });
        try {
          const response = await api.registerUser(data);
          if (response.data.success) {
            console.log(response, "API response in registerUser");
            const { success, user, otp, token } = response.data;
            console.log("API response - Success:", success);
            console.log("API response - User:", user);
            console.log("API response - OTP:", otp);
            console.log("API response - Token:", token);
            set({ isLoading: false });
            set({
              success,
              user,
              otpResponse: otp,
              token,
              isAuthenticated: true,
              isLoading: false,
              fieldErrors: null,
            });
            localStorage.setItem("authToken", token);
            localStorage.setItem("storeUpdated", "false");

            return response.data as RegisterResponse;
          } else {
            const error = response.data.response;
            throw new Error(error);
          }
        } catch (error) {
          console.error("Error during registration:", error);
          console.log(error.response?.data);

          if (axios.isAxiosError(error) && error.response?.data) {
            console.log("axio error ");
            const errorData = error.response.data as ValidationErrorResponse;

            if (errorData.errors) {
              // Set field-specific errors
              set({
                fieldErrors: errorData.errors,
                error: null,
                isLoading: false,
              });
            } else {
              // Set general error
              set({
                error: error.response.data.message,
                fieldErrors: null,
                isLoading: false,
              });
            }
          } else {
            set({
              error: error.response.data.message,
              fieldErrors: null,
              isLoading: false,
            });
          }

          throw error;
        }
      },
      verifyOTP: async (otp) => {
        set({ isLoading: true, error: null });
        try {
          localStorage.setItem("storeUpdated", "false");

          const data = await api.verifyUser(otp);

          if (data?.success) {
            const currentTimestamp = new Date().getTime().toString();

            localStorage.setItem("otpVerified", "true");
            localStorage.setItem("tokenTimestamp", currentTimestamp);
            set({
              otpResponse: data,
              isLoading: false,
              isAuthenticated: true,
              error: null,
            });
          } else {
            set({
              error: data?.message || "OTP verification failed",
              isLoading: false,
              isAuthenticated: false,
            });
            throw new Error(data?.message || "OTP verification failed");
          }
        } catch (err) {
          const error = err as AxiosError<{ message: string }>;
          const errorMessage =
            error.response &&
            error.response.data &&
            error.response?.data?.message
              ? error.response.data.message
              : "Failed to verify OTP";

          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Resend OTP
      resendOTP: async () => {
        set({ isLoading: true, error: null });
        try {
          // Call the resendCode API
          const verificationData = { otp: null }; // Only email needed
          const response = await api.resendCode(verificationData);

          // Assuming the new OTP is returned in the response
          const newOTP = response.otp;
          console.log("New OTP received:", newOTP);

          // Update Zustand state
          set({ otpResponse: newOTP, isLoading: false });
        } catch (error: any) {
          const errorMessage =
            error.response &&
            error.response.data &&
            error.response?.data?.message
              ? error.response.data.message
              : "Failed to resend OTP";
          console.error("Error resending OTP:", errorMessage);
          set({ error: errorMessage, isLoading: false });
        }
      },
      loginUser: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.login(data);
          console.log("Login response:", response);

          if (response.data.success) {
            console.log(response, "----------response login-------------");
            // Set the current timestamp FIRST to prevent expiration issues
            const currentTimestamp = new Date().getTime().toString();

            console.log("Setting authentication data:", {
              token: response.data.token,
              otpVerified: response.data.otpVerified,
              storeUpdated: response.data.storeUpdated,
              timestamp: currentTimestamp,
            });

            //todo:  Set all values in a single batch to prevent race conditions
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("tokenTimestamp", currentTimestamp);
            localStorage.setItem(
              "otpVerified",
              response.data.otpVerified ? "true" : "false"
            );
            localStorage.setItem(
              "storeUpdated",
              response.data.storeUpdated ? "true" : "false"
            );

            set({
              success: true,
              token: response.data.token,
              isAuthenticated: response.data.otpVerified,
              isLoading: false,
              error: null,
              isLoggedIn: true,
            });

            return {
              success: true,
              message: "Login successful",
              token: response.data.token,
              otpVerified: response.data.otpVerified,
              storeUpdated: response.data.storeUpdated, // Changed from storeCompleted
              isLoggedIn: true,
              isLoading: false,
              ...response,
            };
          }
        } catch (error: unknown) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("otpVerified");
          localStorage.removeItem("storeUpdated");
          localStorage.removeItem("tokenTimestamp");

          set({
            error: error,
            isLoading: false,
            isAuthenticated: false,
            token: null,
            success: false,
          });

          throw new error();
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.forgotPassword(email);

          // Handle the response based on success status
          if (response.success) {
            // Success scenario
            console.log("Password reset instructions sent to email");

            // Optionally, display an alert or notification for the user here
            // Example: Alert.alert('Success', 'Password reset instructions sent to your email.');
          } else {
            // Failure scenario
            throw new Error(
              response.message || "Failed to send reset instructions"
            );
          }
        } catch (error: any) {
          // Handle the error and display the error message
          const errorMessage =
            error.response &&
            error.response.data &&
            error.response?.data?.message
              ? error.response.data.message
              : "Failed to verify otp";
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        } finally {
          // Ensure isLoading is set to false regardless of success or failure
          set({ isLoading: false });
        }
      },
      changePassword: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.changePassword(data);
          console.log("API Response:", response);

          // Validate response structure and return it
          if (response && typeof response.success === "boolean") {
            return response; // Explicitly return the response object
          } else {
            throw new Error("Invalid response structure from API.");
          }
        } catch (error: any) {
          const errorMessage =
            error.response &&
            error.response.data &&
            error.response?.data?.message
              ? error.response.data.message
              : "Failed to change password";
          set({ error: errorMessage, isLoading: false });

          throw new Error(errorMessage); // Propagate the error
        } finally {
          set({ isLoading: false });
        }
      },
      logoutUser: async () => {
        set({ isLoading: true, error: null });
        try {
          // Call the logout API endpoint
          const response = await api.logout();

          if (response.success) {
            console.log("Logout successful:", response.message);

            set({
              user: null,
              otpResponse: null,
              token: null,
              isAuthenticated: false,
              error: null,
              isLoading: false,
              isLoggedIn: false,
            });

            localStorage.removeItem("authToken");
          } else {
            throw new Error(response.message);
          }
        } catch (error: any) {
          const errorMessage =
            error.response &&
            error.response.data &&
            error.response?.data?.message
              ? error.response.data.message
              : "Failed to logout user";

          console.error("Error during logout:", errorMessage);

          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage); // Optionally re-throw for UI handling
        } finally {
          set({ isLoading: false });
        }
      },

      contactInfo: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.contactInfo();
          if (response && typeof response.success === "boolean") {
            return response;
          } else {
            throw new Error("Invalid response structure from API.");
          }
        } catch (error: any) {
          const errorMessage =
            error.response &&
            error.response.data &&
            error.response?.data?.message
              ? error.response.data.message
              : "Error getting contact info";

          console.error("Error contact info:", errorMessage);

          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchFaqs: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.fetchFaqs();
          if (response && typeof response.success === "boolean") {
            return response;
          } else {
            throw new Error("Invalid response.");
          }
        } catch (error: any) {
          const errorMessage =
            error.response &&
            error.response.data &&
            error.response?.data?.message
              ? error.response.data.message
              : "Error getting faqs info";

          console.error("Error getting faqs info:", errorMessage);

          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },
      reset: () =>
        set({
          token: "",
          isLoggedIn: false,
          success: false,
          user: null,
          otpResponse: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          fieldErrors: null,
          regSuccess: false,
        }),
    }),
    { name: "auth-state" }
  )
);
