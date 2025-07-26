import api from '../api';

export interface ReviewItem {
  postId: number;
  boardType: string;
  categoryName: string;
  overnightFlag?: boolean;
  recruitmentCnt?: number;
  title: string;
  content: string;
  userId: number;
  nickname: string;
  createdAt: string;
  views: number;
  likes: number;
  isLiked: boolean;
  rating: number;
  scrapCount: number; // 추가
  isScraped: boolean; // 추가
  thumbnailUrl: string; // 추가
}

export interface GetReviewsResponse {
  total: number;
  reviews: ReviewItem[];
}

// 임시 테스트 데이터
const mockReviews: Record<string, ReviewItem[]> = {
  "MT/LT": [
    {
      postId: 1,
      boardType: "MT/LT",
      categoryName: "MT여정지도",
      title: "가평 대성리 MT 후기",
      content: "정말 좋은 MT였습니다! 숙소도 깔끔하고 음식도 맛있었어요.",
      userId: 1,
      nickname: "김눈송",
      createdAt: "2024-01-15T10:30:00Z",
      views: 150,
      likes: 25,
      isLiked: false,
      rating: 4.5,
      scrapCount: 3,
      isScraped: false,
      thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
      postId: 2,
      boardType: "MT/LT",
      categoryName: "MT여정지도", 
      title: "제주도 MT 여행기",
      content: "제주도에서 3박4일 MT를 다녀왔습니다. 정말 아름다웠어요!",
      userId: 2,
      nickname: "이여행",
      createdAt: "2024-01-14T14:20:00Z",
      views: 89,
      likes: 12,
      isLiked: true,
      rating: 5.0,
      scrapCount: 1,
      isScraped: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
    }
  ],
  "동행모집": [
    {
      postId: 3,
      boardType: "동행모집",
      categoryName: "함께해요-동행구해요",
      title: "서울-부산 동행 구합니다",
      content: "이번 주말에 부산으로 가실 분 있나요? 같이 가요!",
      userId: 3,
      nickname: "박동행",
      createdAt: "2024-01-15T09:15:00Z",
      views: 67,
      likes: 8,
      isLiked: false,
      rating: 0,
      scrapCount: 0,
      isScraped: false,
      thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    }
  ],
  "모임구인": [
    {
      postId: 4,
      boardType: "모임구인",
      categoryName: "함께해요-번개모임",
      title: "주말 등산 모임",
      content: "이번 주말에 북한산 등산하실 분 모집합니다!",
      userId: 4,
      nickname: "산사랑",
      createdAt: "2024-01-15T11:45:00Z",
      views: 45,
      likes: 15,
      isLiked: true,
      rating: 0,
      scrapCount: 2,
      isScraped: false,
      thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    }
  ],
  "졸업/휴학여행": [
    {
      postId: 5,
      boardType: "졸업/휴학여행",
      categoryName: "함께해요-졸업/휴학여행",
      title: "유럽 졸업여행 후기",
      content: "3주간 유럽을 돌아다녔습니다. 정말 잊을 수 없는 여행이었어요!",
      userId: 5,
      nickname: "유럽여행자",
      createdAt: "2024-01-13T16:30:00Z",
      views: 234,
      likes: 45,
      isLiked: false,
      rating: 5.0,
      scrapCount: 5,
      isScraped: false,
      thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    }
  ],
  "국내학점교류": [
    {
      postId: 6,
      boardType: "국내학점교류",
      categoryName: "함께해요-국내학점교류",
      title: "서울대 교환학생 경험담",
      content: "1학기 동안 서울대에서 교환학생을 했습니다. 정말 좋은 경험이었어요!",
      userId: 6,
      nickname: "교환학생",
      createdAt: "2024-01-12T13:20:00Z",
      views: 178,
      likes: 32,
      isLiked: true,
      rating: 4.5,
      scrapCount: 4,
      isScraped: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    }
  ],
  "해외교환": [
    {
      postId: 7,
      boardType: "해외교환",
      categoryName: "함께해요-해외교환학생",
      title: "미국 교환학생 후기",
      content: "1년간 미국에서 교환학생을 했습니다. 영어 실력도 많이 늘었고 좋은 친구들도 많이 사귀었어요!",
      userId: 7,
      nickname: "미국교환생",
      createdAt: "2024-01-11T10:10:00Z",
      views: 312,
      likes: 67,
      isLiked: false,
      rating: 5.0,
      scrapCount: 7,
      isScraped: false,
      thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    }
  ]
};

export const getReviews = async (
  boardType: string,
  accessToken?: string,
  useMockData: boolean = false // 임시 데이터 사용 여부
): Promise<GetReviewsResponse> => {
  // 임시 데이터 사용 시
  if (useMockData) {
    const mockData = mockReviews[boardType] || [];
    return {
      total: mockData.length,
      reviews: mockData
    };
  }

  // 실제 API 호출
  try {
    const headers: Record<string, string> = {};
    
    if (accessToken) {
      headers.Authorization = accessToken;
    }

    const response = await api.get(`/api/reviews?boardType=${encodeURIComponent(boardType)}`, {
      headers,
    });
    
    return response.data;
  } catch (error) {
    console.error('API 호출 실패, 임시 데이터 사용:', error);
    // API 실패 시 임시 데이터 반환
    const mockData = mockReviews[boardType] || [];
    return {
      total: mockData.length,
      reviews: mockData
    };
  }
};

// 전체 조회 (청춘톡 등)
export const getAllReviews = async (
  accessToken?: string
): Promise<GetReviewsResponse> => {
  try {
    const headers: Record<string, string> = {};
    if (accessToken) headers.Authorization = accessToken;
    const response = await api.get('/api/reviews', { headers });
    return response.data;
  } catch (error) {
    console.error('전체 리뷰 API 호출 실패, 임시 데이터 사용:', error);
    // API 실패 시 모든 mock 데이터를 합쳐서 반환
    const allMockData: ReviewItem[] = [];
    Object.values(mockReviews).forEach(reviews => {
      allMockData.push(...reviews);
    });
    return {
      total: allMockData.length,
      reviews: allMockData
    };
  }
}; 