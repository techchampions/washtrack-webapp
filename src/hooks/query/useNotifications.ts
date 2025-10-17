import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export interface Notification {
  id: number;
  title: string;
  content: string;
  order_number: number | null;
  user_id: number;
  store_id: number | null;
  is_read: number; // 0 or 1 (boolean equivalent)
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  "0": null; // Seems to be an empty field in your response
  order_id: number | null;
}

// Main API response
export interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
}

export const useGetNotification = () => {
  return useQuery<NotificationsResponse>({
    queryKey: ["notifications"],
    queryFn: () => api.getNotifications(),
  });
};
