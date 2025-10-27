import { api } from "@/api/api";
import { OutstandingItem } from "@/types/GeneralTypes/outstandingTypes";
import { create } from "zustand";

interface OutstandingState {
  outstandingList: OutstandingItem[] | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchOutstanding: () => Promise<void>;
  fetchOutstandingList: () => Promise<void>;
}

export const useOutstandingStore = create<OutstandingState>((set) => ({
  outstandingList: null,
  isLoading: false,
  error: null,

  fetchOutstanding: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getOutstanding();
      const { success, Outstanding } = response;

      if (success) {
        set({
          outstandingList: Outstanding,
          isLoading: false,
        });
      } else {
        set({
          error: "Failed to fetch outstanding data.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Error fetching outstanding. Check network settings";
      console.error("Error fetching outstanding list:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
  fetchOutstandingList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getOutstandingList();
      const { Outstanding } = response;
      set(() => ({
        outstandingList: Outstanding || [],
        isLoading: false,
      }));
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Error fetching outstanding. Check network settings";
      console.error("Failed to fetch outstanding list:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },
}));
