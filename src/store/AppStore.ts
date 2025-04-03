import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
  step:
    | "Get Started"
    | "signup"
    | "login"
    | "verify OTP"
    | "signup completed"
    | "setup store"
    | "add services"
    | "add items"
    | "onboarding complete";
  setStep: (newStep: OnboardingState["step"]) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (newHasCompletedOnboarding: boolean) => void;
};

// Persist step state in localStorage
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: "Get Started", // Default step
      setStep: (newStep) => set({ step: newStep }),
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (newHasCompletedOnboarding) =>
        set({ hasCompletedOnboarding: newHasCompletedOnboarding }),

      reset: () =>
        set({
          step: "Get Started",
          hasCompletedOnboarding: false,
        }),
    }),
    { name: "onboarding-state" } // Key for localStorage
  )
);

type Item = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

type Order = {
  id: string;
  items: Item[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
};

type Service = {
  id: string;
  name: string;
  description?: string;
  price?: number;
};

type Store = {
  id: string;
  name: string;
  description?: string;
  country?: string;
  state?: string;
  address?: string;
  logoUrl?: string;
  createdAt?: string;
};

type UserState = {
  email: string;
  setEmail: (newEmail: string) => void;
  phoneNumber: string;
  setPhoneNumber: (newPhoneNumber: string) => void;
  planID: string;
  setPlanID: (newPlanID: string) => void;

  referralCode: string;
  setReferralCode: (newReferralCode: string) => void;

  store: Store | null;
  setStore: (store: Store) => void;

  items: Item[];
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;

  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;

  services: Service[];
  setServices: (services: Service[]) => void;
  addService: (service: Service) => void;
  removeService: (id: string) => void;

  token: string;
  setToken: (newToken: string) => void;

  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
};

// Persist user data in localStorage
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (newEmail) => set({ email: newEmail }),
      phoneNumber: "",
      setPhoneNumber: (newPhoneNumber) => set({ phoneNumber: newPhoneNumber }),
      planID: "",
      setPlanID: (newPlanID) => set({ planID: newPlanID }),
      referralCode: "",
      setReferralCode: (newReferralCode) =>
        set({ referralCode: newReferralCode }),

      store: null,
      setStore: (store) => set({ store }),

      items: [],
      setItems: (items) => set({ items }),
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      orders: [],
      setOrders: (orders) => set({ orders }),
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        })),

      services: [],
      setServices: (services) => set({ services }),
      addService: (service) =>
        set((state) => ({ services: [...state.services, service] })),
      removeService: (id) =>
        set((state) => ({
          services: state.services.filter((service) => service.id !== id),
        })),

      token: "",
      setToken: (newToken) => set({ token: newToken }),

      isLoggedIn: false,
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),

      // 🔴 Reset function
      reset: () =>
        set({
          email: "",
          phoneNumber: "",
          planID: "",
          referralCode: "",
          store: null,
          items: [],
          orders: [],
          services: [],
          token: "",
          isLoggedIn: false,
        }),
    }),
    { name: "user-state" }
  )
);
