// Payload sent to the API
export interface CreateExpensePayload {
  expense_name: string;
  amount: string; // Keep as string since the API expects it this way
  expense_date: string;
  description: string;
}

// API response type
export interface CreateExpenseResponse {
  message: string;
  Expense: {
    user_id: number;
    expense_name: string;
    amount: string;
    store_id: number;
    expense_date: string;
    description: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

export interface StoreOwner {
  id: number;
  user_id: number;
  store_name: string;
  description: string;
  store_images: string[]; // Parsed as an array of URLs
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

export interface Expense {
  id: number;
  store_id: number;
  user_id: number;
  expense_name: string;
  amount: number;
  expense_date: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface HomeExpenses {
  success: boolean;
  totalExpenses: number;
  storeOwner: StoreOwner;
  Expense: Expense[];
}
export interface SearchExpensesResponse {
  success: boolean;
  message: string;
  result?: Expense[];
}
export interface HomeExpensesOverview {
  success: boolean;
  totalExpenses: number;
  storeOwner: StoreOwner;
  Expense: Expense;
}

// outstanding types

export interface Customer {
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
  item_type: string;
  service_name: string | null;
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
  online_status: string | null;
  created_at: string;
  updated_at: string;
  order_number: number;
  customer: Customer;
}
export interface OutStandingResponse {
  success: boolean;
  storeOwner: StoreOwner;
  totalOutStanding: number;
  Outstanding: OutstandingItem[];
}
export interface SearchOutstandingResponse {
  success: boolean;
  message: string;
  result: OutstandingItem[];
}

export interface Customer {
  id: number;
  name: string;
  phone_number: string;
  email: string;
}
