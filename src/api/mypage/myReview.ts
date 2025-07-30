// src/api/mypage/myReview.ts

import api from '../api'; // 공통 axios 인스턴스
import { AxiosResponse } from 'axios';

export interface MyReview {
  imageUrl: string;
  nickname: string;
  postId: number;
  postTitle: string;
  scrapCount: number;
  likeCount: number;
  rating: number;
  categoryName: string;
}

export interface MyReviewResponse {
  code: number;
  message: string;
  data: MyReview[];
}

export const fetchMyReviews = async (): Promise<MyReview[]> => {
  const token = localStorage.getItem('accessToken');

  const response: AxiosResponse<MyReviewResponse> = await api.get('/api/user/reviews', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data; // 배열 형태 반환
};
