// src/hooks/useMyReviews.ts
import { useEffect, useState } from "react";
import { getMyReviews } from "../mypage/userApi";

export interface MyReview {
  imageUrl: string;
  nickname: string;
  postId: number;
  postTitle: string;
  scrapCount: number;
  likeCount: number;
  rating: number;
  category_name: string;
}

export const useMyReviews = () => {
  const [reviews, setReviews] = useState<MyReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getMyReviews();
        setReviews(response.data); // 응답 구조: { code, message, data: [...] }
      } catch (err: any) {
        setError(err.response?.data?.message || "리뷰 조회 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading, error };
};
