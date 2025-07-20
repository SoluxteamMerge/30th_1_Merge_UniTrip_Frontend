import axios from 'axios';

export interface RecommendedReviewResponse {
  postId: number;
  title: string;
  content: string;
  thumbnailUrl: string;
}

export const fetchRecommendedReview = async (): Promise<RecommendedReviewResponse> => {
  const response = await axios.get('/api/reviews/recommend');
  return response.data;
};
