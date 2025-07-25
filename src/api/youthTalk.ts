import api from "./api";

export const fetchYouthTalkReviews = async () => {
  const res = await api.get("/api/reviews");
  return res.data.reviews ?? [];
};