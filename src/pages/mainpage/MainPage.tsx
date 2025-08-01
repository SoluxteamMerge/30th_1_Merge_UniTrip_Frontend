import { useState, useEffect } from 'react';
import RouletteModal from "../roulette/RouletteModal";
import '../../App.css';
import { ReviewCard } from '../../pages/reviewcard/ReviewCard';
import Header from '../../components/Header/Header';
import './MainPage.css';
import searchIcon from '../../assets/search_icon.svg';
import { useNavigate } from "react-router-dom";
import type { ReviewItem } from '../../api/mainpage/fetchReviews';
import { fetchRecommendedReview } from '../../api/mainpage/getRecommendedReview';
import { fetchReviews } from '../../api/mainpage/fetchReviews';
import AlertModal from '../../components/AlertModal/AlertModal';
import defaultImage from '../../assets/mainpage/defaultimage.png';

interface RecommendItem {
  postId: number;
  title: string;
  imageUrl: string;
  content: string;
}

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [randomRecommend, setRandomRecommend] = useState<RecommendItem | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('전체 보기');
  const [dropdownOpen,setDropdownOpen] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);


  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken') ?? '';
  const isLoggedIn = token && token !== 'undefined' && token !== 'null';

  const handleLoginRedirect = () => {
    setAlertMessage('로그인이 필요합니다.');
    setRedirectToLogin(true);
  };

  const handleCardClick = (postId: number) => {
    if (!isLoggedIn) {
      handleLoginRedirect();
      return;
    }
    navigate(`/youth-talk/${postId}`);
  };

  const handleRecommendClick = (postId: number) => {
    if (!isLoggedIn) {
      handleLoginRedirect();
      return;
    }
    navigate(`/youth-talk/${postId}`);
  };

  const handleMoreClick = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const boardTypeMap: Record<string, string> = {
  '전체 보기': 'ALL',
  '졸업/휴학여행': '졸업_휴학여행',
  '국내학점교류': '국내학점교류',
  '해외교환학생': '해외교환',
  'MT여정지도': 'MT_LT',
};

const filteredReviews = reviews.filter((review) =>
    selectedBoard === '전체 보기'
      ? true
      : review.boardType === boardTypeMap[selectedBoard]

  );
const sortedReviews = [...filteredReviews].sort((a, b) => b.postId - a.postId);



  // 추천 리뷰 API
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const data = await fetchRecommendedReview();
        setRandomRecommend({
          postId: data.postId,
          title: data.title,
          imageUrl: data.imageUrl || defaultImage,
          content: data.content,
        });
      } catch (err: any) {
        const message = err.response?.data?.message || '추천 리뷰 불러오기 실패';
        console.error(message);
        setAlertMessage(message);
        setRandomRecommend(null);
      }
    };
    fetchRecommended();
  }, []);

  // 리뷰 목록 API
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        console.log('🔥 리뷰 응답:', data);
        setReviews(data);
      } catch (err: any) {
        const message = err.response?.data?.message || '리뷰 불러오기 실패';
        console.error(message);
        setAlertMessage(message);
        setReviews([]);
      }
    };
    loadReviews();
  }, []);

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
            <div
              className="mainpage-suggest-card"
              onClick={() => handleRecommendClick(randomRecommend.postId)}
            >
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
                  <img src={randomRecommend.imageUrl} alt="추천 이미지" className="mainpage-suggest-img" />
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
              <div className="custom-dropdown">
                <button
                  className="dropdown-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {selectedBoard} <span className="arrow">{dropdownOpen ? '▲' : '▼'}</span>
                </button>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    {[
                      '전체 보기',
                      '졸업/휴학여행',
                      '국내학점교류',
                      '해외교환학생',
                      'MT여정지도',
                    ].map((option) => (
                      <li
                      key={option}
                      className={selectedBoard === option ? 'selected' : ''}
                      onClick={() => {
                      setSelectedBoard(option);
                      setDropdownOpen(false);
                      setVisibleCount(6);
                    }}
                  >
                    {option}
                  </li>
                ))}
            </ul>
          )}
          </div>

            </div>
            <div className="review-grid">
              {sortedReviews
                .slice(0, visibleCount)
                .map((review) => (
                <div key={review.postId} onClick={() => handleCardClick(review.postId)}>
                  <ReviewCard
                    postId={review.postId}
                    postTitle={review.postTitle}
                    imageUrl={review.imageUrl}
                    boardType={review.boardType}
                    categoryName={review.categoryName}
                    nickname={review.nickname}
                    rating={review.rating}
                    likeCount={review.likeCount}
                    scrapCount={review.scrapCount}
                  />
                </div>
              ))}
            </div>
          </div>

          {visibleCount < filteredReviews.length ? (
            <button className="more-button" onClick={handleMoreClick}>
              <span style={{ textDecoration: 'underline' }}>더보기</span> +
            </button>
          ) : (
            <button className="more-button" onClick={() => navigate('/youth-talk')}>
              <span style={{ textDecoration: 'underline' }}>전체 글 보기</span> →
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

      {alertMessage && (
        <AlertModal
          message={alertMessage}
          onClose={() => {
            setAlertMessage('');
            setRedirectToLogin(false);
          }}
          onConfirm={() => {
            setAlertMessage('');
            if (redirectToLogin) {
              setRedirectToLogin(false);
              navigate('/login');
            }
          }}
        />
      )}
    </>
  );
}

export default MainPage;
