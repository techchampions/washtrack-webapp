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
