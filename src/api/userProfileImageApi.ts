// /api/YouthDrawer/userProfileImageApi.ts

import api from './api';
import { AxiosError } from 'axios';

// 공통 헤더 생성 함수
const getAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

// 공통 에러 처리 함수
const handleApiError = (error: unknown, defaultMessage: string): never => {
  const axiosError = error as AxiosError<{ message: string }>;
  if (axiosError.response?.data?.message) {
    throw new Error(axiosError.response.data.message);
  } else {
    throw new Error(defaultMessage);
  }
};

/* 프로필 이미지 업로드 */
export const uploadUserProfileImage = async (file: File, token: string) => {
  if (!token) throw new Error('토큰이 없습니다.');
  console.log('🔍 전달된 file:', file);
  console.log('📎 file name:', file.name);
  console.log('📎 file type:', file.type);

  try {
    const formData = new FormData();
    formData.append('image', file);

    // formData에 잘 들어갔는지 확인 로그
    for (const pair of formData.entries()) {
      console.log('formData key:', pair[0], 'value:', pair[1]);
    }

    const response = await api.post('/api/user/profileImage', formData, {
      headers: {
        Authorization: `Bearer ${token}`, // 인증 헤더만 넣기
        // Content-Type은 지정하지 마세요 (자동 설정)
      },
    });

    if (response.data.code !== 200) {
      throw new Error(response.data.message || '프로필 이미지 업로드 실패');
    }

    return response.data.data.imageUrl;
  } catch (error) {
    handleApiError(error, '프로필 이미지 업로드에 실패했습니다.');
  }
};

/* 프로필 이미지 삭제 */
export const deleteUserProfileImage = async (token: string) => {
  if (!token) throw new Error('토큰이 없습니다.');

  try {
    const response = await api.delete('/api/user/profileImage', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.data.code !== 200) {
      throw new Error(response.data.message || '프로필 이미지 삭제 실패');
    }

    return response.data.message;
  } catch (error) {
    handleApiError(error, '프로필 이미지 삭제에 실패했습니다.');
  }
};

