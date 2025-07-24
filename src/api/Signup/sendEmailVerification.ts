import api from '../api';
import { AxiosError } from 'axios';

interface EmailVerificationResponse {
  message: string;
  data: null;
}

export const sendEmailVerification = async (email: string) => {
  try {
    const response = await api.post<EmailVerificationResponse>('/api/user/email', {
      email,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    } else {
      throw new Error('이메일 인증 요청에 실패했습니다. 다시 시도해주세요.');
    }
  }
};
