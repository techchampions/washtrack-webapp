export interface Customer {
  id: number;
  name: string;
  phone_number: string;
  email: string;
}

export interface Order {
  id: number;
  ref: string;
  created_at: string;
  paid_amount: number;
  order_number: number;
  total_amount: number;
}

export interface RevenueItem {
  id: number;
  store_id: number;
  user_id: number;
  customer_id: number;
  order_id: number;
  created_at: string;
  updated_at: string;
  orders: Order;
  customers: Customer;
}

export interface StoreOwner {
  id: number;
  user_id: number;
  store_name: string;
  description: string;
  store_images: string; // JSON string containing an array of URLs
  store_rate: number;
  created_at: string;
  updated_at: string;
  store_location: string;
  is_visible: number;
  longitude: number;
  latitude: number;
  geolocation: number;
  state: string;
  country: string;
}

export interface RevenueResponse {
  success: boolean;
  storeOwner: StoreOwner;
  totalRevenues: number;
  Revenue: RevenueItem[];
}

// Search Revenue Response
export interface SearchRevenueResponse {
  success: boolean;
  message: string;
  result: RevenueItem[];
}
