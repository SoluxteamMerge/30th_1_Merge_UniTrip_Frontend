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
  rating?: number; // 별점 필드 추가
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
  
  // FormData를 사용하여 boardRequest 파트로 데이터 전송
  const formData = new FormData();
  const boardRequest = new Blob([JSON.stringify(review)], {
    type: 'application/json'
  });
  formData.append('boardRequest', boardRequest);
  
  const response = await api.patch(`/api/reviews/${postId}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // Content-Type은 자동으로 설정되도록 제거
    },
  });
  
  console.log('updateReview API 응답:', response.data);
  return response.data;
}; 