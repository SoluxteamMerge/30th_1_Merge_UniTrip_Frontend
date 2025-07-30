import api from '../api';

export interface DeleteReviewResponse {
  status: number;
  message: string;
}

export const deleteReview = async (
  postId: number,
  accessToken: string
): Promise<DeleteReviewResponse> => {
  const response = await api.delete(`/api/reviews/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}; 