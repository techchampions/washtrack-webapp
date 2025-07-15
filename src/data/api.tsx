import {
  AccountName,
  BankDetails,
  ItemService,
  UpdateService,
} from "@/types/GeneralTypes/estoreTypes";
import {
  CreateExpensePayload,
  CreateExpenseResponse,
  HomeExpenses,
  HomeExpensesOverview,
  SearchOutstandingResponse,
} from "@/types/GeneralTypes/ExpenseTypes";
import {
  CustomerOrderResponse,
  DeleteServices,
  EditServices,
  ExistingOrders,
  ItemQuery,
  OnlineServices,
  Orders,
  SearchCustomerItemResponse,
  SearchCustomersResponse,
  Services,
} from "@/types/GeneralTypes/ordertypes";
import { Customer, UserProfile } from "@/types/GeneralTypes/profiletypes";
import { OTP } from "@/types/OnboardingTypes/otpTypes";
import {
  ChangePassword,
  ForgotPassword,
  Login,
  Register,
} from "@/types/OnboardingTypes/registerTypes";
//import { DeleteItemsPayload } from "@/zustand/orderStore";
import apiClient from "./apiClient";
import {
  OutStandingResponse,
  SearchExpensesResponse,
} from "@/types/GeneralTypes/ExpenseTypes";
import {
  RevenueResponse,
  SearchRevenueResponse,
} from "@/types/GeneralTypes/revenueTypes";
import { Report } from "@/types/GeneralTypes/report";
import { MonthlyReportResponse } from "@/types/GeneralTypes/report";
import { PaymentTypes } from "@/types/GeneralTypes/type";

// Function to handle user registration
const registerUser = async (data: Register) => {
  const response = await apiClient.post("/api/register", data);
  return response.data; // Assumes server responds with user and other relevant info
};
const verifyUser = async (data: OTP) => {
  const response = await apiClient.post("/api/verify-otp", data);
  return response.data; // Assumes server responds with user and other relevant info
};
const resendCode = async (data: OTP) => {
  const response = await apiClient.post("/api/resend-otp", data);
  return response.data; // Assumes server responds with user and other relevant info
};
const login = async (data: Login) => {
  const response = await apiClient.post("/api/login", data);

  return response.data; // Assumes server responds with user and other relevant info
};
const forgotPassword = async (data: ForgotPassword) => {
  const response = await apiClient.post("/api/forget-password", data);
  return response.data;
};
const changePassword = async (data: ChangePassword) => {
  const response = await apiClient.post("/api/update/password", data);
  // console.log(response.data.success);
  return response.data;
};
const logout = async () => {
  const response = await apiClient.post("/api/logout");
  return response.data;
};
const getProfile = async () => {
  const response = await apiClient.get("/api/user-profile");
  return response.data;
};
const editProfile = async (data: Partial<UserProfile>) => {
  const response = await apiClient.post("/api/profile/update", data);
  return response.data;
};
const getCustomers = async () => {
  const response = await apiClient.get("/api/customers/view");
  return response.data;
};
const getCustomerProfile = async (id: string) => {
  const response = await apiClient.get(`/api/customer/profile/${id}`);
  return response.data;
};
const editCustomerProfile = async (data: Partial<Customer>) => {
  const response = await apiClient.post(
    `/api/customer/editprofile/${data.id}`,
    data
  );
  return response.data;
};
const addItemType = async (data: string) => {
  const response = await apiClient.post(`/api/create-item-type`, {
    name: data,
  });
  return response.data;
};
const getItemType = async () => {
  const response = await apiClient.get(`/api/get-item-type`);
  return response.data;
};
const getServices = async (type: number) => {
  const response = await apiClient.get(`/api/service/${type}`);
  return response.data;
};
const addServices = async (data: Services) => {
  const response = await apiClient.post(`/api/create/service`, data);
  return response.data;
};
const updateServices = async (data: EditServices) => {
  const response = await apiClient.post(`/api/upate/service`, data);
  return response.data;
};
const deleteServices = async (id: DeleteServices) => {
  const response = await apiClient.post(`/api/delete/service`, id);
  return response.data;
};
const addOnlineServices = async (data: OnlineServices) => {
  const response = await apiClient.post(`/api/create/service`, data);
  return response.data;
};
const addItems = async (data: FormData) => {
  // Convert data to FormData

  // Send FormData to backend
  const response = await apiClient.post(`/api/create/item`, data, {
    headers: {
      "Content-Type": "multipart/form-data", // Ensures proper handling of file uploads
    },
  });

  return response.data;
};

