/* eslint-disable @typescript-eslint/no-explicit-any */
import { showError } from "@/utils/toast";
import axios, { AxiosError, AxiosInstance } from "axios";

export const baseURL = import.meta.env.VITE_BASE_URL;
export const identifier = import.meta.env.VITE_IDENTIFIER;

const apiClient: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    identifier: identifier,
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token =
      localStorage.getItem("auth-token") ||
      JSON.parse(localStorage.getItem("auth-storage") || "{}")?.state?.token;

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    if (
      response?.data &&
      response.data.success === false &&
      (response.status === 200 || response.status === 201)
    ) {
      // showError(response.data.message || 'Your session has expired. Please sign in again.');
      Promise.reject(new Error(`Request failed, ${response.data.message}`));
    }
    return response;
  },
  async (error: AxiosError) => {
    // if (error.response?.status === 401) {
    //   localStorage.removeItem('auth-storage');
    //   localStorage.removeItem('auth-token');

    //   if (!window.location.pathname.includes('/auth/')) {
    //     showError('Your session has expired. Please sign in again.');
    //   }

    //   window.location.href = '/auth/login';
    // }

    const errorMessage = getErrorMessage(error);

    console.log(errorMessage, "_____error message in apiClient");

    if (!window.location.pathname.includes("/auth/")) {
      switch (error.response?.status) {
        case 400:
          showError(errorMessage || "Bad request");
          break;
        case 403:
          showError("Access forbidden");
          break;
        case 404:
          showError("Resource not found");
          break;
        case 422:
          showError(errorMessage || "Validation failed");
          break;
        case 429:
          showError("Too many requests. Please try again later.");
          break;
        case 500:
          showError("Server error. Please try again later.");
          break;
        default:
          if (error.code === "ECONNABORTED") {
            showError("Request timeout. Please try again.");
          } else if (error.message === "Network Error") {
            showError("Network error. Please check your connection.");
          }
      }
    }

    return Promise.reject(error);
  }
);

function getErrorMessage(error: AxiosError): string {
  try {
    if (error.response?.data) {
      const data = error.response.data as any;

      if (typeof data === "string") return data;
      if (data.message && typeof data.message === "string") return data.message;
      if (data.error && typeof data.error === "string") return data.error;
      if (data.errors && Array.isArray(data.errors)) {
        return data.errors[0]?.message || data.errors[0];
      }
      if (data.message && typeof data.message === "object") {
        if (data.message.errors) {
          const errorObj = data.message.errors;
          if (errorObj && typeof errorObj === "object") {
            const err_msg = Object.entries(errorObj).flatMap(([, messages]) => {
              if (Array.isArray(messages) && messages.length > 0) {
                return messages[0];
              }
            });
            return err_msg[0] || "validate";
          }
        }

        return data.message.message;
      }
    }

    return error.message || "An unexpected error occurred";
  } catch (error) {
    console.log(error);
    return "Validation failed";
  }
}

export default apiClient;
