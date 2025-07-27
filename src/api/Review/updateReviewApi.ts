import api from '../api';

export interface UpdateReviewRequest {
  boardType?: string;
  categoryName?: string;
  title?: string;
  content?: string; // HTML 문자열
  overnightFlag?: boolean;
  recruitmentCnt?: number;
}

export interface UpdateReviewResponse {
  status: number;
  postId: number;
  message: string;
}

export const updateReview = async (
  postId: number,
  review: UpdateReviewRequest,
  accessToken: string
): Promise<UpdateReviewResponse> => {
  const response = await api.patch(`/api/reviews/${postId}`, review, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken, // Bearer X
    },
  });
  return response.data;
}; 