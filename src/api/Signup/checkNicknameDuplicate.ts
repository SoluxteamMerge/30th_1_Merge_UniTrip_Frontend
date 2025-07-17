import axios, { AxiosError } from 'axios';

interface NicknameCheckResponse {
  message: string;
  data: {
    isDuplicated: boolean;
  };
}

export const checkNicknameDuplicate = async (nickname: string) => {

  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Access token이 없습니다. 다시 로그인 해주세요.');
  }

  try {
    const response = await axios.get<NicknameCheckResponse>('/api/user/check', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { nickname },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    } else {
      throw new Error('닉네임 중복 확인에 실패했습니다. 다시 시도해주세요.');
    }
  }
};
