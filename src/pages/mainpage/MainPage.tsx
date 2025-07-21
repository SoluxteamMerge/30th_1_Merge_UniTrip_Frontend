import React, { useState, useEffect } from 'react';
import RouletteModal from "../roulette/RouletteModal";
import '../../App.css';
import { ReviewCard } from '../../pages/reviewcard/ReviewCard';
import Header from '../../components/Header/Header';
import './MainPage.css';
import searchIcon from '../../assets/search_icon.svg';
import { useNavigate } from "react-router-dom";
import { fetchReviews } from '../../api/mainpage/getReviews'; 
import { fetchRecommendedReview } from '../../api/mainpage/getRecommendedReview';
import type { ReviewItem } from '../../api/mainpage/getReviews';

interface RecommendItem {
  postId: number;
  title: string;
  thumbnailUrl: string;
  content: string;
}
function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  //const [isMoreClicked, setIsMoreClicked] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [randomRecommend, setRandomRecommend] = useState<RecommendItem | null>(null);
  const token = localStorage.getItem('accessToken');
  const [clickCount, setClickCount] = useState(0); //더보기 버튼 설정
  const navigate = useNavigate();

  const handleMoreClick = () => {
    if (clickCount < 4) {
      setVisibleCount((prev) => prev + 3);
      setClickCount((prev) => prev+1);
    }
    
  };
  {/*더미 테스트 */}

  useEffect(() => {
    const dummyData: ReviewItem[] = [
      {
        postId: 1,
        boardType: "모임구인",
        categoryName: "여행",
        title: "서울 근교 나들이 후기",
        userId: 101,
        nickname: "여행러1",
        createdAt: "2025-07-15T10:00:00",
        commentCount: 2,
        likes: 5,
        isLiked: true,
        scrapCount: 1,
        isScraped: false,
        thumbnailUrl: "https://picsum.photos/200/100?random=101"
      },
      {
        postId: 2,
        boardType: "MT/LT",
        categoryName: "일상",
        title: "청춘 엠티 첫날 후기",
        userId: 102,
        nickname: "유저2",
        createdAt: "2025-07-14T09:30:00",
        commentCount: 0,
        likes: 2,
        isLiked: false,
        scrapCount: 0,
        isScraped: false,
        thumbnailUrl: "https://picsum.photos/200/100?random=102"
      },
      {
        postId: 3,
        boardType: "식도락",
        categoryName: "맛집탐방",
        title: "홍대 핫플 탐방기",
        userId: 103,
        nickname: "맛집헌터",
        createdAt: "2025-07-13T12:45:00",
        commentCount: 4,
        likes: 10,
        isLiked: true,
        scrapCount: 3,
        isScraped: true,
        thumbnailUrl: "https://picsum.photos/200/100?random=103"
      },
    {
    postId: 4,
    boardType: "자유게시판",
    categoryName: "일상",
    title: "주말 캠핑 다녀왔어요",
    userId: 104,
    nickname: "캠핑러",
    createdAt: "2025-07-12T15:20:00",
    commentCount: 3,
    likes: 8,
    isLiked: false,
    scrapCount: 2,
    isScraped: false,
    thumbnailUrl: "https://picsum.photos/200/100?random=104"
  },
  {
    postId: 5,
    boardType: "모임구인",
    categoryName: "스포츠",
    title: "풋살 멤버 모집합니다",
    userId: 105,
    nickname: "풋살조아",
    createdAt: "2025-07-12T09:00:00",
    commentCount: 1,
    likes: 4,
    isLiked: true,
    scrapCount: 0,
    isScraped: false,
    thumbnailUrl: "https://picsum.photos/200/100?random=105"
  },
  {
    postId: 6,
    boardType: "MT/LT",
    categoryName: "단합대회",
    title: "MT에서 있었던 웃긴 일화",
    userId: 106,
    nickname: "MT참가자",
    createdAt: "2025-07-11T14:30:00",
    commentCount: 2,
    likes: 6,
    isLiked: true,
    scrapCount: 1,
    isScraped: true,
    thumbnailUrl: "https://picsum.photos/200/100?random=106"
  },
  {
    postId: 7,
    boardType: "식도락",
    categoryName: "맛집탐방",
    title: "강남 맛집 추천",
    userId: 107,
    nickname: "미식가",
    createdAt: "2025-07-11T11:15:00",
    commentCount: 0,
    likes: 9,
    isLiked: false,
    scrapCount: 3,
    isScraped: true,
    thumbnailUrl: "https://picsum.photos/200/100?random=107"
  },
  {
    postId: 8,
    boardType: "자유게시판",
    categoryName: "생각나눔",
    title: "요즘 느낀 점 공유",
    userId: 108,
    nickname: "생각많은사람",
    createdAt: "2025-07-10T18:40:00",
    commentCount: 5,
    likes: 3,
    isLiked: true,
    scrapCount: 0,
    isScraped: false,
    thumbnailUrl: "https://picsum.photos/200/100?random=108"
  },
  {
    postId: 9,
    boardType: "모임구인",
    categoryName: "문화생활",
    title: "연극 같이 보실 분?",
    userId: 109,
    nickname: "문화러버",
    createdAt: "2025-07-10T08:00:00",
    commentCount: 0,
    likes: 7,
    isLiked: false,
    scrapCount: 2,
    isScraped: false,
    thumbnailUrl: "https://picsum.photos/200/100?random=109"
  },
  {
    postId: 10,
    boardType: "식도락",
    categoryName: "카페추천",
    title: "숨은 카페 소개",
    userId: 110,
    nickname: "카페투어",
    createdAt: "2025-07-09T16:50:00",
    commentCount: 2,
    likes: 5,
    isLiked: true,
    scrapCount: 1,
    isScraped: true,
    thumbnailUrl: "https://picsum.photos/200/100?random=110"
  },
  {
    postId: 11,
    boardType: "MT/LT",
    categoryName: "엠티후기",
    title: "다같이 불멍한 날",
    userId: 111,
    nickname: "불멍러",
    createdAt: "2025-07-09T13:10:00",
    commentCount: 1,
    likes: 2,
    isLiked: false,
    scrapCount: 0,
    isScraped: true,
    thumbnailUrl: "https://picsum.photos/200/100?random=111"
  },
  {
    postId: 12,
    boardType: "모임구인",
    categoryName: "야외활동",
    title: "이번 주말 등산 갈 사람!",
    userId: 112,
    nickname: "산이좋아",
    createdAt: "2025-07-08T19:00:00",
    commentCount: 4,
    likes: 11,
    isLiked: true,
    scrapCount: 4,
    isScraped: true,
    thumbnailUrl: "https://picsum.photos/200/100?random=112"
  },
  {
  postId: 13,
  boardType: "모임구인",
  categoryName: "문화생활",
  title: "뮤지컬 관람하실 분 구해요",
  userId: 113,
  nickname: "뮤덕",
  createdAt: "2025-07-07T17:00:00",
  commentCount: 1,
  likes: 4,
  isLiked: true,
  scrapCount: 1,
  isScraped: true,
  thumbnailUrl: "https://picsum.photos/200/100?random=113"
},
{
  postId: 14,
  boardType: "자유게시판",
  categoryName: "잡담",
  title: "오늘 날씨 너무 좋다!",
  userId: 114,
  nickname: "햇살좋아",
  createdAt: "2025-07-07T09:30:00",
  commentCount: 0,
  likes: 5,
  isLiked: false,
  scrapCount: 0,
  isScraped: false,
  thumbnailUrl: "https://picsum.photos/200/100?random=114"
},
{
  postId: 15,
  boardType: "식도락",
  categoryName: "야식추천",
  title: "야식으로 추천하는 메뉴?",
  userId: 115,
  nickname: "야식러버",
  createdAt: "2025-07-06T23:45:00",
  commentCount: 3,
  likes: 8,
  isLiked: true,
  scrapCount: 2,
  isScraped: false,
  thumbnailUrl: "https://picsum.photos/200/100?random=115"
},
{
  postId: 16,
  boardType: "MT/LT",
  categoryName: "단합대회",
  title: "단합대회 때 이런 게임 어때요?",
  userId: 116,
  nickname: "아이디어뱅크",
  createdAt: "2025-07-06T15:00:00",
  commentCount: 2,
  likes: 6,
  isLiked: false,
  scrapCount: 1,
  isScraped: false,
  thumbnailUrl: "https://picsum.photos/200/100?random=116"
},
{
  postId: 17,
  boardType: "모임구인",
  categoryName: "운동",
  title: "배드민턴 모임 인원 모집합니다",
  userId: 117,
  nickname: "스매싱",
  createdAt: "2025-07-05T10:00:00",
  commentCount: 0,
  likes: 3,
  isLiked: true,
  scrapCount: 0,
  isScraped: false,
  thumbnailUrl: "https://picsum.photos/200/100?random=117"
},
{
  postId: 18,
  boardType: "자유게시판",
  categoryName: "잡담",
  title: "요즘 듣는 노래 추천해줘요",
  userId: 118,
  nickname: "노래쟁이",
  createdAt: "2025-07-04T21:30:00",
  commentCount: 5,
  likes: 9,
  isLiked: true,
  scrapCount: 3,
  isScraped: true,
  thumbnailUrl: "https://picsum.photos/200/100?random=118"
}


];


    const sorted = dummyData.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setReviews(sorted);

    setRandomRecommend({
    postId: 999,
    title: "테스트 추천글",
    thumbnailUrl: "https://picsum.photos/200/100?random=999",
    content: "<p>추천 테스트용입니다! 길이가 언제까지 갈까요 시험해봅시다 언제까지 가나요? 언제까지언제까지 언제까지</p>"
  });
  }, []);
