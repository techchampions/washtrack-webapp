import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
interface OrderDetailResponse {
  success: boolean;
  message: string;
  order: Order;
  order_item: OrderItem[];
  total_item_count: string;
  customer: Customer;
}

interface Order {
  id: number;
  store_id: number;
  user_id: number;
  customer_id: number;
  ref: string;
  order_type: number;
  order_number: number;
  total_amount: number;
  paid_amount: number;
  delivery_fee: number;
  service_fee: number;
  order_code: number;
  pickup_date: string | null;
  delivery_time: string | null;
  service_name: string | null;
  item_type: string | null;
  payment_type: string;
  delivery_address: string | null;
  balance: number;
  online_status: number;
  status: number;
  processing_date: string | null;
  ready_pickup_date: string | null;
  order_pickup_date: string | null;
  delivery_date: string | null;
  completed_date: string | null;
  created_at: string;
  updated_at: string;
  "0": null;
}

interface OrderItem {
  id: number;
  store_id: number;
  user_id: number;
  order_id: number;
  service_name: string;
  no_of_items: number;
  photos: string; // This appears to be a JSON string representation of an array
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
  "0": null;
}

interface Customer {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  store_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  "0": null;
}

interface OrdersResponse {
  message: string;
  status: string;
  orders: OrderWithCustomer[];
  "Store Owner": StoreOwner;
}

export interface OrderWithCustomer {
  id: number;
  store_id: number;
  user_id: number;
  customer_id: number;
  ref: string;
  order_type: number;
  order_number: number;
  total_amount: number;
  paid_amount: number;
  delivery_fee: number;
  service_fee: number;
  order_code: number;
  pickup_date: string | null;
  delivery_time: string | null;
  service_name: string | null;
  item_type: string | null;
  payment_type: string;
  delivery_address: string | null;
  balance: number;
  online_status: number;
  status: number;
  processing_date: string | null;
  ready_pickup_date: string | null;
  order_pickup_date: string | null;
  delivery_date: string | null;
  completed_date: string | null;
  created_at: string;
  updated_at: string;
  "0": null;
  customer: CustomerSummary;
}

interface CustomerSummary {
  id: number;
  name: string;
  phone_number: string;
  email: string;
}

interface StoreOwner {
  profile_picture: string;
}

export interface OrderCreatedResponse {
  message: string;
  status: string;
  order: Order;
}

export const useGetSingleOrder = (id: string) => {
  return useQuery<OrderDetailResponse>({
    queryKey: ["order", id],
    queryFn: () => api.getSingleOrders(id),
    enabled: !!id,
  });
};
export const useGetOrders = (status: string) => {
  return useQuery<OrdersResponse>({
    queryKey: ["orders", status],
    queryFn: () => api.getOrders(status),
    enabled: !!status,
  });
};
