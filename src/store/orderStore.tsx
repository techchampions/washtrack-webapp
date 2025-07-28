import { api } from "@/data/api";
import { AddItemResponse } from "@/types/GeneralTypes/estoreTypes";
import {
  AllItems,
  CreateOrderResponse,
  DeleteServices,
  EditRecordResponse,
  EditServices,
  ExistingOrderResponse,
  ExistingOrders,
  Item,
  Items,
  Order,
  OrderItems,
  OrderResponse,
  Orders,
  RecentOrder,
  Service,
  Services,
  SingleOrderResponse,
  StoreOwner,
  VendorOrdersResponse,
} from "@/types/GeneralTypes/ordertypes";
import { Customer } from "@/types/GeneralTypes/profiletypes";
import { create } from "zustand";
import { ItemRecordResponse, ServiceItem } from '../types/GeneralTypes/ordertypes';
import {persist} from "zustand/middleware"


export interface DeleteItemsPayload {
  id: string;
}

interface OrderStore {
  success: boolean;
  item: Item | null;
  items: Items[];
  itemCount:number | null;
  services: Service[];
  editservices: EditServices[];
  allItems: AllItems[];
  orders: Order[];
  storeOwner: StoreOwner | null;
  ServiceItem: ServiceItem | null;
  isLoading: boolean;
  error: string | null;
  status: string | null;
  singleOrder: Order | null;
  orderItems: OrderItems[];
  customers: Customer | null;
  vendorOrders: VendorOrdersResponse | null;
  recentOrders: RecentOrder | null;
  fieldErrors: {
    [key: string]: string[];
  } | null;

