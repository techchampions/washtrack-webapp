import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
// types/customerOrders.ts

// Customer type
export interface Customer {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  store_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  0: null; // This seems to be an API artifact, you might want to omit it
}

// Order item type
export interface OrderItemObj {
  id: number;
  store_id: number;
  user_id: number;
  order_id: number;
  service_name: string;
  no_of_items: number;
  photos: string; // JSON string of array - consider parsing
  order_number: number;
  item_type: string;
  type: string;
  online_status: number;
  status: number;
  processing_date: string | null;
  ready_pickup_date: string | null;
  order_pickup_date: string | null;
  delivery_date: string | null;
  completed_date: string | null;
  created_at: string;
  updated_at: string;
  0: null; // API artifact
  order_price: number;
  orders: {
    id: number;
    total_amount: number;
  };
}

// Main API response type
export interface CustomerOrdersResponse {
  success: boolean;
  message: string;
  customer: Customer;
  order_items: OrderItemObj[];
}
export const useGetCustomerOrderByType = (
  customer_id: string,
  item_type: string
) => {
  return useQuery<CustomerOrdersResponse>({
    queryKey: ["orders", customer_id, item_type],
    queryFn: () => api.getCustomerOrderView(customer_id, item_type),
    enabled: !!item_type && !!customer_id,
  });
};
