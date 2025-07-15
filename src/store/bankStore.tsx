import { api } from "@/data/api";
import {
  AccountName,
  AccountNameResponse,
  BankDetails,
  GetBankDetails,
} from "@/types/GeneralTypes/estoreTypes";
import { create } from "zustand";

// Define Bank type based on API response
interface Bank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string | null;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BankState {
  banks: Bank[];
  bankDetails: GetBankDetails[];
  accountName: AccountNameResponse["data"] | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchBanks: () => Promise<void>;
  resolveAccountName: (
    data: AccountName
  ) => Promise<AccountNameResponse | void>;
  addBankDetails: (data: BankDetails) => Promise<void>;
  fetchBankDetails: () => Promise<void>;
}

export const useBankStore = create<BankState>((set) => ({
  banks: [],
  accountName: null,
  isLoading: false,
  error: null,
  bankDetails: [],

  fetchBanks: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getBanks();
      const { status, data, message } = response;

      if (status) {
        set({ banks: data, isLoading: false });
      } else {
        set({
          error: message || "Failed to retrieve banks.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error("Error fetching banks:", error);
      set({
        error:
          error.response?.message ||
          "An error occurred while fetching the banks.",
        isLoading: false,
      });
    }
  },
  resolveAccountName: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getAccountName(data);

      const { status, message, data: accountData } = response;

      if (status) {
        set({ accountName: accountData, isLoading: false });
        return { status, message, data: accountData } as AccountNameResponse;
      } else {
        set({
          error: message || "Failed to resolve account name.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error("Error resolving account name:", error);
      set({
        error:
          error.response?.data?.message ||
          "An error occurred while resolving the account name.",
        isLoading: false,
      });
    }
  },
  addBankDetails: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.addBankDetails(data);
      const { status, message } = response;

      if (status) {
        console.log("Bank details added successfully.");
      } else {
        set({
          error: message || "Failed to add bank details.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error("Error adding bank details:", error);
      set({
        error:
          error.response?.message ||
          "An error occurred while adding the bank details.",
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchBankDetails: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getBankDetails();
      const { success, bank_details } = response;

      if (success) {
        set({ bankDetails: bank_details, isLoading: false });
      } else {
        set({
          error: "Failed to retrieve banks.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error("Error fetching banks:", error);
      set({
        error: error.response?.message || "An error occurred.",
        isLoading: false,
      });
    }
  },
}));
