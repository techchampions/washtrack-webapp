import { showError } from "@/utils/toast";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import toast from 'react-hot-toast';

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
    console.log(config.url, "request interceptor");

     const token = localStorage.getItem('auth-token') || 
                  JSON.parse(localStorage.getItem('auth-storage') || '{}')?.state?.token;


    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {

    return Promise.reject(error)
  });

apiClient.interceptors.response.use(
   function (response) {
    if (response?.data && (response.data.success === false && (response.status === 200 || response.status === 201))) {
       showError(response.data.message || 'Your session has expired. Please sign in again.');
      Promise.reject(new Error(`Request failed, ${response.data.message}`))
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

    if (!window.location.pathname.includes('/auth/')) {
      switch (error.response?.status) {
        case 400:
          showError(errorMessage || 'Bad request');
          break;
        case 403:
          showError('Access forbidden');
          break;
        case 404:
          showError('Resource not found');
          break;
        case 422:
          showError(errorMessage || 'Validation failed');
          break;
        case 429:
          showError('Too many requests. Please try again later.');
          break;
        case 500:
          showError('Server error. Please try again later.');
          break;
        default:
          if (error.code === 'ECONNABORTED') {
            showError('Request timeout. Please try again.');
          } else if (error.message === 'Network Error') {
            showError('Network error. Please check your connection.');
          }
      }
    }

    return Promise.reject(error);
  }
);

function getErrorMessage(error: AxiosError): string {
  if (error.response?.data) {
    const data = error.response.data as any;

    if (typeof data === 'string') return data;
    if (data.message) return data.message;
    if (data.error) return data.error;
    if (data.errors && Array.isArray(data.errors)) {
      return data.errors[0]?.message || data.errors[0];
    }
  }

  return error.message || 'An unexpected error occurred';
}

export default apiClient;
