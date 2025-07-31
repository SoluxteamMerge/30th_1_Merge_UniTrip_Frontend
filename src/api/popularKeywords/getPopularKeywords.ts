// src/api/popularKeywords/getPopularKeywords.ts

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getPopularKeywords = async (limit: number = 10) => {
  const url = `${BASE_URL}/api/keywords/popular?limit=${limit}`;
  console.log("✅ [GET] 호출 주소:", url);
  try {
    const response = await axios.get(url, {params: { limit },});

    console.log("✅ [GET] 응답 결과:", response.data);

    if (response.data.code === 200) {
      return response.data.data; // keyword, rank, searchCount 포함된 배열
    } else {
      throw new Error(response.data.message || "인기 키워드 조회 실패");
    }
  } catch (error: any) {
    console.error("인기 키워드 API 호출 오류:", error);
    throw new Error(
      error?.response?.data?.message || "인기 키워드 불러오기 실패"
    );
  }
};
