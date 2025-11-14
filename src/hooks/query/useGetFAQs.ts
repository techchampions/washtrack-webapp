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
export interface ContactInfo {
  id: number;
  name: "phone" | "email" | "address" | "website"; // Union type for known values
  type: "contact" | string;
  value: string;
  numeric: number;
  string: string;
  created_at: string;
  updated_at: string;
  0: null;
}

export interface FAQItem {
  id: number;
  name: string;
  type: string;
  value: string;
  numeric: number | null;
  string: string | null;
  created_at: string;
  updated_at: string;
  0: null;
}

export interface ContactFAQResponse {
  success: boolean;
  contact: ContactInfo[];
  faq: FAQItem[];
}
export const useGetContacts = () => {
  return useQuery<ContactFAQResponse>({
    queryKey: ["contacts"],
    queryFn: () => api.contactInfo(),
  });
};
