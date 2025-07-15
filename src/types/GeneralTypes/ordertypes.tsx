import { FileData } from "@/utils/addItemService";
import { Customer } from "./profiletypes";

export interface Orders {
    is_exist: number;
    order_type: number;
    name: string;
    items_id: (number | null)[];
    phone_number: string;
    email: string;
    total_amount: number;
    paid_amount: number;
    payment_type: string;
    pickup_date: string;
  }
export interface ExistingOrders {
    is_exist: number;
    order_type: number;
    customer_id: number | null;
    items_id: (number | null)[];
    total_amount: number;
    paid_amount: number;
    payment_type: string;
    pickup_date: string;
  }

export interface CreatedOrder {
  ref: string;
  user_id: number;
  store_id: number;
  customer_id: number;
  pickup_date: string;
  delivery_address: string | null;
  total_amount: number;
  paid_amount: number;
  order_code: number;
  order_type: number;
  payment_type: string;
  balance: number;
  updated_at: string;
  created_at: string;
  id: number;
}
export interface Item {
  name: string;
  store_id?: number;
  updated_at?: string;
  created_at?: string;
  id?: number;
}
export interface Items {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  store_id: number;
}
export interface Service {
  id: number;
  store_id: number;
  user_id: number;
  name: string;
  price: string;
  estimated_hours: number;
  created_at: string;
  updated_at: string;
}
export interface Services {
  name: string;
  price?: number;
  estimated_hours?: number;
  service_type?: number;
}
export interface EditServices {
  id?:number;
  name: string;
  price: number;
  estimated_hours: number;
}
export interface DeleteServices {
  id?:number;
}
export interface OnlineServices {
  name: string;
  price: number;
  estimated_hours: number;
  // item_id: number;
  service_type: number;
}

export interface ServiceItem {
  id:number | null;
  service_name: string;
  no_of_items: number;
  item_type: string;
  photos: FileData[];
}

export interface AllItems {
  id: number | null;
  user_id: number | null;
  store_id: number | null;
  service_name: string;
  no_of_items: number;
  item_type: string;
  photos: string[];
}
export interface Customers {
  id: number;
  name: string;
  phone_number: string;
  email: string;
}

export interface Order {
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
  ready_pickup_date: string;
  completed_date: string;
  processing_date: string;
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
  customer: Customers;
  no_of_items: number;
}

export interface StoreOwner {
  profile_picture: string;
}


export interface OrderResponse {
  message: string;
  status: string;
  orders: Order[];
  storeOwner: StoreOwner;
}
export interface CreateOrderResponse {
  success: boolean;
  message: string;
  order: Order;
}
export interface OrderItems {
  id: number;
  store_id: number;
  user_id: number;
  order_id: number;
  service_name: string;
  no_of_items: number;
  photos: string[]; // Assuming this is a stringified JSON array (e.g., "[]")
  type: string; // This is a string but contains numeric values like "2"
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  status: number; // Numeric status code
  item_type: string;
};


export interface SingleOrderResponse {
  success: boolean;
  message: string;
  order: Order;
  order_item: OrderItems[];
  customer: Customer;
  item_count: number
};

export interface RecentOrder {
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
};
export interface Plan {
  id: number;
  name: string;
  price: number;
  features: string;
  duration: string;
  created_at: string | null;
  updated_at: string | null;
}


export interface VendorOrdersResponse {
  success: boolean;
  total_amount: number;
  total_order_count: number;
  pending_order_count: number;
  completed_order_count: number;
  pending_amount: number;
  completed_amount: number;
  recent_orders: RecentOrder[];
  plan: Plan;
  total_customers: number;
}

export interface ExistingOrderData {
  ref: string;
  user_id: number;
  store_id: number;
  customer_id: number;
  pickup_date: string; // ISO format date
  delivery_address: string | null;
  total_amount: number;
  paid_amount: number;
  order_code: number;
  order_type: number; // Enum or description can be added
  payment_type: string; // Possible values: 'cash', 'credit', etc.
  order_number: number;
  balance: number;
  updated_at: string; // ISO format datetime
  created_at: string; // ISO format datetime
  id: number;
}

export interface ExistingOrderResponse {
  success: boolean;
  message: string;
  order: ExistingOrderData;
}

export interface DeleteResponse  {
  id: number;
  user_id: number;
  service_name: string;
  item_type: string;
  no_of_items: number;
  photos: object[]; // Assuming photos is an array of objects
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  store_id: number | null;
  estimated_hours: number | null;
  price: number | null;
};

export interface ItemRecordResponse  {
  success: boolean;
  message: string;
  service: DeleteResponse;
};

export interface EditRecordResponse {
  success: boolean;
  message: string;
  service: {
    id: number;
    user_id: number;
    service_name: string;
    item_type: string;
    no_of_items: string; // Consider changing to number if always numeric
    photos: string[]; // Parsed JSON array of image URLs
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    store_id: number | null;
    estimated_hours: string; // Consider changing to number if always numeric
    price: string; // Consider changing to number if always numeric
  };
};


export interface CustomerOrder {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  store_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  store_id: number;
  user_id: number;
  order_id: number;
  service_name: string | null;
  no_of_items: number;
  photos: string; // Assuming it's a stringified array of image URLs
  type: string;
  created_at: string;
  updated_at: string;
  status: number;
  online_status: string | null;
  order_number: number;
  item_type: string;
  order_price: number;
}

export interface Order {
  id: number;
  total_amount: number;
}

export interface CustomerOrderResponse {
  success: boolean;
  message: string;
  customer?: CustomerOrder;
  order_items: OrderItem[];
  orders: Order;
}

export interface SearchCustomersResponse {
  success: boolean;
  message: string;
  result?: CustomerOrder[]; 
}

export interface SearchCustomerItem {
  id: number;
  name: string;
  total_no_of_items: string;
}

export interface SearchCustomerItemResponse {
  success: boolean;
  message: string;
  customers: SearchCustomerItem[];
}
export interface ItemQuery{
    item_type :string,
    status: string,
    name:string,
}