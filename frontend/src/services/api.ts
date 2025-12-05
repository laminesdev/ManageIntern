// src/services/api.ts
import axios from "axios";
import { config } from "@/config/env";

const API_BASE_URL = config.API_URL;

const api = axios.create({
   baseURL: API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
   timeout: 30000,
});

// Request interceptor
api.interceptors.request.use((requestConfig) => {
   const token = localStorage.getItem(config.TOKEN_KEY);  // Use imported config
   console.log('API Request - Token exists:', !!token);
   
   if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
   }
   
   return requestConfig;
});

// Response interceptor
api.interceptors.response.use(
   (response) => {
      console.log('API Response:', response.status, response.config.url);
      return response;
   },
   (error) => {
      console.error('API Error:', error.response?.status, error.config?.url);
      
      if (error.response?.status === 401) {
         // Clear auth data
         localStorage.removeItem(config.TOKEN_KEY);
         localStorage.removeItem(config.USER_KEY);
         
         // Only redirect if not already on login page
         if (!window.location.pathname.includes('/login')) {
            window.location.href = "/login";
         }
      }
      
      return Promise.reject(error);
   }
);

export default api;