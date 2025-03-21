import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
  step: "Get Started" | "signup" | "login" | "verify OTP" | "signup completed" | "setup store";
  setStep: (newStep: OnboardingState["step"]) => void;
  // signupComplete:boolean;
  // setSignupComplete: (newSignupComplete:OnboardingState["signupComplete"]) => void;
};

// Persist step state in localStorage
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: "Get Started", // Default step
      setStep: (newStep) => set({ step: newStep }),
      // signupComplete:false,
      // setSignupComplete: (newSignupComplete) => set({ signupComplete: newSignupComplete })
    }),
    { name: "onboarding-state" } // Key for localStorage
  )
);

type UserState = {
  username: string;
  setUsername: (newUsername: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (newIsLoggedIn: boolean) => void;
  firstName: string;
  setFirstName: (newFirstName: string) => void;
  lastName: string;
  setLastName: (newLastName: string) => void;
};

// Persist user data in localStorage
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (newUsername) => set({ username: newUsername }),
      isLoggedIn: false,
      setIsLoggedIn: (newIsLoggedIn) => set({ isLoggedIn: newIsLoggedIn }),
      firstName: "",
      setFirstName: (newFirstName) => set({ firstName: newFirstName }),
      lastName: "",
      setLastName: (newLastName) => set({ lastName: newLastName }),
    }),
    { name: "user-state" }
  )
);
