// src/api/popularKeywords/getPopularKeywords.ts

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getPopularKeywords = async (limit: number = 10) => {
  //console.log("!!호출 주소:", `${BASE_URL}/api/keywords/popular?limit=${limit}`);
  try {
    const response = await axios.get(`${BASE_URL}/api/keywords/popular`, {
      params: { limit },
    });

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
