import { api } from "@/data/api"; // Assuming `api` contains `getProfile` and `editProfile` methods
import {
  Customer,
  Order,
  UserProfile,
} from "@/types/GeneralTypes/profiletypes";
import { create } from "zustand";

export interface ProfileState {
  customers: Customer[] | null;
  customer: Customer | null;
  orders: Order[] | null;
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  message: string | null; // To store success messages
  storeDetails: UserProfile["store"] | null; // Store details from API response

  // Actions
  getUserProfile: () => Promise<void>;
  editUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  getCustomers: () => Promise<void>;
  getCustomerProfile: (id: string) => Promise<void>;
  editCustomerProfile: (data: Partial<Customer>) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  customers: null,
  user: null,
  customer: null,
  orders: null,
  isLoading: false,
  error: null,
  message: null,
  storeDetails: null,

  // Fetch user profile
  getUserProfile: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getProfile();
      console.log(response)
      set({
        user: response.user,
        storeDetails: response.user.store,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      console.error("Failed to fetch profile:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  // Edit user profile
  editUserProfile: async (profileData) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await api.editProfile(profileData);
      
      if (response.message === "Information updated successfully") {
          console.log(response.message, "response message");
        const { message, user, store_details } = response;
        set({
          user,
          storeDetails: store_details,
          message,
          isLoading: false,
        });
        
        return {success: true, ...response};

      } else if(!response.success) {
           throw new Error(response.message);
                
      }

    } catch (error: any) {
        console.log(error, "error editprofile")
      const errorMessage = error.message;
      console.error("Failed to edit profile:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return {success: false, error}
    }
  },
  getCustomers: async () => {
    set({ isLoading: true, error: null });

    try {
      // Call the API
      const response = await api.getCustomers();
      // console.log(response);

      if (response.success) {
        set({
          customers: response.Customers,
          user: response.user,
          isLoading: false,
        });
      } else {
        set({
          error: "Failed to fetch customer profiles.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      console.error("Error fetching customer profile:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
  getCustomerProfile: async (id) => {
    set({ isLoading: true, error: null, message: null });

    try {
      // Make the API request
      const response = await api.getCustomerProfile(id);
      const { success, message, customer, order } = response;
      console.log(response);
      if (success) {
        set({
          customer,
          orders: order,
          message,
          isLoading: false,
        });
      } else {
        set({
          error: "Failed to fetch customer profile.",
          isLoading: false,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      console.error("Error fetching customer profile:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
  editCustomerProfile: async (data) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await api.editCustomerProfile(data);
      const { message, CustomerDetails } = response;
      console.log(response);

      set({
        customer: CustomerDetails,
        message: message || "Customer profile updated successfully",
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      console.error("Error editing customer profile:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
