import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import SortDropdown from "../components/SortDropdown";
import { useNavigate } from "react-router-dom";
import writeIcon from "../assets/write-icon.svg";
import starIcon from "../assets/interaction/star.svg";
import starFillIcon from "../assets/interaction/star_fill.svg";
import { getAllReviews, ReviewItem } from '../api/Review/getReviewsApi';
import { getAverageRating } from '../api/Review/getAverageRatingApi';

const YouthTalkBoardPage: React.FC = () => {
  const [sort, setSort] = useState("최신순");
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRatings, setAverageRatings] = useState<Record<string, number>>({});

  // 별점 표시 컴포넌트
  const renderStars = (rating: number) => {
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      const starValue = Math.max(0, Math.min(1, rating - i));
      
      if (starValue >= 1) {
        // 완전히 채워진 별
        stars.push(
          <img 
            key={i}
            src={starFillIcon} 
            alt="별점" 
            style={{ 
              width: '14px', 
              height: '14px',
              marginRight: '2px'
            }} 
          />
        );
      } else if (starValue > 0) {
        // 부분적으로 채워진 별 (CSS로 구현)
        stars.push(
          <div 
            key={i}
            style={{ 
              position: 'relative',
              width: '14px', 
              height: '14px',
              marginRight: '2px',
              display: 'inline-block'
            }}
          >
            <img 
              src={starIcon} 
              alt="별점" 
              style={{ 
                width: '14px', 
                height: '14px',
                position: 'absolute',
                top: 0,
                left: 0
              }} 
            />
            <div 
              style={{
                position: 'absolute',
                top: -1.8,
                left: 0,
                width: `${starValue * 100}%`,
                height: '15px',
                overflow: 'hidden'
              }}
            >
              <img 
                src={starFillIcon} 
                alt="별점" 
                style={{ 
                  width: '14px', 
                  height: '14px'
                }} 
              />
            </div>
          </div>
        );
      } else {
        // 빈 별
        stars.push(
          <img 
            key={i}
            src={starIcon} 
            alt="별점" 
            style={{ 
              width: '14px', 
              height: '14px',
              marginRight: '2px'
            }} 
          />
        );
      }
    }
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {stars}
        <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // 평균 별점 조회 함수
  const fetchAverageRating = async (keyword: string) => {
    try {
      const token = localStorage.getItem('accessToken') || undefined;
      const response = await getAverageRating(keyword, token);
      if (response.code === 200 && response.data) {
        setAverageRatings(prev => ({
          ...prev,
          [keyword]: response.data!.averageRating
        }));
      }
    } catch (error) {
      console.error('평균 별점 조회 실패:', error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken') || undefined;
        const res = await getAllReviews(token);
        setReviews(res.reviews);
        
        // 각 게시글의 키워드(장소명, 태그)에 대해 평균 별점 조회
        const keywords = new Set<string>();
        res.reviews.forEach(review => {
          if (review.placeName) keywords.add(review.placeName);
          if (review.categoryName) keywords.add(review.categoryName);
        });
        
        keywords.forEach(keyword => {
          fetchAverageRating(keyword);
        });
      } catch (error) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="yt-bg">
      <style>{`
        .yt-bg { background: #e8f0f2; min-height: 100vh; }
        .yt-container { max-width: 1500px; margin: 0 auto; padding: 60px 150px 60px 150px; }
        .yt-title-box { font-weight: 700; font-size: 22px; color: #0b0b61; display: flex; align-items: center; margin-bottom: 0px; }
        .yt-title-icon { font-size: 20px; margin-right: 8px; }
        .yt-board-title { font-weight: 700; font-size: 18px; color: #0b0b61; margin-bottom: 20px; }
        .yt-white-container { background: #fff; border-radius: 15px; box-shadow: 0 1px 6px #0001; padding: 24px 40px 24px 40px; margin-top: 10px; }
        .yt-post-list { display: flex; flex-direction: column; gap: 24px; }
        .yt-post-card { display: flex; flex-direction: column; gap: 0; background: #fff; border-radius: 15px; border: 2px solid #bbb; padding: 24px; margin-bottom: 8px; }
        .yt-post-top-row { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #bbb; padding-bottom: 12px; margin-bottom: 18px; }
        .yt-post-info-row { display: flex; align-items: center; }
        .yt-profile { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; margin-right: 8px; background: #eee; }
        .yt-profile-default { background: #bbb; }
        .yt-username { color: #838383; font-size: 15px; }
        .yt-info-divider { width: 1px; height: 18px; background: #bbb; margin: 0 12px; }
        .yt-date { color: #555; font-size: 13px; }
        .yt-tag-row { display: flex; gap: 10px; }
        .yt-tag { border-radius: 20px; padding: 6px 18px; font-size: 15px; font-weight: 400; }
        .yt-tag-main { background: #0b0b61; color: #fff; }
        .yt-tag-sub { background: #fff; border: 1.5px solid #0b0b61; color: #0b0b61; }
        .yt-post-title { font-weight: 700; font-size: 22px; color: #0b0b61; padding: 0 0 0 10px; margin-bottom: 2px; margin-top: 0; }
        .yt-post-bottom-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
        .yt-post-content { color: #222; padding: 0 0 0 10px; font-size: 16px; font-weight: 400; flex: 1; }
        .yt-thumbnail { width: 220px; height: 130px; border-radius: 0px; object-fit: cover; margin-left: 24px; }
        .yt-title-thumb-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0px; }
        .yt-main-row { display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between; gap: 24px; margin-top: 0; }
        .yt-main-texts { display: flex; flex-direction: column; flex: 1; padding-top: 0; margin-top: 0; }
        .yt-post-title { font-weight: 700; font-size: 22px; color: #0b0b61; padding: 0 0 0 10px; margin-bottom: 2px; margin-top: 0; }
        .yt-post-content { color: #black; padding: 10px 0 0 10px; font-size: 15px; font-weight:600; }
        .yt-thumbnail { width: 220px; height: 130px; border-radius: 0px; object-fit: cover; margin-left: 24px; }
        .yt-floating-write-btn {
          position: fixed;
          right: 60px;
          bottom: 60px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          box-shadow: 0 4px 24px 0 rgba(0,0,0,0.18);
          border: 2px solid #0b0b61;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
          transition: box-shadow 0.2s;
        }
      `}</style>
              <Header isLoggedIn={!!localStorage.getItem('accessToken')} username="" profileUrl="" />
      <div className="yt-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="yt-title-box">
            <span className="yt-title-icon">▶</span>청춘톡
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
        <div className="yt-white-container">
          <div className="yt-board-title">게시글 모음</div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>로딩 중...</div>
          ) : (
            <div className="yt-post-list">
              {reviews.map(review => (
                <div key={review.postId} className="yt-post-card" onClick={() => navigate(`/review/${review.postId}?category=청춘톡`)} style={{ cursor: 'pointer' }}>
                  {/* 상단: 프로필/닉네임/날짜(왼쪽) + 태그(오른쪽) */}
                  <div className="yt-post-top-row">
                    <div className="yt-post-info-row">
                      <div className="yt-profile yt-profile-default" />
                      <span className="yt-username">{review.nickname}</span>
                      <div className="yt-info-divider" />
                      <span className="yt-date">{new Date(review.createdAt).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                    <div className="yt-tag-row">
                      <span className="yt-tag yt-tag-main">#{review.categoryName}</span>
                    </div>
                  </div>
                  {/* 제목+내용(왼쪽) + 썸네일(오른쪽) 한 줄 */}
                  <div className="yt-main-row">
                    <div className="yt-main-texts">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="yt-post-title">{review.title}</div>
                        {/* 평균 별점 표시 */}
                        {(review.placeName && averageRatings[review.placeName]) && (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '4px',
                            fontSize: '14px',
                            color: '#666',
                            marginTop: '0px'
                          }}>
                            {renderStars(averageRatings[review.placeName])}
                          </div>
                        )}
                        {(review.categoryName && averageRatings[review.categoryName] && !review.placeName) && (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '4px',
                            fontSize: '14px',
                            color: '#666',
                            marginTop: '0px'
                          }}>
                            {renderStars(averageRatings[review.categoryName])}
                          </div>
                        )}
                      </div>
                      <div className="yt-post-content">{review.content}</div>
                    </div>
                    <img src={review.thumbnailUrl} alt="썸네일" className="yt-thumbnail" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* 플로팅 버튼 */}
      <button
        className="yt-floating-write-btn"
        onClick={() => navigate("/review-write?category=청춘톡")}
        aria-label="게시글 작성"
      >
        <img src={writeIcon} alt="글쓰기" style={{ width: 120, height: 120 }} />
      </button>
    </div>
  );
};

export default YouthTalkBoardPage; 