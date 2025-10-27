export interface OutstandingCustomer {
  id: number;
  name: string;
  phone_number: string;
}

export interface OutstandingItem {
  id: number;
  store_id: number;
  user_id: number;
  customer_id: number;
  ref: string;
  order_type: number;
  total_amount: number;
  paid_amount: number;
  order_code: number;
  pickup_date: string;
  payment_type: string;
  delivery_address: string | null;
  delivery_time: string | null;
  delivery_fee: number;
  service_fee: number;
  balance: number;
  status: number;
  created_at: string;
  updated_at: string;
  order_number: number;
  customer: OutstandingCustomer;
}