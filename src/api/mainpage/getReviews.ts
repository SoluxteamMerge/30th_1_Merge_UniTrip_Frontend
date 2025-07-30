// src/api/fetchReviews.ts

import api from '../api';
import { AxiosError } from 'axios';

// 백엔드에서 내려주는 응답 구조에 맞춘 타입
export interface ReviewItem {
  postId: number;
  postTitle: string;
  imageUrl: string | null;
  nickname: string;
  rating: number;
  likeCount: number;
  scrapCount: number;
  categoryName: string;
}

// 백엔드 응답 구조
interface ReviewResultResponse {
  code: number;
  message: string;
  data: ReviewItem[]; // 배열로 감싸짐
}

// 공통 에러 타입 정의
interface ErrorResponse {
  status: number;
  error: string;
  message: string;
}

// 함수 내 응답도 data.data에서 꺼냄
export const fetchReviews = async (token?: string): Promise<ReviewItem[]> => {
  try {
    const response = await api.get<ReviewResultResponse>('/api/reviews', {
      headers: token ? { Authorization: token } : {},
    });
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.data) {
      throw axiosError.response.data;
    } else {
      throw { message: '리뷰 조회 실패' };
    }
  }
};

