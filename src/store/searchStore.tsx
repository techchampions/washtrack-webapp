import { api } from "@/data/api";
import { SearchOrderResponse } from "@/types/GeneralTypes/searchTypes";
import { create } from "zustand";

interface SearchState {
  searchResults: SearchOrderResponse | null;
  isLoading: boolean;
  error: string | null;
  searchOrders: (data: string, query: number | null) => Promise<void>;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchResults: null,
  isLoading: false,
  error: null,

  searchOrders: async (data, query) => {
    console.log("Query in store", data);
    set({ isLoading: true, error: null });
    try {
      const response = await api.searchParams(data, query);
      console.log(response);
      set({ searchResults: response, isLoading: false });
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      console.error("Error fetching orders:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
