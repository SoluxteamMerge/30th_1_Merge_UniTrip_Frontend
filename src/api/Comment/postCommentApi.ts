import api from '../api';

export interface PostCommentRequest {
  postId: number;
  content: string;
}

export interface PostCommentResponse {
  code: number;
  message: string;
  data: {
    commentId: number;
    postId: number;
    content: string;
    author: string;
    createdAt: string;
  };
}

export const postComment = async (
  postId: number,
  content: string,
  accessToken: string
): Promise<PostCommentResponse> => {
  const headers: Record<string, string> = {
    Authorization: accessToken,
    'Content-Type': 'application/json'
  };
  
  const requestBody: PostCommentRequest = {
    postId,
    content
  };
  
  const response = await api.post('/api/comments', requestBody, { headers });
  return response.data;
}; 