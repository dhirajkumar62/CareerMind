import axios from "axios";
import useAuthStore from "../store/authStore";

const configuredApiUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:2000/api";
const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, "");
// Accept either the API URL or the deployed server origin in VITE_API_BASE_URL.
const apiBaseUrl = normalizedApiUrl.endsWith("/api")
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`;

const API = axios.create({
  baseURL: apiBaseUrl,
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// Handle unauthorized responses globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear store and redirect
      if (typeof window !== "undefined") {
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
