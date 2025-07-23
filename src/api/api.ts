// src/api/api.ts
//Axios 기본 설정 (모든 API 요청의 기반)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // 실제 백엔드 주소로 변경
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