const getItems = async () => {
  const response = await apiClient.get(`/api/items`);
  return response.data;
};
const updateItems = async (data: FormData) => {
  // Convert data to FormData

  // Send FormData to backend
  const response = await apiClient.post(`/api/upate/item`, data, {
    headers: {
      "Content-Type": "multipart/form-data", // Ensures proper handling of file uploads
    },
  });

  return response.data;
};
/**const deleteItems = async (data: DeleteItemsPayload) => {
  const response = await apiClient.post(`/api/delete/item`, data);
  return response.data;
}; **/
const createOrder = async (data: Orders) => {
  const response = await apiClient.post(`/api/order/create`, data);
  return response.data;
};
const createExistingOrder = async (data: ExistingOrders) => {
  const response = await apiClient.post(`/api/order/create`, data);
  return response.data;
};
const getOrders = async (status: string) => {
  const response = await apiClient.get(`/api/orders/${status}`);
  return response.data;
};
const getSingleOrders = async (id: string) => {
  const response = await apiClient.get(`/api/order/${id}`);
  return response.data;
};
const getInventory = async (status: string) => {
  const response = await apiClient.get(`/api/vendor/inventory/${status}`);
  return response.data;
};
const createExpense = async (
  data: CreateExpensePayload
): Promise<CreateExpenseResponse> => {
  const response = await apiClient.post<CreateExpenseResponse>(
    `/api/expense/create`,
    data
  );
  return response.data;
};

// const getRevenueList = async () => {
//   const response = await apiClient.get(`/api/vendor/revenue/all`);
//   return response.data;
// };
const getOutstanding = async () => {
  const response = await apiClient.get(`/api/vendor/outstanding`);
  return response.data;
};
// const getOutstandingList = async () => {
//   const response = await apiClient.get(`/api/vendor/outstanding/list`);
//   return response.data;
// };
const getReferrals = async () => {
  const response = await apiClient.get(`/api/my-referrals`);
  return response.data;
};
const getEstore = async () => {
  const response = await apiClient.get(`/api/estore/homePageOnlineStore`);
  return response.data;
};
const getEorders = async (status: string) => {
  const response = await apiClient.get(`/api/estore/orders/${status}`);
  return response.data;
};
const getStoreItems = async () => {
  const response = await apiClient.get(`/api/estore/get-item-service`);
  return response.data;
};
const getStoreItem = async (id: string) => {
  const response = await apiClient.get(`/api/item-services/${id}`);
  return response.data;
};

