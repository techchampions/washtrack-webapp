import { AuthUser } from "@/types/auth.types";
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  storeUpdated: boolean;
  otpVerified: boolean;
  isLoading?: boolean;
  error?: string | null;
}
interface AuthActions {
  logout: () => void;
  setUser: (user: AuthUser) => void;
  setToken: (token: string) => void;
  setOtpVerified: (verified: boolean) => void;
  setStoreUpdated: (updated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetAuth: () => void;
  setAuthObject: (value: any) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  otpVerified: false,
  storeUpdated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      isLoading: false,
      logout: () => {
        set({
          ...initialState,
        });
        
        localStorage.removeItem('auth-storage');
      },
      setOtpVerified: (verified: boolean) => {
        console.log("Setting OTP verified to:", verified);
        set({ otpVerified: verified }); 
      },

      setStoreUpdated: (updated: boolean) => {
        set({ storeUpdated: updated });
      },

      setUser: (user: AuthUser) => {
        console.log("Setting user:", user);
        set({ user, isAuthenticated: true });
      }, 

      setToken: (token: string) => {
        console.log("Setting token:", token);
        set({ token, isAuthenticated: !!token });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      resetAuth: () => {
        set({ ...initialState });
      },
      setAuthObject: (value: any) => {
        console.log("_________in store auth object_______", value);
        
        set((state) => ({
          ...state,
          ...value,
        }));
      }
      }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
