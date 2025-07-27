import api from '../api';

export interface ReviewRequest {
  boardType: string;
  categoryName: string;
  title: string;
  content: string; // HTML 문자열
  placeName: string;
  address: string;
  kakaoId: string;
  categoryGroupName: string;
  region: string;
  overnightFlag?: boolean;
  recruitmentCnt?: number;
  imageUrl?: Record<string, any>;
}

export interface ReviewResponse {
  status: number;
  postId: number;
  message: string;
}

export const postReview = async (
  review: ReviewRequest,
  images: File[],
  accessToken: string
): Promise<ReviewResponse> => {
  const formData = new FormData();
  // JSON 객체를 문자열로 변환 후 Blob으로 감싸서 "request"라는 key로 추가
  const jsonBlob = new Blob([JSON.stringify(review)], { type: 'application/json' });
  formData.append('request', jsonBlob);
  // 이미지 파일 추가
  images.forEach((file) => formData.append('images', file));

  const response = await api.post('/api/reviews', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: accessToken, // Bearer X
    },
  });
  return response.data;
}; 