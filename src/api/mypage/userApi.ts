//유저 정보 불러오기용 API 함수
//MyPageSidebar.tsx ← 여기서 userApi 불러서 사용자 이름/프로필 요청
// src/api/mypage/userApi.ts

import api from '../api'; // 공통 axios 인스턴스
import { AxiosResponse } from 'axios';

export interface UserInfoResponse {
  code: number;
  message: string;
  data: UserInfoData;
}

export interface UserInfoData {
  nickname: string;
  profileImageUrl?: string;
}


export const fetchUserInfo = async (): Promise<UserInfoData> => {

  const token = localStorage.getItem('accessToken');

  const response: AxiosResponse<UserInfoResponse> = await api.get('/api/user', { // API endpoint
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; //.data 안의 data를 반환
};
