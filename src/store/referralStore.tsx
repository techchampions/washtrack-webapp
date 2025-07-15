import { api } from "@/data/api";
import { create } from "zustand";

// Define the structure of the referral data
interface ReferralHistory {
  total_amount: number;
  total_referrals: number;
  total_completed: number;
  total_pending: number;
}

interface ReferralData {
  referral_code: string;
  referral_history: ReferralHistory;
}

interface ReferralStore {
  referralData: ReferralData | null;
  isLoading: boolean;
  error: string | null;
  fetchReferrals: () => Promise<void>;
}

// Zustand store
const useReferralStore = create<ReferralStore>((set) => ({
  referralData: null,
  isLoading: false,
  error: null,

  fetchReferrals: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getReferrals();
      set({
        referralData: response,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Failed to fetch referrals:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));

export default useReferralStore;
