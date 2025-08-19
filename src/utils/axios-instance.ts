import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000, // 30 seconds for file uploads
});

axiosInstance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token = localStorage.getItem("token");

    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (config.data instanceof FormData) delete config.headers["Content-Type"];

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR - Handle errors
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error("Response error:", error.message);

    return Promise.reject(error);
  }
);

export default axiosInstance;
