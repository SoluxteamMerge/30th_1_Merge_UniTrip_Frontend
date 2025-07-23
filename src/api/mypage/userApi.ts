// src/api/userApi.ts
//유저 정보 불러오기용 API 함수
//MyPageSidebar.tsx ← 여기서 userApi 불러서 사용자 이름/프로필 요청
import api from '../api.ts';
import axios from "../api.ts"; // axios 인스턴스


export const fetchUserInfo = async () => {
  const token = localStorage.getItem('accessToken'); // 저장 방식에 따라 변경 가능
  const response = await api.get('/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 내가 쓴 리뷰 조회 API
export const getMyReviews = async () => {
  try {
    const response = await axios.get("/api/user/reviews"); // 토큰은 인터셉터로 처리됨
    return response.data;
  } catch (error) {
    throw error;
  }
};