import api from '../api';

export interface RatingRequest {
  rating: number;
}

export interface RatingResponse {
  code: number;
  message: string;
  data: {
    postId: number;
    rating: number | null;
    isRated: boolean;
  };
}

export const rateReview = async (
  postId: number,
  rating: number,
  accessToken: string
): Promise<RatingResponse> => {
  const headers: Record<string, string> = {
    Authorization: accessToken,
    'Content-Type': 'application/json'
  };
  
  const requestBody: RatingRequest = {
    rating
  };
  
  const response = await api.post(`/api/reviews/${postId}/rating`, requestBody, { headers });
  return response.data;
}; 