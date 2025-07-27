import api from '../api';

export interface BookmarkReviewResponse {
  status: number;
  postId: number;
  bookmarked: boolean;
  bookmarkCount: number;
}

export const bookmarkReview = async (
  postId: number,
  accessToken: string
): Promise<BookmarkReviewResponse> => {
  const headers: Record<string, string> = {
    Authorization: accessToken
  };
  
  const response = await api.post(`/api/reviews/${postId}/bookmark`, {}, { headers });
  return response.data;
}; 