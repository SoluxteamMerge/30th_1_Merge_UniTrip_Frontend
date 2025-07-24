import api from '../api';

export interface ToggleScrapResponse {
  status: number;
  postId: number;
  scraped: boolean;
  scrapCount: number;
}

export const toggleScrap = async (postId: number, token: string): Promise<ToggleScrapResponse> => {
  const response = await api.post(`/api/scraps/${postId}`, {}, {
    headers: { Authorization: token },
  });
  return response.data;
};
