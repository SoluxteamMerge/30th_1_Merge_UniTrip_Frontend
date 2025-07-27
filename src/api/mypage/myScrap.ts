import api from '../api';
import { AxiosResponse } from 'axios';

// 스크랩한 리뷰 항목 타입 정의
export interface MyScrap {
  imageUrl: string;
  nickname: string;
  postId: number;
  postTitle: string;
  scrapCount: number;
  likeCount: number;
  rating: number;
  categoryName: string;
  isLiked: boolean;      // 추가
}

// 서버 응답 타입 정의
export interface MyScrapResponse {
  code: number;
  message: string;
  data: MyScrap[];
}

// 스크랩한 리뷰 목록 불러오는 함수
export const fetchMyScraps = async (): Promise<MyScrap[]> => {
  const token = localStorage.getItem('accessToken');

  const response: AxiosResponse<MyScrapResponse> = await api.get('/api/user/scraps', {
    headers: {
      Authorization: token,
    },
  });

  return response.data.data; // 배열만 반환
};
