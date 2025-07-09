import axios from "axios";

export const fetchYouthTalkReviews = async () => {
  const res = await axios.get("/api/reviews");
  return res.data.reviews ?? [];
};