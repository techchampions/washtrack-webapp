import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

interface InventoryResponse {
  success: boolean;
  total_Item_count: string;
  total_customers: number;
  type: string;
  inventory: InventoryItem[];
}

interface InventoryItem {
  item_type: string;
  total_items: string;
}

// types/customer.ts

// Individual customer type
export interface InventoryCustomer {
  id: number;
  name: string;
  total_no_of_items: string; // Note: This is string in your response, consider converting to number if needed
}

// Main API response type
export interface InventoryCustomersResponse {
  success: boolean;
  message: string;
  customers: InventoryCustomer[];
}
export const useGetInventory = (status: string) => {
  return useQuery<InventoryResponse>({
    queryKey: ["inventory", status],
    queryFn: () => api.getInventory(status),
    enabled: !!status,
  });
};

export const useGetCustomerInventory = (item: string) => {
  return useQuery<InventoryCustomersResponse>({
    queryKey: ["customer-inventory", item],
    queryFn: () => api.getInventoryView(item, "all"),
    enabled: !!item,
  });
};
