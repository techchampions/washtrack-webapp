import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export interface Customers {
  id: number;
  phone_number: number;
  name: string;
  email: string;
  user_id: number;
  store_id: number;
  created_at: string;
  updated_at: string;
}

export interface CustomersResponse {
  success: boolean;
  message: string;
  Customers: Customers[];
}
interface CustomerProfileResponse {
  success: boolean;
  message: string;
  customer: Customer;
  order: Order[];
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
  "0"?: null; // Optional since it's always null
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
  pickup_date?: string | null;
  delivery_time?: string | null;
  service_name?: string | null;
  item_type?: string | null;
  payment_type: string;
  delivery_address?: string | null;
  balance: number;
  online_status: number;
  status: number;
  processing_date?: string | null;
  ready_pickup_date?: string | null;
  order_pickup_date?: string | null;
  delivery_date?: string | null;
  completed_date?: string | null;
  created_at: string;
  updated_at: string;
  "0"?: null; // Optional since it's always null
}
export const useGetCustomers = () => {
  return useQuery<CustomersResponse>({
    queryKey: ["customers"],
    queryFn: api.getCustomers,
  });
};
export const useGetCustomerProfile = (id: number | string) => {
  return useQuery<CustomerProfileResponse>({
    queryKey: ["customer", id],
    queryFn: () => api.getCustomerProfile(id),
    enabled: !!id,
  });
};
