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

export const getProcessingOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get("/orders/processing");
  return response.data;
};
export const useGetProcessingOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders-processing"],
    queryFn: getProcessingOrders,
  });
};
