// api/userProfileImageApi.ts
import axios, { AxiosError } from 'axios';

// 유틸 함수 - 인증 헤더
const getAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

// Error 핸들링 유틸
const handleApiError = (error: unknown, defaultMessage: string) => {
  const axiosError = error as AxiosError<{ message: string }>;
  if (axiosError.response?.data?.message) {
    throw new Error(axiosError.response.data.message);
  } else {
    throw new Error(defaultMessage);
  }
};

/* Presigned URL 요청 */
export const getPresignedUrl = async (fileName: string, fileType: string, token: string) => {
  if (!token) throw new Error('토큰이 없습니다');
  try {
    const response = await axios.post(
      '/api/user/profile/upload',
      { fileName, fileType },
      { headers: getAuthHeader(token) }
    );
    if (response.data.code !== 200) throw new Error(response.data.message);
    return response.data.data;
  } catch (error) {
    handleApiError(error, 'Presigned URL 요청 실패');
  }
};

/* S3 업로드 */
export const uploadFileToS3 = async (uploadUrl: string, file: File) => {
  try {
    const response = await axios.put(uploadUrl, file, {
      headers: { 'Content-Type': file.type },
    });
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error('S3 업로드 실패');
    }
  } catch (error) {
    handleApiError(error, 'S3 업로드 실패');
  }
};

/* 최종 URL 서버 저장 */
export const saveProfileImage = async (
  profileImageUrl: string,
  originalName: string,
  storedName: string,
  token: string
) => {
  if (!token) throw new Error('토큰이 없습니다');
  try {
    const response = await axios.post(
      '/api/user/profile/image',
      { profileImageUrl, originalName, storedName },
      { headers: getAuthHeader(token) }
    );
    if (response.data.code !== 200) throw new Error(response.data.message);
    return response.data.data;
  } catch (error) {
    handleApiError(error, '프로필 이미지 등록 실패');
  }
};

/* 전체 업로드 실행 함수 */
export const uploadUserProfileImage = async (file: File, token: string) => {
  if (!token) throw new Error('토큰이 없습니다');
  try {
    const presigned = await getPresignedUrl(file.name, file.type, token);
    await uploadFileToS3(presigned.uploadUrl, file);
    const storedName = presigned.fileUrl.split('/').pop() || '';
    const result = await saveProfileImage(presigned.fileUrl, file.name, storedName, token);
    return result.profileImageUrl;
  } catch (error) {
    handleApiError(error, '프로필 이미지 전체 업로드 실패');
  }
};

/* 이미지 삭제 */
export const deleteUserProfileImage = async (
  profileImageUrl: string,
  originalName: string,
  storedName: string,
  token: string
) => {
  if (!token) throw new Error('토큰이 없습니다');
  try {
    const response = await axios.delete('/api/user/profile/image', {
      headers: getAuthHeader(token),
      data: { profileImageUrl, originalName, storedName },
    });
    if (response.data.code !== 200) throw new Error(response.data.message);
    return response.data;
  } catch (error) {
    handleApiError(error, '프로필 이미지 삭제 실패');
  }
};
