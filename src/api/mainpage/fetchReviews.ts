import api from '../api';
import { AxiosError } from 'axios';

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

interface ReviewResultResponse {
  code: number;
  message: string;
  data: ReviewItem[];
}

interface ErrorResponse {
  status: number;
  error: string;
  message: string;
}

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
