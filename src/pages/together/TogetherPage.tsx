import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import SortDropdown from "../../components/SortDropdown";
import AlertModal from "../../components/AlertModal/AlertModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import writeIcon from "../../assets/write-icon.svg";
import starWishIcon from "../../assets/module/star_wish.svg";
import starWishFillIcon from "../../assets/module/star_wish_fill.svg";
import { getReviews, ReviewItem } from '../../api/Review/getReviewsApi';

const categoryToBoardType: Record<string, string> = {
  "함께해요-동행구해요": "동행모집",
  "함께해요-번개모임": "모임구인",
  "함께해요-졸업/휴학여행": "졸업/휴학여행",
  "함께해요-국내학점교류": "국내학점교류",
  "함께해요-해외교환학생": "해외교환",
  "MT여정지도": "MT/LT",
};

const categories = [
  "동행구해요",
  "번개모임", 
  "졸업/휴학여행",
  "국내학점교류",
  "해외교환학생"
];

const TogetherPage: React.FC = () => {
  const [sort, setSort] = useState("최신순");
  const [selectedCategory, setSelectedCategory] = useState("동행구해요");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 로그인 상태 확인
  const isLoggedIn = !!localStorage.getItem('accessToken');

  // 로그인하지 않은 사용자 체크
  useEffect(() => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    }
  }, [isLoggedIn]);

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  // 로그인하지 않은 경우 페이지 렌더링하지 않음
  if (!isLoggedIn) {
    return (
      <>
        <Header isLoggedIn={false} username="" profileUrl="" />
        {showLoginModal && (
          <AlertModal 
            message="로그인이 필요한 서비스입니다. 로그인 후 이용해주세요." 
            onClose={handleLoginModalClose} 
          />
        )}
      </>
    );
  }

  // URL 파라미터에서 카테고리 읽어오기
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const fullCategoryName = `함께해요-${selectedCategory}`;
        const boardType = categoryToBoardType[fullCategoryName];
        const accessToken = localStorage.getItem('accessToken') || undefined;
        const res = await getReviews(boardType, accessToken);
        setReviews(res.reviews);
      } catch (error) {
        console.error('리뷰 조회 오류:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [selectedCategory]);

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
    <div className="together-bg">
      <style>{`
        .together-bg { background: #e8f0f2; min-height: 100vh; }
        .together-container { max-width: 1500px; margin: 0 auto; padding: 60px 0px 0px 300px; }
        .together-sidebar {
          position: fixed;
          left: 80px;
          top: 202px;
          width: 280px;
          background: #fff;
          border-radius: 15px;
          padding: 32px 24px;
          box-shadow: 0 0 8px rgba(0,0,0,0.05);
        }
        .together-category-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .together-category-item {
          padding: 15px 0;
          margin-bottom: 8px;
          cursor: pointer;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          color: #838383;
        }
        .together-category-item:hover {
          background: #dedede;
        }
        .together-category-item.active {
          background: #dedede;
          color: #000;
          font-weight: 700;
        }
        .together-category-item::before {
          content: "•";
          margin-right: 12px;
          margin-left: 12px;
          color: #838383;
        }
        .together-category-item.active::before {
          color: #000;
        }
        .together-title-box { font-weight: 700; font-size: 22px; color: #0b0b61; display: flex; align-items: center; margin-bottom: 0px; }
        .together-title-icon { font-size: 20px; margin-right: 8px; }
        .together-board-title { font-weight: 700; font-size: 18px; color: #0b0b61; margin-bottom: 20px; }
        .together-white-container { background: #fff; border-radius: 15px; box-shadow: 0 1px 6px #0001; padding: 24px 40px 24px 40px; margin-top: 10px; }
        .together-post-list { display: flex; flex-direction: column; gap: 24px; }
        .together-post-card { display: flex; flex-direction: column; gap: 0; background: #fff; border-radius: 15px; border: 2px solid #bbb; padding: 24px; margin-bottom: 8px; }
        .together-post-top-row { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #bbb; padding-bottom: 12px; margin-bottom: 18px; }
        .together-post-info-row { display: flex; align-items: center; }
        .together-profile { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; margin-right: 8px; background: #eee; }
        .together-profile-default { background: #bbb; }
        .together-username { color: #838383; font-size: 15px; }
        .together-info-divider { width: 1px; height: 18px; background: #bbb; margin: 0 12px; }
        .together-date { color: #555; font-size: 13px; }
        .together-post-title { font-weight: 700; font-size: 22px; color: #0b0b61; padding: 0 0 0 10px; margin-bottom: 2px; margin-top: 0; }
        .together-post-bottom-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
        .together-post-content { color: #222; padding: 0 0 0 10px; font-size: 16px; font-weight: 400; flex: 1; }
        .together-thumbnail { width: 220px; height: 130px; border-radius: 0px; object-fit: cover; margin-left: 24px; }
        .together-title-thumb-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0px; }
        .together-main-row { display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between; gap: 24px; margin-top: 0; }
        .together-main-texts { display: flex; flex-direction: column; flex: 1; padding-top: 0; margin-top: 0; }
        .together-post-title { font-weight: 700; font-size: 22px; color: #0b0b61; padding: 0 0 0 10px; margin-bottom: 2px; margin-top: 0; }
        .together-post-content { color: #black; padding: 10px 0 0 10px; font-size: 15px; font-weight:600; }
        .together-thumbnail { width: 220px; height: 130px; border-radius: 0px; object-fit: cover; margin-left: 24px; }
        .together-floating-write-btn {
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
        .together-floating-write-btn:hover {
          box-shadow: 0 6px 32px 0 rgba(0,0,0,0.25);
        }
        .together-tag { border-radius: 20px; padding: 6px 18px; font-size: 15px; font-weight: 400; }
        .together-tag-main { background: #0b0b61; color: #fff; }
        .together-tag-sub { background: #fff; border: 1.5px solid #0b0b61; color: #0b0b61; }
        .together-rating-container { display: flex; align-items: center; margin-left: 580px; }
      `}</style>
      
              <Header isLoggedIn={!!localStorage.getItem('accessToken')} username="" profileUrl="" />
      
      {/* 사이드바 */}
      <div className="together-sidebar">
        <ul className="together-category-list">
          {categories.map(category => (
            <li
              key={category}
              className={`together-category-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="together-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="together-title-box">
            <span className="together-title-icon">▶</span>함께해요
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
        <div className="together-white-container">
          <div className="together-board-title">{selectedCategory}</div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>로딩 중...</div>
          ) : (
            <div className="together-post-list">
              {reviews.map(review => (
                <div key={review.postId} className="together-post-card" onClick={() => navigate(`/review/${review.postId}?category=${selectedCategory}`)} style={{ cursor: 'pointer' }}>
                  {/* 상단: 프로필/닉네임/날짜 */}
                  <div className="together-post-top-row">
                    <div className="together-post-info-row">
                      <div className="together-profile together-profile-default" />
                      <span className="together-username">{review.nickname} 님</span>
                      <div className="together-info-divider" />
                      <span className="together-date">{new Date(review.createdAt).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                      {/* 별점 (졸업/휴학여행, 국내학점교류, 해외교환학생 카테고리인 경우) */}
                      {(selectedCategory === "졸업/휴학여행" || selectedCategory === "국내학점교류" || selectedCategory === "해외교환학생") && (
                        <div className="together-rating-container">
                          {renderStars(review.rating)}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* 제목+내용 */}
                  <div className="together-main-row">
                    <div className="together-main-texts">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="together-post-title">{review.title}</div>
                      </div>
                      <div className="together-post-content">{review.content}</div>
                    </div>
                  </div>
                  {/* 태그들 */}
                  <div style={{ marginTop: '16px', marginRight: '0px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <span className="together-tag together-tag-main">#{review.categoryName}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 플로팅 글쓰기 버튼 */}
      <button
        className="together-floating-write-btn"
        onClick={() => navigate('/review-write?category=' + selectedCategory)}
      >
        <img src={writeIcon} alt="글쓰기" style={{ width: 120, height: 120 }} />
      </button>
    </div>
  );
};

export default TogetherPage; 