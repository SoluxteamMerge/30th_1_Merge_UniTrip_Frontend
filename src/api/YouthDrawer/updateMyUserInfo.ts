// src/api/YouthDrawer/updateMyUserInfo.ts

import api from '../api';
import { AxiosError } from 'axios';

interface UpdateUserInfoParams {
  userName: string;
  nickname: string;
  phoneNumber: string;
  userType: string;
  emailVerified: boolean;
  profileImageUrl: string;
}

interface UpdateUserInfoResponse {
  code: number;
  message: string;
  data: Record<string, never>;
}

export const updateMyUserInfo = async (params: UpdateUserInfoParams) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) throw new Error('Access token이 없습니다. 다시 로그인 해주세요.');

    const response = await api.patch<UpdateUserInfoResponse>('/api/user/modify', params, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    } else {
      throw new Error('회원정보 수정에 실패했습니다.');
    }
  }
};