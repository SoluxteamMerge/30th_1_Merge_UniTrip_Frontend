import api from '../api';
import { AxiosError } from 'axios';

export interface ReviewItem {
    postId: number;
    boardType: string;
    categoryName: string;
    title: string;
    userId: number;
    nickname: string;
    createdAt: string;
    commentCount: number;
    likes: number;
    isLiked: boolean;
    scrapCount: number;
    isScraped: boolean;
    thumbnailUrl: string;
    rating: number;
}

interface GetReviewsResponse {
    total: number;
    reviews: ReviewItem[];
}

// 공통 에러 타입 정의
interface ErrorResponse {
    status: number;
    error: string;
    message: string;
}

export const fetchReviews = async (token?: string): Promise<GetReviewsResponse> => {
    try {
        const response = await api.get('/api/reviews', {
            headers: token ? { Authorization: token } : {},
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.data) {
            throw axiosError.response.data;
        } else {
            throw { message: '리뷰 조회 실패' };
        }
    }
};

