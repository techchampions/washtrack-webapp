import { api } from "@/data/api";
import {
  EItemService,
  EItemType,
  EItemTypesResponse,
  EOrders,
  EOrdersResponse,
  EServiceResponse,
  EstoreData,
  ItemService,
  StoreItemsResponse,
  UpdateService,
} from "@/types/GeneralTypes/estoreTypes";
import { OnlineServices } from "@/types/GeneralTypes/ordertypes";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SuccessResponse {
  success: boolean;
  message: string;
}

interface EstoreState {
  estoreData: EstoreData | null;
  storeItem: EItemType | null;
  itemServices: EItemService[];
  storeItems: EItemTypesResponse | null;
  isLoading: boolean;
  error: string | null;
  currentStatus: string;
  Eorders: EOrders[];
  service: EServiceResponse["service"] | null;

  // Actions
  fetchEstoreData: () => Promise<void>;
  fetchOrders: (status: string) => Promise<EOrdersResponse>;
  createEStore: (status: FormData) => Promise<any>;
  clearOrders: () => void;
  setCurrentStatus: (status: string) => void;
  addService: (data: OnlineServices) => Promise<EServiceResponse>;
  fetchStoreItem: (data: string) => Promise<StoreItemsResponse | void>;
  fetchStoreItems: () => Promise<EItemTypesResponse | void>;
  postStoreItem: (data: ItemService) => Promise<void>;
  updateStoreItem: (data: UpdateService[]) => Promise<void>;
  updateStoreSetUp: () => Promise<void>;
}

export const useEstoreStore = create<EstoreState>()(
  persist(
    (set, get) => ({
  estoreData: null,
  isLoading: false,
  error: null,
  currentStatus: "",
  Eorders: [],
  service: null,
  storeItem: null,
  itemServices: [],
  storeItems: null,

  fetchEstoreData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getEstore();
      const data: EstoreData = response.data;

      set({
        estoreData: data,
        isLoading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch estore data:", error);
      set({
        error:
          error.response && error.response.data && error.response?.data?.message
            ? error.response.data.message
            : "An error occurred while fetching the estore data.",
        isLoading: false,
      });
    }
  },
  fetchOrders: async (status) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getEorders(status);
      console.log(response);

      if (response.success) {
        set({
          Eorders: response.orders,
          currentStatus: status,
          isLoading: false,
          error: null,
        });
        // Explicitly return the expected EOrdersResponse
        return response as EOrdersResponse;
      } else {
        throw new Error("Failed to fetch orders");
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";

      set({
        error: errorMessage,
        isLoading: false,
      });
      throw new Error(errorMessage); // Optionally re-throw the error if the caller needs to handle it
    }
  },
  addService: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.addOnlineServices(data);
      const { success, service, message } = response;

      if (success) {
        set({ service, isLoading: false });
        return response as EServiceResponse; // Ensure the correct return type
      } else {
        set({
          error: message || "Failed to create service.",
          isLoading: false,
        });
        throw new Error(message || "Failed to create service.");
      }
    } catch (error: any) {
      console.error("Error adding service:", error);
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage); // Rethrow the error for the caller
    }
  },

  createEStore: async (data) => {
    set({ isLoading: true, error: null });
    
    try {
      console.log("Creating store with data:", data);
      const response = await api.createEStore(data);
      console.log("API Response:", response);

      if (response && response.message) {
        return response;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      console.error("Error sending store data:", errorMessage);
      set({ error: error, isLoading: false });
    }
  },

  fetchStoreItem: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getStoreItem(data);
      console.log("Store item response:", response); // Add this debug log

      if (response.success) {
        // Add more detailed logging
        console.log("Setting item services:", response.item_service);
        console.log("Setting store item:", response.item_type);

        set({
          storeItem: response.item_type,
          itemServices: response.item_service || [], // Add fallback empty array
          isLoading: false,
        });
        return response as StoreItemsResponse;
      } else {
        throw new Error(response.message || "Failed to fetch store items.");
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      console.error("Error fetching store items:", errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },
  fetchStoreItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getStoreItems();

      if (response.success) {
        set({
          storeItems: {
            ...response,
            itemType: response.itemType.map((item: { services: any }) => ({
              ...item,
              services: Array.isArray(item.services) ? item.services : [],
            })),
          },
          isLoading: false,
        });
        return response;
      } else {
        throw new Error(response.message || "Failed to fetch store items.");
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch item data";
      console.error("Error fetching store items:", errorMessage);
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },
  postStoreItem: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.postStoreItem(data);

      if (response.success) {
        await get().fetchStoreItems();
      }

      set({ isLoading: false });
      return response;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      console.error("Error posting store item:", errorMessage);
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },
  updateStoreItem: async (data) => {
    set({ isLoading: true, error: null });
    try {
      console.log("Updating Data", data);
      const response = await api.updateStoreItem(data);
      console.log("Updated Data", response);

      set({ isLoading: false });
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch send data";
      console.error("Error editing store item:", errorMessage);
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },
  updateStoreSetUp: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.updateStoreSetUp();

      AsyncStorage.setItem("storeUpdated", "true");
      set({ isLoading: false });
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to update store setup";
      console.error("Error updating store setup:", errorMessage);
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  clearOrders: () => {
    set({
      Eorders: [],
      error: null,
    });
  },

  setCurrentStatus: (status: string) => {
    set({ currentStatus: status });
  },
}), {name: "estore-state"}

));
