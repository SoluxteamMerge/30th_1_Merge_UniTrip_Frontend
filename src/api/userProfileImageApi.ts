// /api/YouthDrawer/userProfileImageApi.ts

import axios, { AxiosError } from 'axios';

// 공통 헤더 생성 함수
const getAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

// 공통 에러 핸들링 함수
const handleApiError = (error: unknown, defaultMessage: string) => {
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

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/api/user/profileImage', formData, {
      headers: {
        ...getAuthHeader(token),
        'Content-Type': 'multipart/form-data',
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
    const response = await axios.delete('/api/user/profileImage', {
      headers: getAuthHeader(token),
    });

    if (response.data.code !== 200) {
      throw new Error(response.data.message || '프로필 이미지 삭제 실패');
    }

    return response.data.message;
  } catch (error) {
    handleApiError(error, '프로필 이미지 삭제에 실패했습니다.');
  }
};
