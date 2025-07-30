import api from '../api';

export interface ReviewItem {
  postId: number;
  boardType: string;
  categoryName: string;
  overnightFlag?: boolean;
  recruitmentCnt?: number;
  title: string;
  content: string;
  userId: number;
  nickname: string;
  createdAt: string;
  views: number;
  likes: number;
  isLiked: boolean;
  rating: number;
  scrapCount: number;
  isScraped: boolean;
  thumbnailUrl: string;
  // 장소정보 추가
  placeName?: string; // 카카오 제공
  address?: string; // 카카오 제공
  kakaoId?: string; // 카카오 제공
  categoryGroupName?: string; // 카카오 제공
  region?: string; // 카카오 제공
  lat?: number; // 위도
  lng?: number; // 경도
}

export interface GetReviewsResponse {
  total: number;
  reviews: ReviewItem[];
}

export const getReviews = async (
  boardType: string,
  accessToken?: string
): Promise<GetReviewsResponse> => {
  try {
    const headers: Record<string, string> = {};
    
    if (accessToken) {
      headers.Authorization = accessToken;
    }

    const response = await api.get(`/api/reviews?boardType=${encodeURIComponent(boardType)}`, {
      headers,
    });
    
    return response.data;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};

// 전체 조회 (청춘톡 등)
export const getAllReviews = async (
  accessToken?: string
): Promise<GetReviewsResponse> => {
  try {
    const headers: Record<string, string> = {};
    if (accessToken) headers.Authorization = accessToken;
    const response = await api.get('/api/reviews', { headers });
    return response.data;
  } catch (error) {
    console.error('전체 리뷰 API 호출 실패:', error);
    throw error;
  }
};

// 리뷰 상세 조회
export interface ReviewDetailResponse {
  postId: number;
  boardType: string;
  categoryName: string;
  title: string;
  content: string; // HTML 문자열
  userId: number;
  nickname: string;
  createdAt: string;
  views: number;
  rating: number;
  likes: number;
  isLiked: boolean;
  bookmarkCount?: number; // 북마크 개수
  overnightFlag?: boolean; // 모임구인만
  recruitmentCnt?: number; // 모임구인만
  // 장소정보 추가
  placeName?: string; // 카카오 제공
  address?: string; // 카카오 제공
  kakaoId?: string; // 카카오 제공
  categoryGroupName?: string; // 카카오 제공
  region?: string; // 카카오 제공
  lat?: number; // 위도
  lng?: number; // 경도
}

export const getReviewDetail = async (
  postId: number,
  accessToken?: string
): Promise<ReviewDetailResponse> => {
  try {
    const headers: Record<string, string> = {};
    if (accessToken) headers.Authorization = accessToken;
    
    const response = await api.get(`/api/reviews/${postId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('리뷰 상세 조회 API 호출 실패:', error);
    throw error;
  }
}; 