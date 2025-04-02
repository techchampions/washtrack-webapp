import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  // signupComplete:boolean;
  // setSignupComplete: (newSignupComplete:OnboardingState["signupComplete"]) => void;
};

// Persist step state in localStorage
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: "Get Started", // Default step
      setStep: (newStep) => set({ step: newStep }),
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (newHasCompletedOnboarding) =>
        set({ hasCompletedOnboarding: newHasCompletedOnboarding }),
      // signupComplete:false,
      // setSignupComplete: (newSignupComplete) => set({ signupComplete: newSignupComplete })
    }),
    { name: "onboarding-state" } // Key for localStorage
  )
);

type UserState = {
  storeName: string;
  setStoreName: (newStoreName: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (newIsLoggedIn: boolean) => void;
  firstName: string;
  setFirstName: (newFirstName: string) => void;
  lastName: string;
  setLastName: (newLastName: string) => void;
  phoneNumber: string;
  setPhoneNumber: (newPhoneNumber: string) => void;
  token: string;
  setToken: (newToken: string) => void;
};

// Persist user data in localStorage
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      storeName: "",
      setStoreName: (newStoreName) => set({ storeName: newStoreName }),
      isLoggedIn: false,
      setIsLoggedIn: (newIsLoggedIn) => set({ isLoggedIn: newIsLoggedIn }),
      firstName: "",
      setFirstName: (newFirstName) => set({ firstName: newFirstName }),
      lastName: "",
      setLastName: (newLastName) => set({ lastName: newLastName }),
      phoneNumber: "",
      setPhoneNumber: (newPhoneNumber) => set({ phoneNumber: newPhoneNumber }),
      token: "",
      setToken: (newToken) => set({ token: newToken }),
    }),
    { name: "user-state" }
  )
);
