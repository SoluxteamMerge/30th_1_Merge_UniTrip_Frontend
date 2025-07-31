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
      Authorization: `Bearer ${token}`, 
    },
  });

  console.log("📦 스크랩한 청춘 API 응답 전체:", response); // ✅ 전체 응답
  console.log("📦 스크랩한 청춘 데이터:", response.data); // ✅ 응답 데이터 구조
  console.log("📦 스크랩한 청춘 data 배열:", response.data.data); // ✅ 실제 배열

  return response.data?.data ?? []; // 배열만 반환 (null or undefined → 빈 배열 대체)
};
