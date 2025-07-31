import api from '../api';

export interface UpdateReviewRequest {
  boardType?: string;
  categoryName?: string;
  title?: string;
  content?: string; // HTML 문자열
  scheduleDate?: string;
  imageUrl?: string;
  placeName?: string;
  address?: string;
  kakaoId?: string;
  categoryGroupName?: string;
  region?: string;
  lat?: number;
  lng?: number;
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
  console.log('updateReview API 호출:', {
    url: `/api/reviews/${postId}`,
    data: review,
    hasToken: !!accessToken
  });
  
  const response = await api.patch(`/api/reviews/${postId}`, review, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
  });
  
  console.log('updateReview API 응답:', response.data);
  return response.data;
}; 