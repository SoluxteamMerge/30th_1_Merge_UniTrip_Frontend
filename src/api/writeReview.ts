import api from "./api";
 
export const writeReview = async (data: any) => {
  return api.post("/api/reviews", data);
}; 