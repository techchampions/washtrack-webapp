import { useUserStore } from "../store/AppStore";
import { useOnboardingStore } from "../store/AppStore";

export const handleLogout = () => {
  useUserStore.getState().reset(); // Reset user store
  useOnboardingStore.getState().reset(); // Reset onboarding store

  localStorage.removeItem("user-state"); // Clear persisted user state
  localStorage.removeItem("onboarding-state"); // Clear persisted onboarding state

  window.location.reload(); // Optional: Refresh page to clear UI state
};
