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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

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
  regsuccess: boolean
  error: string | null;
  fieldErrors: {
    [key: string]: string[];
  } | null;

  // Actions
  verifyOTP: (otp: OTP) => Promise<void>;
  resendOTP: () => Promise<void>;
  registerUser: (data: Register) => Promise<RegisterResponse | void >;
  loginUser: (data: Login) => Promise<LoginResponse>;
  forgotPassword: (email: ForgotPassword) => Promise<void>;
  changePassword: (email: ChangePassword) => Promise<ChangePasswordResponse>;
  logoutUser: () => Promise<void>;
}

export interface ValidationErrorResponse {
  errors?: {
    [key: string]: string[];
  };
  message?: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial states
  success: false,
  user: null,
  otpResponse: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  fieldErrors: null,
  regsuccess: false,

  // Register User
  registerUser: async (data) => {
    set({ isLoading: true, error: null, fieldErrors: null });
    try {
      const response = await api.registerUser(data);
      const { success, user, otp, token } = response

      console.log("API response - Success:", success);
      console.log("API response - User:", user);
      console.log("API response - OTP:", otp);
      console.log("API response - Token:", token);

      set({
        success,
        user,
        otpResponse: otp,
        token,
        isAuthenticated: true,
        isLoading: false,
        fieldErrors: null,
      });
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("storeUpdated", "false");

      return response as RegisterResponse
    } catch (error) {
      console.error("Error during registration:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
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
            error: errorData.message || "Failed to register user",
            fieldErrors: null,
            isLoading: false,
          });
        }
      } else {
        set({
          error: "An unexpected error occurred",
          fieldErrors: null,
          isLoading: false,
        });
      }
    }
  },
  // Verify OTP

  verifyOTP: async (otp) => {
    set({ isLoading: true, error: null });
    try {
      await AsyncStorage.setItem("storeUpdated", "false");

      const data = await api.verifyUser(otp);

      if (data?.success) {
        const currentTimestamp = new Date().getTime().toString();

        await AsyncStorage.setItem("otpVerified", "true");
        await AsyncStorage.setItem("tokenTimestamp", currentTimestamp);
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
        error.response && error.response.data && error.response?.data?.message
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
        error.response && error.response.data && error.response?.data?.message
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
      console.log("Login response:", response); // Debug log

      // Only proceed if we have a successful login with valid data
      if (response.success && response.token) {
        // Set the current timestamp FIRST to prevent expiration issues
        const currentTimestamp = new Date().getTime().toString();

        // Debug logs
        console.log("Setting authentication data:", {
          token: response.token,
          otpVerified: response.otpVerified,
          storeUpdated: response.storeUpdated, // Changed from storeCompleted
          timestamp: currentTimestamp,
        });

        // Set all values in a single batch to prevent race conditions
        await AsyncStorage.multiSet([
          ["authToken", response.token],
          ["tokenTimestamp", currentTimestamp],
          ["otpVerified", response.otpVerified ? "true" : "false"],
          ["storeUpdated", response.storeUpdated ? "true" : "false"], // Changed from storeCompleted
        ]);

        // Verify the values were set correctly
        const verifyValues = await AsyncStorage.multiGet([
          "authToken",
          "tokenTimestamp",
          "otpVerified",
          "storeUpdated",
        ]);
        console.log("Verification of stored values:", verifyValues);

        set({
          success: true,
          token: response.token,
          isAuthenticated: response.otpVerified,
          isLoading: false,
          error: null,
        });

        return {
          success: true,
          message: "Login successful",
          token: response.token,
          otpVerified: response.otpVerified,
          storeUpdated: response.storeUpdated, // Changed from storeCompleted
        };
      } else {
        // Login failed - clear any existing credentials
        await AsyncStorage.multiRemove([
          "authToken",
          "otpVerified",
          "storeUpdated",
          "tokenTimestamp",
        ]);

        set({
          success: false,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: response.message || "Login failed",
        });

        return {
          success: false,
          message: response.message || "Login failed",
          token: "",
          otpVerified: false,
          storeUpdated: false,
        };
      }
    } catch (error: any) {
      console.log("login error zuzstand",error);
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to login, please check your internet connection.";

      // Clear any existing credentials on error
      await AsyncStorage.multiRemove([
        "authToken",
        "otpVerified",
        "storeCompleted",
        "tokenTimestamp",
      ]);

      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        success: false,
      });

      throw new Error(errorMessage);
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
        error.response && error.response.data && error.response?.data?.message
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
        error.response && error.response.data && error.response?.data?.message
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

        // Clear Zustand state and AsyncStorage
        set({
          user: null,
          otpResponse: null,
          token: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });

        await AsyncStorage.removeItem("authToken");
      } else {
        throw new Error(response.message || "Logout failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
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
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Error getting contact info";

      console.error("Error contact info:",errorMessage);

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
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Error getting faqs info";

      console.error("Error getting faqs info:",errorMessage);

      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
   
}));
