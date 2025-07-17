import React, { useState } from 'react';
import RouletteModal from "../roulette/RouletteModal";
import '../../App.css';
import { reviewData } from '../../data/review';
import { ReviewCard } from '../../pages/reviewcard/ReviewCard';
import Header from '../../components/Header/Header';
import './MainPage.css';
import searchIcon from '../../assets/search_icon.svg';
import { useNavigate } from "react-router-dom";

const recommended = {
  title: '동기들과 함께 제주도 3박 4일 여행 다녀왔습니다',
  summary: '동기들과 함께 제주도에 다녀왔습니다! 바닷바람이 너무 심해서 날아가는 줄 알았지만 근처에 있는 한옥을 모두 볼 수 있었습니다. 안녕하세요 안녕.',
  imageUrl: 'https://picsum.photos/120/80'
};

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); //6개만 보이게 제한
  const [isMoreClicked, setIsMoreClicked] = useState(false); //더 보기 버튼 제한
  const navigate = useNavigate(); // 추가

  const handleMoreClick = () => {
    setVisibleCount((prev) => prev + 3);
    setIsMoreClicked(true);
  }

  return (
    <>
      <Header />

      <div className="mainpage-background">
        {/* 검색 섹션 */}
        <section className="mainpage-search-section">
          <h2 className="mainpage-sectiontitle">▶ 청춘 발자국</h2>
          <div className="mainpage-search-container">
            <img
              src={searchIcon}
              alt="검색 아이콘"
              className="mainpage-search-icon"
            />
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="mainpage-search-input"
              onClick={() => navigate("/search")} // 클릭하면 SearchPage.tsx 페이지로 넘어감
            />
          </div>
        </section>

        <section className="mainpage-suggest-section">
          <div className="mainpage-suggest-card">
            <p className="mainpage-suggest-label">이런 글은 어떠신가요?</p>
            <div className="mainpage-suggest-content-wrapper">
              <div className="mainpage-suggest-text">
                <p className="mainpage-recommend-title">{recommended.title}</p>
                <p className="mainpage-recommend-summary">{recommended.summary}</p>
              </div>
              <div className="mainpage-suggest-image-wrapper">
                <img
                  src="https://picsum.photos/160/120"
                  alt="추천 이미지"
                  className="mainpage-suggest-img"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="roulette-wrapper">
          <button className="roulette-button" onClick={() => setIsModalOpen(true)}>룰렛 돌리기</button>
        </div>

        <section className="today-wrapper">
          <div className="today-board">
            <div className="section-header">
              <h2 className="today-section">오늘의 청춘</h2>
              <a href="youth-talk" className="more-link">전체보기 {'>'} </a>
            </div>
            <div className="review-grid">
              {reviewData.slice(0, visibleCount).map((review) => ( /*6개 제한*/
                <ReviewCard
                  key={review.id}
                  title={review.title}
                  tags={review.tags}
                  imageUrl={review.imageUrl}
                  author={review.author}
                />
              ))}
            </div>
            {!isMoreClicked && (
              <button className="more-button" onClick={handleMoreClick}> 더보기 </button>
            )}
          </div>
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
