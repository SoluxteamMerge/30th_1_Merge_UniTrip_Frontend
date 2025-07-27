import api from '../api';

export interface LikeCommentResponse {
  code: number;
  message: string;
  data: {
    commentId: number;
    isLiked: boolean;
    likeCount: number;
  };
}

export const likeComment = async (
  commentId: number,
  accessToken: string
): Promise<LikeCommentResponse> => {
  const headers: Record<string, string> = {
    Authorization: accessToken
  };
  
  const response = await api.post(`/api/comments/${commentId}/like`, {}, { headers });
  return response.data;
}; 