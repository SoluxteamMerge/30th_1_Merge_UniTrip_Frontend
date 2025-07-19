import axios from 'axios';

export interface ToggleScrapResponse {
  status: number;
  postId: number;
  scraped: boolean;
  scrapCount: number;
}

export const toggleScrap = async (postId: number, token: string): Promise<ToggleScrapResponse> => {
  const response = await axios.post(`/api/scraps/${postId}`, {}, {
    headers: { Authorization: token },
  });
  return response.data;
};
