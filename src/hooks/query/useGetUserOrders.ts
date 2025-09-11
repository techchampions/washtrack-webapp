import apiClient from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";
type Item = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

type Order = {
  id: string;
  items: Item[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
};

export const getOrders = async (status: string): Promise<Order[]> => {
  const response = await apiClient.get(`/api/orders/${status}`);
  return response.data;
};
export const useGetOrders = (status: string) => {
  return useQuery<Order[]>({
    queryKey: ["orders", status],
    queryFn: () => getOrders(status),
    enabled: !!status,
  });
};
