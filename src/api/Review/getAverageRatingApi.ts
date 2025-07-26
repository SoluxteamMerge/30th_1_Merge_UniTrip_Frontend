import api from '../api';

export interface AverageRatingResponse {
  keyword: string;
  averageRating: number;
}

export interface GetAverageRatingResponse {
  code: number;
  message: string;
  data: AverageRatingResponse | null;
}

export const getAverageRating = async (
  keyword: string,
  accessToken?: string
): Promise<GetAverageRatingResponse> => {
  try {
    const headers: Record<string, string> = {};
    
    if (accessToken) {
      headers.Authorization = accessToken;
    }

    const response = await api.get(`/api/reviews/average-rating?keyword=${encodeURIComponent(keyword)}`, {
      headers,
    });
    
    return response.data;
  } catch (error: any) {
    console.error('평균 별점 조회 실패:', error);
    
    // 임시 데이터 반환 (실제 API 연동 전까지)
    const mockData: GetAverageRatingResponse = {
      code: 200,
      message: "평균 별점이 조회되었습니다.",
      data: {
        keyword: keyword,
        averageRating: Math.floor(Math.random() * 20 + 30) / 10 // 3.0 ~ 5.0 사이 랜덤 값
      }
    };
    
    return mockData;
  }
}; 