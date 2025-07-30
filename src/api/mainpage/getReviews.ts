import api from '../api';
import { AxiosError } from 'axios';

export interface ReviewItem {
    postId: number;
    boardType: string;
    categoryName: string;
    title: string;
    userId: number;
    nickname: string;
    profileImageUrl?: string;
    createdAt: string;
    commentCount: number;
    views: number;
    rating: number;
    likes: number;
    scraps: number;
    imageUrl?: string;
    liked: boolean;
    scraped: boolean;
    scrapCount: number;
    isLiked: boolean;
    isScraped: boolean;
    thumbnailUrl?: string;
    // 장소정보
    placeName?: string;
    address?: string;
    kakaoId?: string;
    categoryGroupName?: string;
    region?: string;
    lat?: number;
    lng?: number;
    // 모임구인 전용 필드
    overnightFlag?: boolean;
    recruitmentCnt?: number;
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

// API 응답을 프론트엔드에서 사용하는 형태로 변환하는 함수
const transformReviewData = (apiReview: any): ReviewItem => {
    return {
        ...apiReview,
        // 필드명 매핑
        scrapCount: apiReview.scraps || 0,
        isLiked: apiReview.liked || false,
        isScraped: apiReview.scraped || false,
        thumbnailUrl: apiReview.imageUrl || '',
        // 기본값 설정
        profileImageUrl: apiReview.profileImageUrl || null,
        commentCount: apiReview.commentCount || 0,
        views: apiReview.views || 0,
        rating: apiReview.rating || 0,
        likes: apiReview.likes || 0,
        scraps: apiReview.scraps || 0,
        imageUrl: apiReview.imageUrl || null,
        liked: apiReview.liked || false,
        scraped: apiReview.scraped || false,
        // 장소 정보
        placeName: apiReview.placeName || '',
        address: apiReview.address || '',
        kakaoId: apiReview.kakaoId || '',
        categoryGroupName: apiReview.categoryGroupName || '',
        region: apiReview.region || '',
        lat: apiReview.lat || 0,
        lng: apiReview.lng || 0,
        // 모임구인 전용 필드
        overnightFlag: apiReview.overnightFlag || null,
        recruitmentCnt: apiReview.recruitmentCnt || null,
    };
};

export const fetchReviews = async (token?: string): Promise<GetReviewsResponse> => {
    try {
        const response = await api.get('/api/reviews', {
            headers: token ? { Authorization: token } : {},
        });
        
        // API 응답을 프론트엔드 형식으로 변환
        const transformedReviews = response.data.reviews.map(transformReviewData);
        
        return {
            total: response.data.total,
            reviews: transformedReviews
        };
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.data) {
            throw axiosError.response.data;
        } else {
            throw { message: '리뷰 조회 실패' };
        }
    }
};
