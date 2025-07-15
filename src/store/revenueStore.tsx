import { api } from "@/data/api";
import { RevenueItem } from "@/types/GeneralTypes/revenueTypes";
import { create } from "zustand";


interface RevenueState {
  revenueList: RevenueItem[] | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchRevenues: () => Promise<void>;
  fetchRevenueList: () => Promise<void>;
}

export const useRevenueStore = create<RevenueState>((set) => ({
  revenueList: null,
  isLoading: false,
  error: null,

  fetchRevenues: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getRevenue();
      const fetchedRevenues = response.Revenue;
      set(() => ({
        revenues: fetchedRevenues,
        isLoading: false,
      }));
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Failed to fetch revenues:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  fetchRevenueList: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getRevenueList();
      const { success, Revenue } = response;

      if (success) {
        set({
          revenueList: Revenue,
          isLoading: false,
        });
      } else {
        set({
          error: "Failed to fetch revenue data.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error fetching revenue list:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
