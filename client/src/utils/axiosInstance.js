import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // to set the cookie on client side
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('sessionId');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      if (sessionId) {
        config.headers['Session-ID'] = sessionId;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );