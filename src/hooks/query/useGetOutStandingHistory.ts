import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
type ApiResponse = {
  success: boolean;
  order: OrderForOustanding;
  outstandingHistory: OutstandingHistoryItem[];
};

export type OrderForOustanding = {
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
};

type OutstandingHistoryItem = {
  id: number;
  store_id: number;
  user_id: number;
  order_id: number;
  order_total_amount: number;
  outstanding_paid: number;
  amount_remaining: number;
  created_at: string;
  updated_at: string;
  "0": null;
};
export const useGetOutstandingList = (id: string) => {
  return useQuery<ApiResponse>({
    queryKey: ["outstanding", id],
    queryFn: () => api.getOutstandingHistory(id),
    enabled: !!id,
  });
};
