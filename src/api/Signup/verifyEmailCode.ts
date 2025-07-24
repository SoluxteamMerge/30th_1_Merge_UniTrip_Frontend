import api from '../api';
import { AxiosError } from 'axios';

interface VerifyEmailResponse {
  message: string;
  data: null;
}

export const verifyEmailCode = async (email: string, code: string) => {
  try {
    const response = await api.post<VerifyEmailResponse>('/api/user/email/verify', {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    } else {
      throw new Error('이메일 인증 확인 요청에 실패했습니다. 다시 시도해주세요.');
    }
  }
};
