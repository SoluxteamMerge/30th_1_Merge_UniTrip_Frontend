// src/api/api.ts
//Axios 기본 설정 (모든 API 요청의 기반)
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // 필요에 따라
});

export default api;
