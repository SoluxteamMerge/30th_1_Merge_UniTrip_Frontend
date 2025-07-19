// src/api/YouthDrawer/updateMyUserInfo.ts

import axios, { AxiosError } from 'axios';

interface UpdateUserInfoParams {
  nickname: string;
  phoneNumber: string;
  userType: string;
  emailVerified: boolean;
}

interface UpdateUserInfoResponse {
  code: number;
  message: string;
  data: Record<string, never>;
}

export const updateMyUserInfo = async (params: UpdateUserInfoParams) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.put<UpdateUserInfoResponse>('/api/user', params, {
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
