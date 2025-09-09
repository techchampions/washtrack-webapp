// import { AuthUser } from "@/types/auth.types";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface UserPlan {
//   id: number;
//   name: string;
//   slug: string;
// }
// interface Store {
//   id: number;
//   user_id: number;
//   store_name: string;
//   description: string;
//   store_images: string[];
//   store_rate: number;
//   created_at: string;
//   updated_at: string;
//   longitude: number | null;
//   latitude: number | null;
//   geolocation: number | null;
//   store_location: string;
//   is_visible: number;
// }

// interface AuthState {
//   user: AuthUser | null;
//   plan: UserPlan | null;
//   store: Store | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   storeUpdated: boolean;
//   otpVerified: boolean;
//   isLoading?: boolean;
//   error?: string | null;
// }
// interface AuthActions {
//   logout: () => void;
//   setUser: (user: AuthUser) => void;
//   setToken: (token: string) => void;
//   setOtpVerified: (verified: boolean) => void;
//   setStoreUpdated: (updated: boolean) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
//   clearError: () => void;
//   resetAuth: () => void;
//   setAuthObject: (value: any) => void;
// }

// type AuthStore = AuthState & AuthActions;

// const initialState: AuthState = {
//   user: null,
//   plan: null,
//   store: null,
//   token: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
//   otpVerified: false,
//   storeUpdated: false,
// };

// export const useAuthStore = create<AuthStore>()(
//   persist(
//     (set) => ({
//       ...initialState,
//       isLoading: false,
//       logout: () => {
//         set({
//           ...initialState,
//         });

//         localStorage.removeItem("auth-storage");
//       },
//       setOtpVerified: (verified: boolean) => {
//         console.log("Setting OTP verified to:", verified);
//         set({ otpVerified: verified });
//       },

//       setStoreUpdated: (updated: boolean) => {
//         set({ storeUpdated: updated });
//       },

//       setUser: (user: AuthUser) => {
//         console.log("Setting user:", user);
//         set({ user, isAuthenticated: true });
//       },

//       setToken: (token: string) => {
//         console.log("Setting token:", token);
//         set({ token, isAuthenticated: !!token });
//       },

//       setLoading: (isLoading: boolean) => {
//         set({ isLoading });
//       },

//       setError: (error: string | null) => {
//         set({ error });
//       },

//       clearError: () => {
//         set({ error: null });
//       },

//       resetAuth: () => {
//         set({ ...initialState });
//       },
//       setAuthObject: (value: any) => {
//         console.log("_________in store auth object_______", value);

//         set((state) => ({
//           ...state,
//           ...value,
//         }));
//       },
//     }),
//     {
//       name: "auth-storage",
//       // storage: createJSONStorage(() => localStorage),
//       // partialize: (state) => ({
//       //   user: state.user,
//       //   token: state.token,
//       //   isAuthenticated: state.isAuthenticated,
//       //   storeUdpated: state.storeUpdated,
//       //   otpVerified: state.otpVerified,
//       // }),
//     }
//   )
// );

import { Store, User } from "@/hooks/query/useGetUserProfile";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserPlan {
  id: number;
  name: string;
  slug: string;
}

// interface Store {
//   id: number;
//   user_id: number;
//   store_name: string;
//   description: string;
//   store_images: string[];
//   store_rate: number;
//   created_at: string;
//   updated_at: string;
//   longitude: number | null;
//   latitude: number | null;
//   geolocation: number | null;
//   store_location: string;
//   is_visible: number;
// }

interface AuthState {
  user: User | null;
  plan: UserPlan | null;
  store: Store | null;
  token: string | null;
  isAuthenticated: boolean;
  completedOnboarding: boolean;
  storeUpdated: boolean;
  otpVerified: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  logout: () => void;
  setUser: (user: User) => void;
  setPlan: (plan: UserPlan | null) => void;
  setStore: (store: Store | null) => void;
  setToken: (token: string) => void;
  setOtpVerified: (verified: boolean) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
  setCompletedOnboarding: (completed: boolean) => void;
  setStoreUpdated: (updated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetAuth: () => void;
  setAuthObject: (value: Partial<AuthState>) => void;
  updateStore: (updates: Partial<Store>) => void;
  updateUser: (updates: Partial<User>) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  plan: null,
  store: null,
  token: null,
  isAuthenticated: false,
  completedOnboarding: false,
  isLoading: false,
  error: null,
  otpVerified: false,
  storeUpdated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      logout: () => {
        set({
          user: null,
          plan: null,
          store: null,
          token: null,
          isAuthenticated: false,
          otpVerified: false,
          storeUpdated: false,
        });
      },

      setOtpVerified: (verified: boolean) => {
        set({ otpVerified: verified });
      },
      setIsAuthenticated: (authenticated: boolean) => {
        set({ isAuthenticated: authenticated });
      },
      setCompletedOnboarding: (completed: boolean) => {
        set({ completedOnboarding: completed });
      },

      setStoreUpdated: (updated: boolean) => {
        set({ storeUpdated: updated });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      setPlan: (plan: UserPlan | null) => {
        set({ plan });
      },

      setStore: (store: Store | null) => {
        set({ store });
      },

      setToken: (token: string) => {
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
        set(initialState);
      },

      setAuthObject: (value: Partial<AuthState>) => {
        set((state) => ({
          ...state,
          ...value,
        }));
      },

      updateStore: (updates: Partial<Store>) => {
        set((state) => ({
          store: state.store ? { ...state.store, ...updates } : null,
        }));
      },

      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        plan: state.plan,
        store: state.store,
        isAuthenticated: state.isAuthenticated,
        completedOnboarding: state.completedOnboarding,
        storeUpdated: state.storeUpdated,
        otpVerified: state.otpVerified,
      }),
    }
  )
);
