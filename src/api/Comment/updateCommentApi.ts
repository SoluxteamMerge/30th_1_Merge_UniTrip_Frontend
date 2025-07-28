import api from '../api';

export interface UpdateCommentRequest {
  content: string;
}

export interface UpdateCommentResponse {
  code: number;
  message: string;
  data: {
    commentId: number;
    content: string;
    updatedAt: string;
  };
}

export const updateComment = async (
  commentId: number,
  content: string,
  accessToken: string
): Promise<UpdateCommentResponse> => {
  const headers: Record<string, string> = {
    Authorization: accessToken,
    'Content-Type': 'application/json'
  };
  
  const requestBody: UpdateCommentRequest = {
    content
  };
  
  const response = await api.patch(`/api/comments/${commentId}`, requestBody, { headers });
  return response.data;
}; 