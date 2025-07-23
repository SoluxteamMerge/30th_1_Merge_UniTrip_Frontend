// src/api/userApi.ts
//유저 정보 불러오기용 API 함수
//MyPageSidebar.tsx ← 여기서 userApi 불러서 사용자 이름/프로필 요청
import api from './api.ts';

export const fetchUserInfo = async () => {
  const token = localStorage.getItem('accessToken'); // 저장 방식에 따라 변경 가능
  const response = await api.get('/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
