export interface LoginCredentials {};
export interface SignupData {};
export interface ForgotPasswordData{};
export interface ChangePasswordData {};
export interface AuthResponse {};
export interface ResetPasswordData {};
export interface AuthUser {};


export interface OTPResponse {
  id: number;
  otp: number;
  email: string;
  created_at: string;
  updated_at: string;
}
export interface OTP {
  otp: number | null;
}


export interface Register {
  email: string;
  phone_num: string;
  store_name: string;
  user_type: number;
  password: string;
  referral_code?: string;
}
export interface Login {
  email: string;
  password: string;
}

export interface ForgotPassword {
  email: string;
}

export interface ChangePassword {
  otp: number;
  password: string;
  password_confirmation: string;
}
export interface User {
  id: number;
  email: string;
  phone_num: string;
  plan_id: number;
  referral_code: string;
  store_location: string | null;
  store_name: string;
  user_type: number;
  created_at: string;
  updated_at: string;
}

export interface OTP {
  id: number;
  email: string;
  otp: number;
  created_at: string;
  updated_at: string;
}

export interface RegisterResponse {
  success: boolean;
  user: User;
  otp: OTP;
}
