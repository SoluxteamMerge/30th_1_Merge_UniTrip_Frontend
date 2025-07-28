// src/api/search/searchReviews.ts
//일반 검색 + 인기 키워드 검색
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const searchReviews = async (
  keyword: string,
  token: string,
  sort: string = "popular" // 기본 정렬: 인기순
) => {
  const response = await axios.get(`${BASE_URL}/api/posts/search`, {
    params: {
      keyword,
      sort,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
