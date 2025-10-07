export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}
export interface SignupData {
  store_name: string;
  email: string;
  password: string;
  phone_num: string;
  referral_code?: string;
}

export interface ForgotPasswordData {
  email: string;
}
export interface ChangePasswordData {
  otp?: number;
  password: string;
  password_confirmation: string;
}
export interface AuthResponse {}
export interface ResetPasswordData {}

export interface AuthUser {
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

export interface OnboardingData {
  profileComplete: boolean;
  addressSetup: boolean;
  preferencesSet: boolean;
  currentStep: "profile" | "address" | "preferences" | "complete";
  isAuthenticated: boolean;
}

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
// export interface Login {
//   email: string;
//   password: string;
// }

// export interface ForgotPassword {
// }

// export interface ChangePassword {

// }
// export interface User {
//   id: number;
//   email: string;
//   phone_num: string;
//   plan_id: number;
//   referral_code: string;
//   store_location: string | null;
//   store_name: string;
//   user_type: number;
//   created_at: string;
//   updated_at: string;
// }

export interface RegisterResponse {
  success: boolean;
  user: AuthUser;
  otp: OTP;
}
