export interface PlanCardProps {
  id: number;
  name: string;
  price: number;
  isBestPlan?: boolean;
  features: string;
}

export type OrderCardProps = {
  id: number;
  user_id: number;
  item_id: number;
  customer_id: number;
  total_amount: number;
  paid_amount: number;
  pickup_date: Date;
  balance: number;
  status: number;
  created_at: Date;
  updated_at: Date;
};

export interface PaymentTypes {
  store_id: number;
  payment_type: string;
  plan_id?: number;
}

export interface Plan {
  id: number;
  name: string;
  price: number;
  features: string;
  duration: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Subscription {
  id: number;
  plan_id: number;
  plan_name: string;
  user_id: number;
  reference: string;
  store_id: number;
  is_active: number;
  start_date: string; // ISO string
  end_date: string; // ISO string
  created_at: string;
  updated_at: string;
  plan: Plan;
}

export interface SubscriptionHistoryResponse {
  success: boolean;
  currentPlan: Plan;
  start_date: string; // formatted like "12 March 2025"
  end_date: string; // formatted like "12 April 2025"
  subscriptions: Subscription[];
  ordersLeft: number;
}

export interface OrderStatusResponse {
  success: boolean;
  message: string;
  orderStatus: {
    status: number;
    processing_date: string;
    ready_pickup_date: string;
    completed_date: string | null;
  };
}
