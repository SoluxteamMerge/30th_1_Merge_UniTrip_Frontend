import api from '../api';

export interface ReviewItem {
  postId: number;
  boardType: string;
  categoryName: string;
  title: string;
  content: string;
  userId: number;
  nickname: string;
  profileImageUrl?: string; // API 응답에 추가됨
  createdAt: string;
  commentCount: number; // API 응답에 추가됨
  views: number;
  rating: number;
  likes: number;
  scraps: number; // API 응답 필드명으로 변경
  imageUrl?: string; // API 응답 필드명으로 변경
  liked: boolean; // API 응답 필드명으로 변경
  scraped: boolean; // API 응답 필드명으로 변경
  scrapCount: number; // 기존 필드명 유지 (scraps와 동일)
  isLiked: boolean; // 기존 필드명 유지 (liked와 동일)
  isScraped: boolean; // 기존 필드명 유지 (scraped와 동일)
  thumbnailUrl?: string; // 기존 필드명 유지 (imageUrl과 동일)
  // 장소정보
  placeName?: string;
  address?: string;
  kakaoId?: string;
  categoryGroupName?: string;
  region?: string;
  lat?: number;
  lng?: number;
  // 모임구인 전용 필드 (선택적)
  overnightFlag?: boolean;
  recruitmentCnt?: number;
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

// API 응답을 프론트엔드에서 사용하는 형태로 변환하는 함수
export const transformReviewData = (apiReview: any): ReviewItem => {
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

// 게시판별 리뷰 조회 함수 (새로운 API 응답 형식에 맞춤)
export const getReviewsByBoardType = async (
  boardType: string,
  accessToken?: string
): Promise<GetReviewsResponse> => {
  try {
    const headers: Record<string, string> = {};
    if (accessToken) headers.Authorization = accessToken;

    const response = await api.get(`/api/reviews?boardType=${encodeURIComponent(boardType)}`, {
      headers,
    });
    
    // API 응답을 프론트엔드 형식으로 변환
    const transformedReviews = response.data.reviews.map(transformReviewData);
    
    return {
      total: response.data.total,
      reviews: transformedReviews
    };
  } catch (error) {
    console.error('게시판별 리뷰 조회 API 호출 실패:', error);
    throw error;
  }
}; 