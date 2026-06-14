import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

const expoExtra = Constants.expoConfig?.extra as
  | { backendUrl?: string }
  | undefined;

// Get backend URL from Expo config, environment variable, or a platform default.
const BACKEND_URL =
  expoExtra?.backendUrl ||
  process.env.EXPO_PUBLIC_BACKEND_URL ||
  (Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : "http://localhost:3000");

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      return Promise.reject({
        ...error,
        message: error.response.data?.message || error.message,
        status: error.response.status,
      });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        ...error,
        message: `Network error: Cannot reach backend at ${BACKEND_URL}. Make sure the backend is running.`,
      });
    } else {
      return Promise.reject(error);
    }
  },
);

export default api;
