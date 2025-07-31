// src/api/mainpage/getRecommendedReview.ts

// ✅ 타입 정의 추가
export interface RecommendedReviewResponse {
  postId: number;
  title: string;
  content: string;
  thumbnailUrl: string;
}



// 실제 서버 연동 시에는 아래 코드로 교체
 import api from '../api';
 export const fetchRecommendedReview = async (): Promise<RecommendedReviewResponse> => {
  const response = await api.get('/api/reviews/recommend');
  return response.data;
 };
