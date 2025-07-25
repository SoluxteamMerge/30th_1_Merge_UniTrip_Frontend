import api from '../api';

export interface RecommendedReviewResponse {
  postId: number;
  title: string;
  content: string;
  thumbnailUrl: string;
}

export const fetchRecommendedReview = async (): Promise<RecommendedReviewResponse> => {
  const response = await api.get('/api/reviews/recommend');
  return response.data;
};
