//유저 정보 불러오기용 API 함수
//MyPageSidebar.tsx ← 여기서 userApi 불러서 사용자 이름/프로필 요청
// src/api/mypage/userApi.ts

import api from '../api'; // 공통 axios 인스턴스
import { AxiosResponse } from 'axios';

export interface UserInfoResponse {
  username: string;
  profileImageUrl?: string;
}

export const fetchUserInfo = async (): Promise<UserInfoResponse> => {
  const token = localStorage.getItem('accessToken');
  const response: AxiosResponse<UserInfoResponse> = await api.get('/user/profile', { // 백엔드에서 사용자 정보 가져오는 API endpoint에 맞게 수정
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
