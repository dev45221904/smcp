/**
 * axios.js
 * Configured Axios instance for API calls.
 * - Base URL points to the backend API
 * - Request interceptor: attaches JWT token from localStorage
 * - Response interceptor: on 401 errors, clears localStorage and redirects to login
 */

import axios from "axios";

// Create an Axios instance with the backend base URL
const API = axios.create({
  baseURL: "/api",
});

/**
 * Request Interceptor
 * Attaches the JWT token to every outgoing request's Authorization header
 */
API.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * If a 401 (Unauthorized) response is received, clear localStorage
 * and redirect the user to the login page
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
