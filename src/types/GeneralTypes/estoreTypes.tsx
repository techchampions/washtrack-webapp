// import { FileData } from "@/utils/imageServices";

export interface RecentEOrder {
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
}

export interface EstoreData {
  total_amount: number;
  total_order_count: number;
  pending_order_count: number;
  completed_order_count: number;
  pending_amount: number;
  completed_amount: number;
  recent_orders: RecentEOrder[];
}
export interface EOrders {
  id: number;
  store_id: number;
  user_id: number;
  customer_id: number | null;
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
}

export interface EOrdersResponse {
  success: boolean;
  type: string;
  orders: EOrders[];
}

// export interface CreateEstore {
//   store_images: FileData[];
//   store_location: string;
//   description: string;
//   profile_picture: FileData | null;
//   latitude: number;
//   longitude: number;
//   geolocation: number;
// }
export interface OnlineServiceResponse {
  name: string;
  item_id: number;
  service_type: number;
  price: number;
  estimated_hours: number;
  user_id: number;
  store_id: number;
  updated_at: string;
  created_at: string;
  id: number;
}
export interface EServiceResponse {
  success: boolean;
  message: string;
  service: OnlineServiceResponse;
}
// Define the type for the items field
export interface EItem {
  name: string;
  store_id: number;
  updated_at: string; // ISO 8601 date string
  created_at: string; // ISO 8601 date string
  id: number;
}

// Define the type for the entire response
export interface AddItemResponse {
  success: boolean;
  message: string;
  items: EItem;
}
export interface EItemService {
  id: number;
  store_id: number;
  user_id: number;
  service_name: string;
  price: string;
  estimated_hours: number;
  created_at: string;
  updated_at: string;
  store_type: string | null;
  item_id: number;
  service_type: number;
  service_id: number;
}

export interface EItemType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  store_id: number;
}

export interface StoreItemsResponse {
  success: boolean;
  message: string;
  itemType: EItemType;
  item_service: EItemService[];
}
export interface EItemTypeService {
  id: number;
  service_name: string;
  item_id: number;
  price: number;
}
export interface EitemTypes {
  id: number;
  name: string;
  store_id: number;
  services: EItemTypeService[];
}
export interface EItemTypesResponse {
  success: boolean;
  message: string;
  itemType: EitemTypes[];
}
export interface AccountName {
  account_number: string;
  bank_code: string;
}
export interface AccountNameResponse {
  status: boolean;
  message: string;
  data: {
    account_number: string;
    account_name: string;
    bank_id: number;
  };
}

export interface BankDetails {
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}

export interface Withdrawal {
  id: number;
  amount: number;
  payment_type: string | null;
  bank_account_number: string;
  bank_account_name: string;
  bank_name: string;
  store_id: number;
  user_id: number;
  reference: string | null;
  created_at: string;
  updated_at: string;
  status: number;
  bank_code: string;
  user: {
    id: number;
    first_name: string | null;
    last_name: string | null;
  };
}

export interface GetBankDetails {
  id: number;
  bank_account_number: string;
  bank_account_name: string;
  bank_name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  bank_code: string;
}

export interface ItemService {
  item_name: string;
  services: {
    service_name: string;
    price: number;
    estimated_hours: number;
    service_id: number;
  }[];
}
export interface UpdateService {
  id: number;
  item_id: number;
  user_id: number;
  store_id: number;
  item_name: string;
  service_id: number;
  price: number;
  estimated_hours: number;
  service_name: string;
}
