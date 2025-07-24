import api from '../api';

export interface ToggleLikeResponse {
  status: number;
  postId: number;
  liked: boolean;
  likeCount: number;
}

export const toggleLike = async (postId: number, token: string): Promise<ToggleLikeResponse> => {
  const response = await api.post(`/api/likes/${postId}`, {}, {
    headers: { Authorization: token },
  });
  return response.data;
};
