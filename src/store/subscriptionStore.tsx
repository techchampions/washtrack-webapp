import { api } from "@/api/api";
import { create } from "zustand";

// Define the subscription type based on the API response
export interface Subscription {
  id: number;
  name: string;
  price: number;
  features: string;
  duration: string;
  start_date?: string | null;
  end_date?: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// Define the store state and actions
interface SubscriptionState {
  storeId: number | null;
  email: string | null
  currentPlan: Subscription | null;
  plans: Subscription[];
  isLoading: boolean;
  error: string | null;


  fetchSubscriptions: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  storeId: null,
  currentPlan: null,
  email: null,
  plans: [],
  isLoading: false,
  error: null,

  fetchSubscriptions: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getSubscriptions();
      const { success, current, plans, store_id, email } = response;

      if (success) {
        set({
          storeId: store_id,
          currentPlan: current,
          plans,
          isLoading: false,
          email,
        });
      } else {
        set({ error: "Failed to fetch subscriptions.", isLoading: false });
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch subscriptions";
      console.error("Error fetching subscriptions:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
