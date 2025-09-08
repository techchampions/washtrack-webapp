import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
export interface UserProfileApiResponse {
  success: boolean;
  user: User;
}

export interface User {
  id: number;
  email: string;
  phone_num: string;
  referral_code: string;
  first_name: string | null;
  last_name: string | null;
  store_name: string;
  store_id: number;
  user_type: number;
  role: number;
  otp_verified_at: string | null;
  state: string | null;
  email_verified_at: string | null;
  profile_picture: string | null;
  gender: string | null;
  notification_enabled: number;
  description: string | null;
  plan_id: number | null;
  device_id: string | null;
  geolocation: string | null;
  longitude: string | null;
  latitude: string | null;
  created_at: string;
  updated_at: string;
  plan_upgraded_at: string | null;
  store_updated_at: string | null;
  address: string | null;
  country: string | null;
  personnel: string | null;
  fullname: string | null;
  plan: Plan | null;
  store: Store | null;
}

export interface Plan {
  id: number;
  name: string;
  slug: string;
}

export interface Store {
  id: number;
  user_id: number;
  store_name: string;
  description: string | null;
  store_images: string; // JSON string, can be parsed into string[]
  store_rate: number;
  created_at: string;
  updated_at: string;
  store_location: string | null;
  is_visible: number;
  longitude: string | null;
  latitude: string | null;
  geolocation: string | null;
  state: string | null;
  country: string | null;
}
export const useGetUserProfile = () => {
  const { setUser, setPlan, setStore, token } = useAuthStore();
  const queryResult = useQuery<UserProfileApiResponse>({
    queryKey: ["user-profile"],
    queryFn: authService.getProfile,
    enabled: !!token,
  });

  useEffect(() => {
    if (queryResult.data?.success) {
      console.log("setting user state");
      setUser(queryResult.data.user);
      setPlan(queryResult.data.user.plan);
      setStore(queryResult.data.user.store);
    }
  }, [queryResult.data, setUser, setPlan, setStore]);

  return queryResult;
};
