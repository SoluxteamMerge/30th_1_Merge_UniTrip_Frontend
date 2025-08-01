import api from '../api';

export const deleteReview = async (
  postId: number,
  accessToken: string
): Promise<void> => {
  const response = await api.delete(`/api/reviews/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}; 