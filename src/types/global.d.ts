interface Branch {
  id: number;
  user_id: number;
  store_name: string;
  store_rate: number;
  description: string;
  store_location: string;
  state: string;
  country: string;
  geolocation: number;
  longitude: number;
  latitude: number;
  phone: string | number;
  is_visible: number;
  created_at: string;
  updated_at: string;
  parent_store_id: number;
}
interface CreateBranchPayload {
  store_name: string;
  store_images: string;
  phone: string | number;
  description: string;
  store_location: string;
  state: string;
  country: string;
  parent_store_id: number | null;
}
interface UpdateBranchPayload {
  store_name?: string;
  store_images?: string;
  phone?: string | number;
  description?: string;
  store_location?: string;
  state?: string;
  country?: string;
  branch_id: number | null;
}
type StaffRole = "user" | "staff" | "vendor" | "editor";
interface Staff {
  id: number;
  email: string;
  phone_num: string;
  referral_code: string | null;
  first_name: string;
  store_name: string;
  store_id: number;
  last_name: string;
  user_type: number;
  role: number;
  country: string | null;
  state: string | null;
  lga: string | null;
  otp_verified_at: string | null;
  store_completed_at: string | null;
  plan_upgraded_at: string | null;
  store_updated_at: string | null;
  update_store: string; // or specify the type if known
  email_verified_at: string | null;
  profile_picture: string | null;
  gender: string | null;
  notification_enabled: number; // 0 or 1 (boolean-like)
  short_bio: string | null;
  plan_id: number;
  device_id: string;
  fcm_token: string | null;
  geolocation: number; // 0 or 1 (boolean-like)
  longitude: string | null;
  latitude: string | null;
  description: string | null;
  address: string | null;
  personnel: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  0: number; // or null as in your example
  fullname: string;
}
interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}
interface ErrorResponse {
  status: boolean;
  message: string;
}
interface CreateStaffErrorResponse {
  status: boolean;
  message: {
    message: string;
    errors: Record<string, string[]>;
  };
}
interface CreateStaffPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_num: string;
  password: string;
  store_id: string;
}
interface UpdateStaffPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_num?: string;
  password?: string;
  store_id?: string;
}