// 추천 Api
/*
 useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const data = await fetchRecommendedReview();

        setRandomRecommend({
          postId: data.postId,
          title: data.title,
          thumbnailUrl: data.thumbnailUrl || '/default-thumbnail.png',
          content: data.content,
        });
      } catch (err) {
        if (err instanceof Error) {
        console.error('추천 리뷰 불러오기 실패:', err.message);
      } else {
        console.error('추천 리뷰 불러오기 실패:',err);
      }
      setRandomRecommend(null);
      }
    };

    fetchRecommended();
  }, []);

  // 리뷰 리스트 가져오기 
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const data = await fetchReviews(token || undefined);
        const sorted = data.reviews.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setReviews(sorted);
      } catch (err) {
        if (err instanceof Error) {
          console.error('리뷰 불러오기 실패:', err.message);
        } else {
          console.error('리뷰 불어오기 실패:',err);
      } 
      setReviews([]);
      }
    };
    loadReviews();
  }, []);
  */

  return (
    <>
      <Header />

      <div className="mainpage-background">
        <section className="mainpage-search-section">
          <h2 className="mainpage-sectiontitle">▶ 청춘 발자국</h2>
          <div className="mainpage-search-container">
            <img src={searchIcon} alt="검색 아이콘" className="mainpage-search-icon" />
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="mainpage-search-input"
              onClick={() => navigate("/search")}
            />
          </div>
        </section>

        {randomRecommend && (
          <section className="mainpage-suggest-section">
            <div className="mainpage-suggest-card" onClick={() =>  randomRecommend && navigate(`/youth-talk/${randomRecommend.postId}`)}>
              <p className="mainpage-suggest-label">이런 글은 어떠신가요?</p>
              <div className="mainpage-suggest-content-wrapper">
                <div className="mainpage-suggest-text">
                  <p className="mainpage-recommend-title">{randomRecommend.title}</p>
                  <p className="mainpage-recommend-summary">
                    {randomRecommend.content
                      ? randomRecommend.content.replace(/<[^>]+>/g, '').slice(0, 50) + '...'
                      : '소개글이 없습니다.'}
                  </p>
                </div>
                <div className="mainpage-suggest-image-wrapper">
                  <img src={randomRecommend.thumbnailUrl} alt="추천 이미지" className="mainpage-suggest-img" />
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="roulette-wrapper">
          <button className="roulette-button" onClick={() => setIsModalOpen(true)}>룰렛 돌리기</button>
        </div>

        <section className="today-wrapper">
          <div className="today-board">
            <div className="section-header">
              <h2 className="today-section">오늘의 청춘</h2>
              <a href="/youth-talk" className="more-link" style={{ textDecoration: 'underline' }}>더보기 {'>'}</a>
            </div>
            <div className="review-grid">
              {reviews.slice(0, visibleCount).map((review) => (
                <div key={review.postId} onClick={() => navigate(`/youth-talk/${review.postId}`)}>
                  <ReviewCard
                    postId={review.postId}
                    title={review.title}
                    categoryName={review.categoryName}
                    thumbnailUrl={review.thumbnailUrl}
                    nickname={review.nickname}
                    createdAt={review.createdAt}
                    likes={review.likes}
                    scrapCount={review.scrapCount}
                    rating={4}
                    isLiked={token ? review.isLiked: false}
                    isScraped={token ? review.isScraped: false}
                  />
                </div>
              ))}
            </div>
          </div>
          {clickCount < 4 ? (
            <button className="more-button" onClick={handleMoreClick}>
              <span style={{ textDecoration: 'underline' }}>더보기</span> +
            </button>
          ) : (
            <button className="more-button" onClick={() => navigate('/youth-talk')}>
              <span style={{ textDecoration: 'underline'}}>청춘톡 전체보기</span> →
            </button>
          )}

        </section>
      </div>

      {isModalOpen && (
        <>
          <div className="mainpage-modal-overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="mainpage-modal-content">
            <RouletteModal onClose={() => setIsModalOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}

export default MainPage;
