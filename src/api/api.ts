// src/api/api.ts
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token.trim()}`;  // trim() 추가
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

