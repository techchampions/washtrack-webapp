import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

// types/faq.ts

// Individual FAQ item type
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
  "0": null; // This seems to be an empty field in your response
}

// Main API response type
export interface FAQResponse {
  success: boolean;
  faq: FAQItem[];
}

// Props for FAQ component
export interface FAQComponentProps {
  data?: FAQResponse;
  loading?: boolean;
  error?: string;
}

// Props for individual FAQ item component
export interface FAQItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}
export const useGetFAQs = () => {
  return useQuery<FAQResponse>({
    queryKey: ["faqs"],
    queryFn: () => api.fetchFaqs(),
  });
};
