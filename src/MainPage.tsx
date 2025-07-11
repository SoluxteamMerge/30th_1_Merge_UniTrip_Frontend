import React from 'react';
import './App.css';
import { reviewData } from './data/review';
import { ReviewCard } from './components/ReviewCard';
import Header from './components/Header';
import './MainPage.css';

function MainPage() {
  return (
    <div>
      <Header />

      <div className="main-background">
        {/* 검색 섹션 */}
        <section className="search-section">
          <h2 className="section-title">▶ 청춘 발자국</h2>
          <input
            type="text"
            placeholder="대상지"
            className="search-input"
          />
        </section>

        {/* 추천 섹션 */}
        <section className="suggest-section">
          <p className="suggest-label">이런 글은 어떠신가요?</p>
          <div className="suggest-card">
            <div>
              <h3>동기들과 함께 제주도 3박 4일 여행 다녀왔습니다</h3>
              <p>
                동기들과 함께 제주도 다녀왔어요! 바다 내음새 날려버리는 즐거운 3박 4일간의
                여행 후기!
              </p>
            </div>
            <img
              src="https://picsum.photos/120/80"
              alt="추천 이미지"
              className="suggest-img"
            />
          </div>
        </section>

        {/* 룰렛 버튼 */}
        <button className="roulette-button">룰렛 돌리기</button>

        {/* 오늘의 청춘 섹션 */}
        <section className="today-section">
          <h2 className="section-title">오늘의 청춘</h2>
          <div className="review-grid">
            {reviewData.map((review) => (
              <ReviewCard
                key={review.id}
                title={review.title}
                tags={review.tags}
                imageUrl={review.imageUrl}
                summary={review.summary}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainPage;
