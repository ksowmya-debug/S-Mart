import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to requests if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for session expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const url = error.config.url || '';
      const isAuthEndpoint = url.includes('/api/auth/login') || url.includes('/api/auth/register');
      // Don't auto-clear the token just because the profile restore call failed
      // (server may be restarting). Only clear on explicit non-startup 401s.
      const isProfileRestore = url.includes('/api/auth/profile');
      if (!isAuthEndpoint && !isProfileRestore) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    return Promise.reject(error);
  }
);

export default API;
