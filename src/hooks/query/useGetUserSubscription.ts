import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

// Plan related types
export interface Plan {
  id: number;
  name: string;
  caption: string;
  max_orders: number;
  price: number;
  color: string | null;
  benefits: string; // JSON string array
  duration: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  0: null; // This seems like an API artifact
  slug: string;
  features: string;
}

// Subscription related types
export interface Subscription {
  id: number;
  plan_id: number;
  plan_name: string;
  user_id: number;
  reference: string;
  store_id: number;
  is_active: number; // 0 or 1
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  0: null; // This seems like an API artifact
  order_left: number;
  order_used: number;
  expired: boolean;
  slug: string;
  plan: Plan;
}

// Main API response type
export interface SubscriptionResponse {
  success: boolean;
  currentPlan: Plan;
  start_date: string;
  end_date: string;
  subscriptions: Subscription[];
  ordersLeft: number;
  expired: boolean;
}

// Alternative if you want to parse the benefits as actual arrays
interface PlanWithParsedBenefits extends Omit<Plan, "benefits"> {
  benefits: string[];
  parsed_features?: string[]; // Optional parsed features if needed
}

interface SubscriptionResponseWithParsedBenefits {
  success: boolean;
  current: PlanWithParsedBenefits;
  start_date: string;
  end_date: string;
  store_id: number;
  plans: PlanWithParsedBenefits[];
  email: string;
}

export const useGetSubscription = () => {
  return useQuery<SubscriptionResponse>({
    queryKey: ["user-plan"],
    queryFn: () => api.getSubscriptionsHistory(),
  });
};
export const useGetAllSubscriptions = () => {
  return useQuery<SubscriptionResponseWithParsedBenefits>({
    queryKey: ["plans"],
    queryFn: () => api.getSubscriptions(),
  });
};
