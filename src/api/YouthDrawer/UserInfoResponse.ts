import axios, { AxiosError } from 'axios';

export interface MyUserInfo {
  userName: string;             // 구글에서 받아온 이름
  nickname: string;             // 닉네임
  phoneNumber: string;          // 핸드폰 번호
  userType: string;    // 유저 타입
  emailVerified: boolean;       // 학교 이메일 인증 여부
  profileImageUrl: string;      // 프로필 이미지 URL
}

interface UserInfoResponse {
  code: number;
  message: string;
  data: MyUserInfo;
}

// 사용자 정보 조회 (수정 전 보여주기 용)
export const fetchMyUserInfo = async (): Promise<MyUserInfo> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get<UserInfoResponse>('/api/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
