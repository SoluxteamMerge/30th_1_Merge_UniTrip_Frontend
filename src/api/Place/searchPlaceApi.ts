import api from '../api';

export interface PlaceItem {
  placeName: string;
  address: string;
  kakaoId: string;
  categoryGroupName: string;
  region: string;
}

export interface SearchPlaceResponse {
  code: number;
  message: string;
  data: PlaceItem[];
}

export const searchPlace = async (
  query: string
): Promise<SearchPlaceResponse> => {
  const params = new URLSearchParams({
    query: query
  });
  
  const response = await api.get(`/api/place?${params}`);
  return response.data;
}; 