import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import SortDropdown from "../components/SortDropdown";
import { useNavigate } from "react-router-dom";
import writeIcon from "../assets/write-icon.svg";
import starWishIcon from "../assets/module/star_wish.svg";
import starWishFillIcon from "../assets/module/star_wish_fill.svg";
import { getReviews, ReviewItem } from '../api/Review/getReviewsApi';

const categoryToBoardType: Record<string, string> = {
  "MT여정지도": "MT/LT",
  "함께해요-동행구해요": "동행모집",
  "함께해요-번개모임": "모임구인",
  "함께해요-졸업/휴학여행": "졸업/휴학여행",
  "함께해요-국내학점교류": "국내학점교류",
  "함께해요-해외교환학생": "해외교환",
};

const MTJourneyPage: React.FC = () => {
  const [sort, setSort] = useState("최신순");
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const boardType = categoryToBoardType["MT여정지도"];
        const accessToken = localStorage.getItem('accessToken') || undefined;
        // 임시 데이터 사용 (API 준비 전까지)
        const res = await getReviews(boardType, accessToken, true);
        setReviews(res.reviews);
      } catch (error) {
        console.error('리뷰 조회 오류:', error);
        setReviews([]);
      }
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const halfStarValue = index + 0.5;
      
      if (rating >= starValue) {
        // 완전히 채워진 별
        return (
          <img
            key={index}
            src={starWishFillIcon}
            alt="채워진 별"
            style={{ width: 25, height: 25, marginRight: 13 }}
          />
        );
      } else if (rating >= halfStarValue) {
        // 반만 채워진 별
        return (
          <div key={index} style={{ position: 'relative', display: 'inline-block', width: 25, height: 25, marginRight: 13 }}>
            <img 
              src={starWishIcon} 
              alt="빈 별" 
              style={{ 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                width: '100%', 
                height: '100%'
              }}
            />
            <img 
              src={starWishFillIcon} 
              alt="반채워진 별" 
              style={{ 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                width: '100%', 
                height: '100%',
                clipPath: 'inset(0 50% 0 0)'
              }}
            />
          </div>
        );
      } else {
        // 빈 별
        return (
          <img
            key={index}
            src={starWishIcon}
            alt="빈 별"
            style={{ width: 25, height: 25, marginRight: 13 }}
          />
        );
      }
    });
  };

  return (
    <div className="mt-bg">
      <style>{`
        .mt-bg { background: #e8f0f2; min-height: 100vh; }
        .mt-container { max-width: 1500px; margin: 0 auto; padding: 60px 150px 60px 150px; }
        .mt-title-box { font-weight: 700; font-size: 22px; color: #0b0b61; display: flex; align-items: center; margin-bottom: 0px; }
        .mt-title-icon { font-size: 20px; margin-right: 8px; }
        .mt-board-title { font-weight: 700; font-size: 18px; color: #0b0b61; margin-bottom: 20px; }
        .mt-white-container { background: #fff; border-radius: 15px; box-shadow: 0 1px 6px #0001; padding: 24px 40px 24px 40px; margin-top: 10px; }
        .mt-post-list { display: flex; flex-direction: column; gap: 24px; }
        .mt-post-card { display: flex; flex-direction: column; gap: 0; background: #fff; border-radius: 15px; border: 2px solid #bbb; padding: 24px; margin-bottom: 8px; }
        .mt-post-top-row { display: flex; flex-direction: column; align-items: stretch; justify-content: space-between; border-bottom: 1px solid #bbb; padding-bottom: 18px; margin-bottom: 18px; }
        .mt-post-info-row { display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .mt-post-info-left { display: flex; align-items: center; }
        .mt-profile { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; margin-right: 8px; background: #eee; }
        .mt-profile-default { background: #bbb; }
        .mt-username { color: #838383; font-size: 15px; }
        .mt-info-divider { width: 1px; height: 18px; background: #bbb; margin: 0 12px; }
        .mt-date { color: #555; font-size: 13px; }
        .mt-tag-row { display: flex; gap: 10px; }
        .mt-tag { border-radius: 20px; padding: 6px 18px; font-size: 15px; font-weight: 400; }
        .mt-tag-main { background: #0b0b61; color: #fff; }
        .mt-tag-sub { background: #fff; border: 1.5px solid #0b0b61; color: #0b0b61; }
        .mt-post-title { font-weight: 700; font-size: 22px; color: #0b0b61; padding: 0 0 0 10px; margin-bottom: 2px; margin-top: 0; }
        .mt-post-bottom-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
        .mt-post-content { color: #222; padding: 0 0 0 10px; font-size: 16px; font-weight: 400; flex: 1; }
        .mt-thumbnail { width: 220px; height: 130px; border-radius: 0px; object-fit: cover; margin-left: 24px; }
        .mt-title-thumb-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0px; }
        .mt-main-row { display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between; gap: 24px; margin-top: 0; }
        .mt-main-texts { display: flex; flex-direction: column; flex: 1; padding-top: 0; margin-top: 0; }
        .mt-post-title { font-weight: 700; font-size: 22px; color: #0b0b61; padding: 0 0 0 10px; margin-bottom: 2px; margin-top: 0; }
        .mt-post-content { color: #black; padding: 10px 0 0 10px; font-size: 15px; font-weight:600; white-space: pre-line; }
        .mt-thumbnail { width: 220px; height: 130px; border-radius: 0px; object-fit: cover; margin-left: 24px; }
        .mt-rating-container { display: flex; align-items: center; }
        .mt-floating-write-btn {
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
      <div className="mt-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="mt-title-box">
            <span className="mt-title-icon">▶</span>MT여정지도
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
        <div className="mt-white-container">
          <div className="mt-board-title">리뷰모음</div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>로딩 중...</div>
          ) : (
            <div className="mt-post-list">
              {reviews.map(review => (
                <div key={review.postId} className="mt-post-card" onClick={() => navigate(`/review/${review.postId}?category=MT여정지도`)} style={{ cursor: 'pointer' }}>
                  {/* 상단: 프로필/닉네임/날짜 */}
                  <div className="mt-post-top-row">
                    <div className="mt-post-info-row">
                      <div className="mt-post-info-left">
                      <div className="mt-profile mt-profile-default" />
                      <span className="mt-username">{review.nickname} 님</span>
                      <div className="mt-info-divider" />
                      <span className="mt-date">{new Date(review.createdAt).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                      </div>
                      <div className="mt-rating-container">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  {/* 제목+별점(왼쪽) + 썸네일(오른쪽) 한 줄 */}
                  <div className="mt-main-row">
                    <div className="mt-main-texts">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="mt-post-title">{review.title}</div>
                      </div>
                      <div className="mt-post-content">{review.content}</div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="썸네일" className="mt-thumbnail" />
                  </div>
                  {/* 태그들 (사진 아래) */}
                  <div style={{ marginTop: '16px', marginRight: '0px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <span className="mt-tag mt-tag-main">#{review.categoryName}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* 플로팅 버튼 */}
      <button
        className="mt-floating-write-btn"
        onClick={() => navigate("/review-write?category=MT여정지도")}
        aria-label="게시글 작성"
      >
        <img src={writeIcon} alt="글쓰기" style={{ width: 120, height: 120 }} />
      </button>
    </div>
  );
};

export default MTJourneyPage; 