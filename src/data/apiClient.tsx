import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";

export const baseURL = import.meta.env.VITE_BASE_URL;
export const identifier = import.meta.env.VITE_IDENTIFIER;


// Define the API Client type for reusability
const apiClient: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    identifier: identifier,
  },
});

// Optional: Add request interceptors for attaching tokens
apiClient.interceptors.request.use(
  async (config) => {
    console.log(config.url, "request interceptor");
    
    const token = localStorage.getItem("authToken");
    console.log("Retrieved token:", token);

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
    console.log(response, "...response")
  if(response?.data && (response.data.success === false && (response.status === 200 || response.status === 201))) {
    
    Promise.reject(new Error(`Request failed, ${response.data.message}`))
  }
    return response;
},
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
