import axios, { AxiosError } from 'axios';

interface MyUserInfo {
  userName: string;          
  nickname: string;          
  phoneNumber: string;       
  userType: string;          
  emailVerified: boolean;    
  profileImageUrl: string;   
}

interface FetchUserInfoResponse {
  code: number;
  message: string;
  data: MyUserInfo;
}

export const fetchMyUserInfo = async (): Promise<MyUserInfo> => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Access token이 없습니다. 다시 로그인 해주세요.');
  }

  try {
    const response = await axios.get<FetchUserInfoResponse>('/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    } else {
      throw new Error('회원정보 조회에 실패했습니다.');
    }
  }
};
