export interface UserProfile {
  id: number;
  email: string;
  phone_num: string;
  referral_code: string | null;
  first_name: string | null;
  last_name: string | null;
  store_name: string | null;
  store_id: number | null;
  user_type: number | null;
  address: string;
  role: number;
  country: string | null;
  state: string | null;
  lga: string | null;
  otp_verified_at: string | null;
  store_completed_at: string | null;
  email_verified_at: string | null;
  profile_picture: string;
  gender: string;
  notification_enabled: number;
  short_bio: string;
  plan_id: number;
  device_id: string;
  created_at: string;
  updated_at: string;
  longitude: number | null;
  latitude: number | null;
  geolocation: number | null;
  store_location: string;
  description: string;
  store_images: string[];
  plan: {
    id: number;
    name: string;
  };
  store: {
    id: number;
    user_id: number;
    store_name: string;
    description: string;
    store_images: string[];
    store_rate: number;
    created_at: string;
    updated_at: string;
    longitude: number | null;
    latitude: number | null;
    geolocation: number | null;
    store_location: string;
    is_visible: number;
  };
}

export interface Customer {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  store_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  ref: string;
  total_amount: number;
  paid_amount: number;
  balance: number;
  order_code: number;
  pickup_date: string;
  payment_type: string;
  status: number;
}
