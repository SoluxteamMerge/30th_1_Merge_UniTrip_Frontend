import axios from "axios";

export const writeReview = async (data: any) => {
  return axios.post("/api/reviews", data);
}; 