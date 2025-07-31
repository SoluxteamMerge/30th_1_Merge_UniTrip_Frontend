import axios from "axios";


// 지역별 게시글 타입 정의
export interface RegionPost {
  imageUrl: string;
  nickname: string;
  postId: number;
  postTitle: string;
  scrapCount: number;
  likeCount: number;
  rating: number;
  categoryName: string;
}

// 응답 타입 정의
export interface RegionPostResponse {
  code: number;
  message: string;
  data: RegionPost[];
}

export const getPlaceByRegion = async (
  region: string, 
  token: string
) : Promise<RegionPostResponse> => {
  const url = region ? `/api/reviews/filter?region=${region}` : `/api/reviews/filter`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
