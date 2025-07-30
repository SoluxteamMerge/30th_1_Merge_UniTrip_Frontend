// src/api/search/searchReviews.ts
//일반 검색 + 인기 키워드 검색
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const response = await axios.get(`${BASE_URL}/api/posts/search`, {
    params: { keyword, sort },
    headers: { Authorization: token },
  });
  console.log("📦 [searchReviews] 전체 response:", response);
  return response.data;
};
