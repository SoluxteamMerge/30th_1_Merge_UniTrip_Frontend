// src/api/getReviewByKeyword.ts
import axios from "axios";

export const getReviewByKeyword = async (keyword: string, token: string) => {
  const response = await axios.get(`/api/post/search?keyword=${encodeURIComponent(keyword)}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