const updateStoreItem = async (data: UpdateService[]) => {
  const response = await apiClient.put(`/api/item-services/update`, data);
  return response.data;
};
const updateStoreSetUp = async () => {
  const response = await apiClient.post(`/api/update-store-setup`);
  return response.data;
};
const createEStore = async (data: FormData) => {
  // Convert data to FormData

  // Send FormData to backend
  const response = await apiClient.post(`/api/profile/update`, data, {
    headers: {
      "Content-Type": "multipart/form-data", // Ensures proper handling of file uploads
    },
  });

  return response.data;
};
const getBanks = async () => {
  const response = await apiClient.get(`/api/estore/paystack/banks`);
  return response.data;
};
const getAccountName = async (data: AccountName) => {
  const response = await apiClient.post(
    `/api/estore/paystack/resolve-account-name`,
    data
  );
  return response.data;
};
const addBankDetails = async (data: BankDetails) => {
  const response = await apiClient.post(`/api/estore/add-bank`, data);
  return response.data;
};
const getBankDetails = async () => {
  const response = await apiClient.get(`/api/estore/banks`);
  return response.data;
};
const getWithdrawals = async (status: string) => {
  const response = await apiClient.get(
    `/api/estore/get-all-withdrawal/${status}`
  );
  return response.data;
};
const getWithdrawalDetails = async (id: string) => {
  const response = await apiClient.get(`/api/estore/withdrawal-details/${id}`);
  return response.data;
};
const getPayoutsHome = async () => {
  const response = await apiClient.get(`/api/estore/get-withdrawal-request`);
  return response.data;
};
const getSubscriptions = async () => {
  const response = await apiClient.get(`/api/plans`);
  return response.data;
};
const searchParams = async (data: string, query: number | null) => {
  const response = await apiClient.get(
    `/api/vendor/search-orders/${data}?status=${query}`
  );
  return response.data;
};
const getInventoryView = async (data: string, status: string) => {
  const response = await apiClient.get(
    `/api/vendor/item-type-customer/${data}/customer/${status}`
  );
  console.log(response.data);
  return response.data;
};
const getCustomerOrderView = async (
  id: string,
  itemType: string
): Promise<CustomerOrderResponse> => {
  const response = await apiClient.get(
    `/api/vendor/customer/${id}/orders/${itemType}`
  );
  return response.data as CustomerOrderResponse;
};
const searchCustomers = async (
  query: string
): Promise<SearchCustomersResponse> => {
  const response = await apiClient.get<SearchCustomersResponse>(
    `/api/vendor/search-customers/${query}`
  );
  return response.data;
};
const searchCustomerItem = async (
  data: ItemQuery
): Promise<SearchCustomerItemResponse> => {
  const response = await apiClient.get<SearchCustomerItemResponse>(
    `/api/vendor/search-customers/${data.item_type}/${data.status}/${data.name} `
  );
  return response.data;
};
const getExpense = async (filter: string = "all"): Promise<HomeExpenses> => {
  const response = await apiClient.get(`/api/expenses?filter=${filter}`);
  return response.data;
};
const getExpensesOverview = async (
  id: string
): Promise<HomeExpensesOverview> => {
  const response = await apiClient.get(`/api/expenses/receipt/${id}`);
  return response.data;
};
const getAllExpense = async (): Promise<HomeExpenses> => {
  const response = await apiClient.get("/api/expenses?filter=all");
  return response.data;
};
const getAllOutstanding = async (
  filter: string = "all"
): Promise<OutStandingResponse> => {
  const response = await apiClient.get(`/api/outstanding?filter=${filter}`);
  return response.data;
};

const searchExpenses = async (
  query: string
): Promise<SearchExpensesResponse> => {
  const response = await apiClient.get<SearchExpensesResponse>(
    `/api/vendor/search-expenses/${query}`
  );
  return response.data;
};
const getOutstandingList = async (): Promise<OutStandingResponse> => {
  const response = await apiClient.get(`/api/outstanding?filter=all`);
  return response.data;
};

const getRevenue = async (filter: string = "all"): Promise<RevenueResponse> => {
  const response = await apiClient.get(`/api/revenues?filter=${filter}`);
  return response.data;
};

const searchOutstanding = async (
  query: string
): Promise<SearchOutstandingResponse> => {
  const response = await apiClient.get<SearchOutstandingResponse>(
    `/api/outstanding-search/${query}`
  );
  return response.data;
};
const getRevenueList = async (): Promise<RevenueResponse> => {
  const response = await apiClient.get(`/api/revenues?filter=all`);
  return response.data;
};
const searchRevenue = async (query: string): Promise<SearchRevenueResponse> => {
  const response = await apiClient.get<SearchRevenueResponse>(
    `/api/revenue-search/${query}`
  );
  return response.data;
};

