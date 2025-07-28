import api from '../api';

export interface CommentItem {
  commentId: number;
  postId: number;
  content: string;
  author: string;
  createdAt: string;
  likeCount: number;
}

export interface GetCommentsResponse {
  code: number;
  message: string;
  data: {
    content: CommentItem[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export const getComments = async (
  postId: number,
  page: number = 0,
  size: number = 10
): Promise<GetCommentsResponse> => {
  const params = new URLSearchParams({
    postId: postId.toString(),
    page: page.toString(),
    size: size.toString()
  });
  
  const response = await api.get(`/api/comments?${params}`);
  return response.data;
}; 