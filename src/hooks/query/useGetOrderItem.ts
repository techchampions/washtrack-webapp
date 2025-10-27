import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
export interface OrderItem {
  id: number;
  user_id: number;
  service_name: string;
  item_type: string;
  no_of_items: number;
  price: number | null;
  estimated_hours: number | null;
  store_id: number;
  photos: string; // This appears to be a JSON string, could be string[] if parsed
  created_at: string;
  updated_at: string;
  "0": null; // This seems unusual - might be a API artifact
}

export interface OrderItemsResponse {
  success: boolean;
  message: string;
  Items: OrderItem[];
}
export const useGetOrderItem = () => {
  return useQuery<OrderItemsResponse>({
    queryKey: ["order-items"],
    queryFn: api.getItems,
  });
};