const getReport = async (): Promise<Report> => {
  const response = await apiClient.get("/api/filter-report");
  return response.data;
};

const getMonthlyReport = async (
  query: string
): Promise<MonthlyReportResponse> => {
  const response = await apiClient.get<MonthlyReportResponse>(
    `/api/monthly-report/${query}`
  );
  return response.data;
};

const getVendorOrders = async (filter: string = "all") => {
  const response = await apiClient.get(`/api/vendor/homePage?filter=${filter}`);
  return response.data;
};
const getSubscriptionsHistory = async () => {
  const response = await apiClient.get(`/api/subscription-history`);
  return response.data;
};
const postStoreItem = async (data: ItemService) => {
  const response = await apiClient.post(`/api/item-services/create`, data);
  return response.data;
};
const upgradePlan = async (data: PaymentTypes) => {
  const response = await apiClient.post(`/api/make-payment`, data);
  return response.data;
};

const getNotifications = async () => {
  const response = await apiClient.get(`/api/notifications`);
  return response.data;
};

const changeOrderStatus = async (id: string, status: number) => {
  const response = await apiClient.post(`/api/update/orderstatus/${id}`, {
    status,
  });
  return response.data;
};

const completeOrder = async (
  id: string,
  order_code: number,
  paid_amount: number
) => {
  const response = await apiClient.post(`/api/vendor/complete-orders/${id}`, {
    order_code,
    paid_amount,
  });
  return response.data;
};

const payOutstandingBalance = async (id: string, paid_amount: number) => {
  const response = await apiClient.post(
    `/api/vendor/outstanding-order-update/${id}`,
    {
      paid_amount,
    }
  );
  return response.data;
};

const getOutstandingHistory = async (id: string) => {
  const response = await apiClient.get(
    `/api/vendor/outstanding-order-history/${id}`,
  );
  return response.data;
};

const deleteAccount = async () => {
  const response = await apiClient.post(`/api/delete-account`);
  return response.data;
};

const contactInfo = async () => {
  const response = await apiClient.get(`/api/system-info?type=contact`);
  return response.data;
}
const fetchFaqs = async () => {
  const response = await apiClient.get(`/api/faq`);
  return response.data;
}

// Exporting all API functions
export const api = {
  fetchFaqs,
  contactInfo,
  registerUser,
  verifyUser,
  resendCode,
  login,
  forgotPassword,
  changePassword,
  logout,
  getProfile,
  editProfile,
  getCustomers,
  getCustomerProfile,
  editCustomerProfile,
  createOrder,
  addItemType,
  getItemType,
  getServices,
  addServices,
  updateServices,
  deleteServices,
  addOnlineServices,
  addItems,
  getItems,
  updateItems,
  deleteItems,
  createExistingOrder,
  getOrders,
  getSingleOrders,
  getVendorOrders,
  getInventory,
  createExpense,
  getExpense,
  getRevenue,
  getOutstanding,
  getOutstandingList,
  getReferrals,
  getEstore,
  getEorders,
  getStoreItems,
  getStoreItem,
  postStoreItem,
  createEStore,
  getBanks,
  getAccountName,
  addBankDetails,
  getBankDetails,
  getWithdrawals,
  getWithdrawalDetails,
  getPayoutsHome,
  getSubscriptions,
  updateStoreItem,
  updateStoreSetUp,
  searchParams,
  getInventoryView,
  getCustomerOrderView,
  searchCustomers,
  searchCustomerItem,
  getExpensesOverview,
  getAllExpense,
  getAllOutstanding,
  searchExpenses,
  searchOutstanding,
  searchRevenue,
  getRevenueList,
  getReport,
  getMonthlyReport,
  getSubscriptionsHistory,
  upgradePlan,
  getNotifications,
  changeOrderStatus,
  completeOrder,
  payOutstandingBalance,
  getOutstandingHistory,
  deleteAccount,
};
