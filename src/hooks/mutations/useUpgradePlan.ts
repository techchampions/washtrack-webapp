import { api } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpgradePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.upgradePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
  });
};

// hooks/usePaystackPayment.ts
type PaystackProps = {
  email: string;
  amount: number; // amount in Naira
  reference: string;
  key: string;
  onSuccess: () => void;
  onClose: () => void;
};
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackOptions) => PaystackHandler;
    };
  }
} // Paystack Types
interface PaystackOptions {
  key: string;
  email: string;
  ref: string;
  amount: number;
  currency: string;
  callback: (response: PaystackResponse) => void;
  onClose: () => void;
}

interface PaystackResponse {
  reference: string;
  status: "success" | "failed";
  transaction: string;
}
interface PaystackHandler {
  openIframe: () => void;
}
export const usePaystackPlanPayment = () => {
  const initializePayment = ({
    email,
    amount,
    reference,
    key,
    onSuccess,
    onClose,
  }: PaystackProps) => {
    const paystack = (window as Window).PaystackPop?.setup({
      key: key,
      email,
      ref: reference,
      amount: amount,
      currency: "NGN",
      callback: onSuccess,
      onClose,
    });

    paystack?.openIframe();
  };

  return initializePayment;
};
