import axios from 'axios';

/* Presigned URL 요청 */
export const getPresignedUrl = async (fileName: string, fileType: string, token: string) => {
  const response = await axios.post(
    '/api/user/profile/upload',
    { fileName, fileType },
    { headers: { Authorization: token } }
  );
  return response.data.data;
};

/* S3 업로드 */
export const uploadFileToS3 = async (uploadUrl: string, file: File) => {
  await axios.put(uploadUrl, file, {
    headers: { 'Content-Type': file.type },
  });
};

/* 최종 URL 서버 저장 */
export const saveProfileImage = async (
  profileImageUrl: string,
  originalName: string,
  storedName: string,
  token: string
) => {
  const response = await axios.post(
    '/api/user/profile/image',
    { profileImageUrl, originalName, storedName },
    { headers: { Authorization: token } }
  );
  return response.data.data;
};

/* 전체 업로드 실행 함수 */
export const uploadUserProfileImage = async (file: File, token: string) => {
  const presigned = await getPresignedUrl(file.name, file.type, token);
  await uploadFileToS3(presigned.uploadUrl, file);
  const storedName = presigned.fileUrl.split('/').pop() || '';
  const result = await saveProfileImage(presigned.fileUrl, file.name, storedName, token);
  return result.profileImageUrl;
};

export const deleteUserProfileImage = async (
  profileImageUrl: string,
  originalName: string,
  storedName: string,
  token: string
) => {
  try {
    const response = await axios.delete('/api/user/profile/image', {
      headers: { Authorization: token },
      data: {
        profileImageUrl,
        originalName,
        storedName,
      },
    });
    return response.data;
  } catch (error) {
    console.error('프로필 이미지 삭제 실패:', error);
    throw error;
  }
};
