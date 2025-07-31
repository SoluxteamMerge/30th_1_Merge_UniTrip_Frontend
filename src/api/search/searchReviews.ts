// src/api/search/searchReviews.ts
//일반 검색 + 인기 키워드 검색
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export interface SearchReviewResponse {
  code: number;
  message: string;
  data: SearchReview[];
}

// searchReview 타입 정의
export interface SearchReview {
  imageUrl: string;
  nickname: string;
  postId: number;
  postTitle: string;
  scrapCount: number;
  likeCount: number;
  rating: number;
  categoryName: string;
}

export const searchReviews = async (
  keyword: string,
  token: string,
  sort: string = "popular" // 기본 정렬: 인기순
): Promise<SearchReviewResponse> => {

  try {
    console.log("🌐 요청 보낼 URL:", `${BASE_URL}/api/reviews/search`);
    console.log("📨 요청 파라미터:", { keyword, sort });
    console.log("🔐 요청 헤더:", { Authorization: `Bearer ${token}` });

    const response = await axios.get(`${BASE_URL}/api/reviews/search`, {
      params: { keyword, sort },
      headers: { Authorization: `Bearer ${token}` }
    });

  console.log("📦 [searchReviews] 전체 response:", response);
  return response.data;
  } catch (err: any) {
    console.error("❗ searchReviews 내부 에러:", err);
    throw err; // 반드시 다시 throw 해서 외부에서도 catch 되게 하기
  }
};
