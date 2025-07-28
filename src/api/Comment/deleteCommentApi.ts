import api from '../api';

export interface DeleteCommentResponse {
  code: number;
  message: string;
  data: null;
}

export const deleteComment = async (
  commentId: number,
  accessToken: string
): Promise<DeleteCommentResponse> => {
  const headers: Record<string, string> = {
    Authorization: accessToken
  };
  
  const response = await api.delete(`/api/comments/${commentId}`, { headers });
  return response.data;
}; 