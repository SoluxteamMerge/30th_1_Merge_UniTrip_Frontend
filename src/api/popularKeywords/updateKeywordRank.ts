// src/api/popularKeywords/updateKeywordRank.ts

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const updateKeywordRank = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/keywords/rank`);
    
    if (response.data.code === 200) {
      return response.data.message; // "인기 키워드 랭킹이 성공적으로 갱신되었습니다."
    } else {
      throw new Error(response.data.message || "인기 키워드 랭킹 갱신 실패");
    }
  } catch (error: any) {
    console.error("인기 키워드 랭킹 갱신 실패:", error);
    throw new Error(
      error?.response?.data?.message || "서버 오류로 갱신에 실패했습니다."
    );
  }
};
