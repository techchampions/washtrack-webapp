import { api } from "@/data/api"; // Assuming apiClient is properly configured for API calls
import { create } from "zustand";

export interface InventoryItem {
  item_type: string;
  total_items: string;
}
export interface Customer {
  id: number;
  name: string;
  total_no_of_items: string;
}


export interface InventoryState {
  inventory: InventoryItem[] | null;
  totalItemCount: number | null;
  totalCustomers: number | null;
  customers:Customer[] | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  getInventory: (status: string) => Promise<void>;
  getInventoryView: (data: string, status: string) => Promise<void>;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  inventory: null,
  totalItemCount: null,
  totalCustomers: null,
  isLoading: false,
  error: null,
  customers: null,

  getInventory: async (status) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getInventory(status);
      const { success, total_Item_count, total_customers, inventory } = response;

      if (success) {
        set({
          inventory,
          totalItemCount: total_Item_count,
          totalCustomers: total_customers,
          isLoading: false,
        });
      } else {
        set({
          error: response.message || "Failed to fetch inventory data.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message ?
        error.response.data.message : "Failed to fetch orders";
      console.error("Error fetching inventory:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
  getInventoryView: async (data, status) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getInventoryView(data, status);
      const { success, message, customers } = response;

      if (success) {
        set({
          customers,
          isLoading: false,
        });
      } else {
        set({
          error: message || "Failed to fetch inventory data.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message ?
        error.response.data.message : "Failed to fetch orders";
      console.error("Error fetching inventory view:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
