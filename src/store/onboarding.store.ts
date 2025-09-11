import { OTP } from "@/types/OnboardingTypes/otpTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  id: string;
  name: string;
  description?: string;
  country?: string;
  state?: string;
  address?: string;
  logoUrl?: string;
  createdAt?: string;
  logitude: string | number;
  latitude: string | number;
};

interface OnboardingState {
  step:
    | "SETUP_STORE"
    | "ADD_SERVICES"
    | "ADD_ITEMS"
    | "ONBOARDING_COMPLETE"
    | null;
  store: Store | null;
  setStore: (store: Partial<Store>) => void;
  setStep: (newStep: OnboardingState["step"]) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding?: (newHasCompletedOnboarding: boolean) => void;
  otpResponse?: OTP | null;
  fieldErrors?: {
    [key: string]: string[];
  } | null;
  reset: () => void;
}

export interface ValidationErrorResponse {
  errors?: {
    [key: string]: string[];
  };
  message?: string;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: null,
      setStep: (newStep) => set({ step: newStep }),
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (newHasCompletedOnboarding) =>
        set({ hasCompletedOnboarding: newHasCompletedOnboarding }),
      store: null,
      setStore: (storeUpdates) =>
        set((state) => ({
          store: {
            ...state.store,
            ...storeUpdates,
          },
        })),
      reset: () =>
        set({
          step: "SETUP_STORE",
          hasCompletedOnboarding: false,
        }),
    }),

    { name: "onboarding-storage" }
  )
);
