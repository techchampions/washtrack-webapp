import { api } from "@/api/api";
import { CreateExpensePayload, CreateExpenseResponse } from "@/types/GeneralTypes/ExpenseTypes";
import { create } from "zustand";

interface ExpenseStore {
  expenses: CreateExpenseResponse["Expense"][]; // Store the expense list
  isLoading: boolean;
  error: string | null;
  addExpense: (data: CreateExpensePayload) => Promise<void>;
  fetchExpenses: (filter?: string) => Promise<void>; // Ensure filter is optional
}

// Zustand store
const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  isLoading: false,
  error: null,

  addExpense: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.createExpense(data); // API call
      const newExpense = response.Expense; // Extract expense from response

      set((state) => ({
        expenses: [...state.expenses, newExpense], // Append new expense
        isLoading: false,
      }));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create expense";
      console.error("Failed to create expense:", error);
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  fetchExpenses: async (filter = "all") => {
    set({ isLoading: true, error: null });
  
    try {
      const response = await api.getExpense(filter);
      console.log(`Fetched expenses for filter: ${filter}`, response);
  
      const fetchedExpenses = Array.isArray(response) ? response : [];
      
      set(() => ({
        expenses: fetchedExpenses,
        isLoading: false,
      }));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch expenses";
      
      console.error("Failed to fetch expenses:", error);
  
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

}));

export default useExpenseStore;
