import api from '../api';

export interface LikeReviewResponse {
  status: number;
  postId: number;
  liked: boolean;
  likeCount: number;
}

export const likeReview = async (
  postId: number,
  accessToken: string
): Promise<LikeReviewResponse> => {
  const headers: Record<string, string> = {
    Authorization: accessToken
  };
  
  const response = await api.post(`/api/reviews/${postId}/like`, {}, { headers });
  return response.data;
}; 