import api from './api';

export interface UserInfoResponse {
  code: number;
  message: string;
  nickname: string;
  profileImageUrl: string;
}

export const getUserInfo = async (): Promise<UserInfoResponse> => {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('Access token이 없습니다.');
    }

    const response = await api.get<UserInfoResponse>('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw error;
  }
};
