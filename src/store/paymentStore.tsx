import { api } from "@/data/api";
import { Withdrawal } from "@/types/GeneralTypes/estoreTypes";
import { create } from "zustand";

// Define the Withdrawal type based on API response


interface PaymentState {
  withdrawals: Withdrawal[];
  withdrawalDetail: Withdrawal | null;
  availableAmount: number;
  recentRequests: Withdrawal[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchWithdrawals: (status: string) => Promise<void>;
  fetchWithdrawalDetails: (id: string) => Promise<void>;
  fetchPayoutsHome: () => Promise<void>;
}

export const usepaymentStore = create<PaymentState>((set) => ({
  withdrawals: [],
  withdrawalDetail: null,
  isLoading: false,
  error: null,
  availableAmount: 0,
  recentRequests: [],

  fetchWithdrawals: async (status) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getWithdrawals(status);
      const { success, recent_Withdrawal } = response;

      if (success) {
        set({ withdrawals: recent_Withdrawal, isLoading: false });
      } else {
        set({
          error: "Failed to fetch withdrawals.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error fetching withdrawals:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
  fetchWithdrawalDetails: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getWithdrawalDetails(id);
      const { success, Withdrawal_details } = response;

      if (success) {
        set({ withdrawalDetail: Withdrawal_details, isLoading: false });
      } else {
        set({
          error: "Failed to fetch withdrawal details.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error fetching withdrawal: details", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  fetchPayoutsHome: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getPayoutsHome();
      const { success, available_amount, recent_request } = response;

      if (success) {
        set({
          availableAmount: available_amount,
          recentRequests: recent_request,
          isLoading: false,
        });
      } else {
        set({
          error: "Failed to fetch payout information.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error fetching payouts:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
