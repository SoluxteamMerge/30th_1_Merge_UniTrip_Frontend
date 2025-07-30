import api from '../api';
import { AxiosError } from 'axios';

interface UserProfileData {
  nickname: string;
  phoneNumber: string;
  userType: string;
  emailVerified: boolean;
  profileImageUrl: string | null;
}

interface ErrorResponseData {
  message: string;
}

export const postUserProfile = async (data: UserProfileData) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Access token이 없습니다. 다시 로그인 해주세요.');
  }

  try {
    const response = await api.post('/api/user/profile', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponseData>;

    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    } else {
      throw new Error('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }
};

