import apiClient from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";
interface Customer {
  id: number;
  name: string;
  phone_number: string;
  email: string;
}

export interface Order {
  id: number;
  store_id: number;
  user_id: number;
  customer_id: number;
  ref: string;
  order_type: number;
  item_type: string | null;
  service_name: string | null;
  total_amount: number;
  paid_amount: number;
  order_code: number;
  pickup_date: string | null;
  payment_type: string;
  delivery_address: string | null;
  delivery_time: string | null;
  delivery_fee: number;
  service_fee: number;
  balance: number;
  status: number;
  online_status: string | null;
  processing_date: string | null;
  ready_pickup_date: string | null;
  order_pickup_date: string | null;
  delivery_date: string | null;
  completed_date: string | null;
  created_at: string;
  updated_at: string;
  order_number: number;
  customer: Customer;
}

interface Plan {
  id: number;
  name: string;
  price: number;
  features: string;
  duration: string;
  created_at: string | null;
  updated_at: string | null;
  slug: string;
}

interface DashboardData {
  success: boolean;
  plan: Plan;
  ordersLeft: number;
  total_amount: number;
  total_order_count: number;
  pending_order_count: number;
  completed_order_count: number;
  pending_amount: number;
  completed_amount: number;
  recent_orders: Order[];
}
export const getDashboard = async (): Promise<DashboardData> => {
  const response = await apiClient.get(`/api/vendor/homePage?filter=all`);
  return response.data;
};
export const useGetDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: ["vendor-dashboard"],
    queryFn: getDashboard,
  });
};