  //   Actions
  addItemType: (data: string) => Promise<AddItemResponse | void>;
  fetchItemTypes: () => Promise<void>;
  fetchServices: (type: number) => Promise<void>;
  updateServices: (data: EditServices) => Promise<void>;
  deleteServices: (id: DeleteServices) => Promise<void>;
  addServices: (data: Services) => Promise<void>;
  addItems: (data: FormData) => Promise<any>;
  getItems: () => Promise<void>;
  updateItems: (data: FormData) => Promise<EditRecordResponse>;
  deleteItems: (payload: DeleteItemsPayload) => Promise<ItemRecordResponse>;
  createOrder: (data: Orders) => Promise<CreateOrderResponse>;
  createExistingOrder: (data: ExistingOrders) => Promise<ExistingOrderResponse>;
  fetchOrders: (status: string) => Promise<OrderResponse>;
  fetchSingleOrder: (id: string) => Promise<SingleOrderResponse>;
  fetchVendorOrders: (filter: string) => Promise<VendorOrdersResponse>;
  clearItems: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist (
  (set) => ({
  success: false,
  singleOrder: null,
  item: null,
  items: [],
  services: [],
  editservices: [],
  allItems: [],
  orders: [],
  ServiceItem: null,
  isLoading: false,
  error: null,
  storeOwner: null,
  status: null,
  orderItems: [],
  customers: null,
  vendorOrders: null,
  recentOrders: null,
  fieldErrors: null,
  itemCount: null,
  

  addItemType: async (data: string) => {
    if (!data.trim()) {
      console.warn("Empty data provided to addItem");
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const response = await api.addItemType(data);
      set({
        success: response.success,
        item: response.items,
        isLoading: false,
      });
      // console.log("Item added successfully:", response.message);
      // console.log("Order added successfully:", response);
      return response as AddItemResponse;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      console.error("Error adding item:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  fetchItemTypes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getItemType();
      if (response.success && Array.isArray(response.Items)) {
        // Ensure Items is an array and has the correct structure
        const validItems = response.Items.filter(
          (item: { name: any }) => item && typeof item.name === "string"
        );
        set({ items: validItems, isLoading: false });
      } else {
        throw new Error(response.message || "Failed to fetch item types");
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      console.error("Error fetching item types:", error);
      set({
        error: errorMessage,
        isLoading: false,
        items: [], // Set empty array on error
      });
    }
  },

  fetchServices: async (type) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getServices(type);
      if (response.success && Array.isArray(response.service)) {
        // Ensure services is an array and has the correct structure
        const validServices = response.service.filter(
          (service: { name: any }) =>
            service && typeof service.name === "string"
        );
        set({ services: validServices, isLoading: false });
      } else {
        throw new Error(response.message || "Failed to fetch services");
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch orders";
      console.error("Error fetching services:", error);
      set({
        error: errorMessage,
        isLoading: false,
        services: [], // Set empty array on error
      });
    }
  },
  addServices: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.addServices(data);
      console.log("response in addServices....   ",response)
      if (response.data.success) {
        set((state) => ({
          services: [...state.services, response.data.service],
          isLoading: false,
        }));
        // console.log("Service added successfully:", response.message);
        console.log("Service added successfully:", response);
      } else {
        if(!response.data.response.success) {
          console.log(response.data.response.message)
        throw new Error(response.data || "Failed to add service");
        }
      }
      // return response;

    } catch (error: any) {
      const errorMessage = error.response.data.message;
      console.error("Error adding service:", error.response.data.message);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return error.response;
    }
  },
  updateServices: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.updateServices(data);
      if (response.success) {
        set((state) => ({
          editservices: state.editservices.map((service) =>
            service.id === data.id
              ? {
                  ...service,
                  name: data.name,
                  price: data.price ?? service.price,
                  estimated_hours:
                    data.estimated_hours ?? service.estimated_hours,
                }
              : service
          ),
          isLoading: false,
        }));
        console.log("Service updated successfully:", response);
      } else {
        throw new Error(response.message || "Failed to update service");
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error updating service:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
  deleteServices: async (id) => {
    set({ isLoading: true, error: null });
    console.log("Deleting service with ID:", id);
    try {
      const response = await api.deleteServices(id);

      console.log("API Response:", response);

      if (response.success) {
        set((state) => ({
          services: state.services.filter((service) => service.id !== id),
          isLoading: false,
        }));
        console.log("Service deleted successfully:", response.message);
      } else {
        throw new Error(response.message || "Failed to delete service");
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error deleting service:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error; // Rethrow to propagate the error to the caller
    }
  },
  addItems: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.addItems(data); // Correct API call
      if (response.success) {
        set((state) => ({
          items: [...state.items, response.items], // Update state
          isLoading: false,
        }));
        // console.log("Item added successfully:", response.message);
        console.log("Item added id successfully:", response.items.id);
        console.log("Item added id successfully:", response);
      } else {
        throw new Error(response.message || "Failed to add item");
      }
      return response; // Ensure the response is returned
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error adding item:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error; // Rethrow to propagate to the caller
    }
  },
  getItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getItems();
      if (response.success) {
        set({ allItems: response.Items, isLoading: false });
      } else {
        throw new Error(response.message || "Failed to fetch items");
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error fetching items:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
  updateItems: async (data) => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      const response = await api.updateItems(data); // Ensure this calls the API with the payload
      if (response.success) {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === data.id ? { ...item, ...response.items } : item
          ),
          isLoading: false,
        }));
        console.log("Item updated successfully:", response);
        console.log("Item updated successfully:", response.message);
        return response as EditRecordResponse;
      } else {
        throw new Error(response.message || "Failed to update item");
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error updating item:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error; // Rethrow to propagate to the caller
    }
  },
  deleteItems: async (payload) => {
    set({ isLoading: true, error: null });
    const id = typeof payload === 'object' ? payload.id : payload;
    try {
      // Convert id to string to match API expectation
      const stringId = String(id);
      console.log("Attempting to delete item with ID:", stringId);
      
      // Send the ID in the format the API expects
      const response = await api.deleteItems({ id: stringId });
      
      
      if (response.success) {
        set((state) => ({
          // Use String() for comparison to handle both string and number IDs
          items: state.items.filter((item) => String(item.id) !== stringId),
          isLoading: false,
        }));
        console.log("Item deleted successfully:", response.message);
        return response as ItemRecordResponse
      } else {
        throw new Error(response.message || "Failed to delete item");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ?? "Failed to delete item";
      console.error("Error deleting item:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },
  clearItems: () => set({ allItems: [] }),

  createOrder: async (data) => {
    set({ isLoading: true, error: null }); // Start loading
    try {
      const response = await api.createOrder(data); // Call the API endpoint
      if (response.message === "Order created successfully") {
        set({ isLoading: false }); // Update the loading state
        console.log("Order created successfully:", response.order);
        return response; // Return the order details for additional handling
      } else {
        throw new Error(response.message || "Failed to create order");
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error creating order:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error; // Rethrow to propagate the error to the caller
    }
  },
  createExistingOrder: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.createExistingOrder(data);

      // Assuming `response` has the shape of `ExistingOrderResponse`
      const result: ExistingOrderResponse = {
        ...response, // Ensure `response` matches the `ExistingOrderResponse` type
      };

      console.log("Existing order created successfully:", result);

      set({ isLoading: false });
      return result; // Explicitly return the result
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error creating existing order:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error; // Rethrow the error to maintain the function's type contract
    }
  },

  fetchOrders: async (status: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getOrders(status);
      if (response.orders) {
        set({
          orders: response.orders,
          storeOwner: response.storeOwner,
          status: response.status,
          isLoading: false,
        });
      } else {
        set({ orders: [], isLoading: false }); // Fallback to an empty array
      }
      return response; // Explicitly return the response
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error fetching orders:", error);
      set({
        error: errorMessage,
        isLoading: false,
        orders: [], // Ensure orders is set to an empty array on error
      });
      throw error;
    }
  },

  fetchSingleOrder: async (id: string): Promise<SingleOrderResponse> => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getSingleOrders(id);
      if (response.success) {
        const result: SingleOrderResponse = {
          success: response.success,
          message: response.message,
          order: response.order,
          order_item: response.order_item,
          customer: response.customer,
          item_count: response.total_item_count,
        };

        set({
          singleOrder: response.order,
          orderItems: response.order_item,
          customers: response.customer,
          itemCount: response.total_item_count,
          isLoading: false,
        });

        console.log("Single order fetched successfully:", result);
        return result; // Explicitly return the SingleOrderResponse
      } else {
        throw new Error(response.message || "Failed to fetch order");
      }
    } catch (error: any) {
      const errorMessage =
      error.response && error.response.data && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch orders";
      console.error("Error fetching single order:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error; // Rethrow to propagate the error
    }
  },

  fetchVendorOrders: async (filter: string = "all") => {
    set({ isLoading: true, error: null });
  
    try {
      const response = await api.getVendorOrders(filter); // Pass filter to API call
  
      const vendorOrdersResponse: VendorOrdersResponse = {
        ...response, // assuming `response` matches the `VendorOrdersResponse` type
      };
  
      set({
        vendorOrders: vendorOrdersResponse,
        recentOrders: response.recent_orders,
        isLoading: false,
      });
  
      console.log("Vendor orders fetched successfully:", vendorOrdersResponse);
      return vendorOrdersResponse;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch orders";
      console.error("Error fetching vendor orders:", error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },
  
}), {name: "order-state"}

));
