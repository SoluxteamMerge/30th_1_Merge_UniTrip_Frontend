  import React, { useState } from "react";
  import Header from "../components/Header/Header";
  import searchIcon from '../assets/search_icon.svg';
  import "./mainpage/MainPage.css"; // 기존 메인페이지 CSS 재사용
  import { useNavigate } from "react-router-dom"; // 이미 있으면 생략
  import grayThumbnail from "../assets/gray-thumbnail.svg";


  import { ReviewCard } from "../pages/reviewcard/ReviewCard";
  import './mainpage/MainPage.css';
  import SortDropdown from "../components/SortDropdown"; //리뷰 정렬 드롭다운


  const dummyReviews = [
    {
    postId: 1, 
    thumbnailUrl:  "https://picsum.photos/200/100?random=101", 
    title: "제주도 3박 4일 여행",
    categoryName: "#제주도, #4인여행", 
    nickname: "김눈송", 
    createdAt: "2025-07-23", 
    likes: 0,
    scrapCount: 1,
    rating: 1,
    isLiked: false,
    isScraped: false,
  },
    {
    postId: 2, 
    thumbnailUrl: "https://picsum.photos/200/100?random=102", 
    title: "설악산 단풍 구경 2박 3일",
    categoryName: "#설악산, #가을여행",
    nickname: "김눈송", 
    createdAt: "2025-07-23", 
    likes: 2,
    scrapCount: 1,
    rating: 1,
    isLiked: false,
    isScraped: false,
  },
  {
    postId: 3, 
    thumbnailUrl: "https://picsum.photos/200/100?random=103", 
    title: "설악산 3",
    categoryName: "#설악산", 
    nickname: "김눈송", 
    createdAt: "2025-07-23", 
    likes: 0,
    scrapCount: 3,
    rating: 1,
    isLiked: false,
    isScraped: false,
  },
  {
    postId: 4, 
    thumbnailUrl:  "https://picsum.photos/200/100?random=104", 
    title: "설악산 4",
    categoryName: "#여행", 
    nickname: "김눈송", 
    createdAt: "2025-07-23", 
    likes: 5,
    scrapCount: 1,
    rating: 1,
    isLiked: false,
    isScraped: false,
  },
  {
    postId: 5, 
    thumbnailUrl: "https://picsum.photos/200/100?random=102", 
    title: "설악산 5",
    categoryName: "#여행", 
    nickname: "김눈송", 
    createdAt: "2025-07-23", 
    likes: 2,
    scrapCount: 2,
    rating: 3,
    isLiked: false,
    isScraped: false,
  },

  ];

  

  const SearchPage: React.FC = () => {
      const navigate = useNavigate(); 
      const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
      const [submitted, setSubmitted] = useState(false);   //엔터 입력 여부 상태
      const [selectedRegion, setSelectedRegion] = useState<string | null>(null); // 라디오 전체 지역 선택 상태
      const [sortOption, setSortOption] = useState("최신순"); //정렬(최신순, 인기순, 즐겨찾기순, 공감순)

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          setSubmitted(true);
        }
      };

      {/*검색어 필터링*/}
      const filteredReviews = dummyReviews.filter(review =>
        review.title.includes(searchQuery)
      ).slice(0, 6);

      {/*리뷰 정렬(최신순, 인기순, 스크랩순, 공감순)*/}
      const sortedReviews = [...filteredReviews].sort((a, b) => {
      switch (sortOption) {
        //case "인기순": 
          //return b.starCount - a.starCount;
        case "스크랩순": 
          return b.scrapCount - a.scrapCount;
        case "공감순": 
          return b.likes - a.likes;
        //case "최신순":
        default:
          return 0; // 정렬하지 않음 → 원래 순서 유지 (최신순이라고 간주)

      }
    }).slice(0, 6); // 6개만 잘라서 보여주기
    


    return (
      <>
        <Header />

        <div className="mainpage-background">
          {/* 검색 섹션 */}
          <section className="mainpage-search-section">
            <h2 className="mainpage-sectiontitle">▶ 청춘 발자국</h2>

            <div className="mainpage-search-container">
              <img src={searchIcon} alt="검색 아이콘" className="mainpage-search-icon"/>
              <input
                type="text"
                //value="검색어를 입력하세요"
                className="mainpage-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown} // 엔터 입력 감지
              />
            </div>
          </section>

          {/* 필터 섹션 (지역) */}
          <section style={{ display: "flex", justifyContent: "center", paddingTop: 32, paddingBottom: 16 }}>
            <div style={{
              width: "calc(100vw - 400px)",   // 검색창과 동일한 너비
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: "28px 32px",
              border: "1px solid #ccc",
              fontFamily: "Pretendard, sans-serif",
              display: "flex",                 // 가로 정렬
              alignItems: "flex-start",
              justifyContent: "center",   // 가운데 정렬 추가
              flexWrap: "wrap",
              gap: 50,                      // 버튼 간 간격

            }}>
              <div style={{  
                fontSize: 18, 
                fontWeight: 700, 
                color: "#0B0B61",
                marginRight: 16, // ← 지역 텍스트 오른쪽 여백
                paddingTop: 4
                }}>지역</div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* 첫 번째 줄: 서울~경기 */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 50, marginBottom: 3 }}>
                    {["서울", "인천", "대전", "대구", "광주", "부산", "울산", "세종", "경기"].map(region => (
                        <label key={region} style={{ 
                          display: "flex",
                          alignItems: "center", 
                          gap: 6, 
                          cursor: "pointer" 
                        }}>
                        <input
                            type="radio"
                            name="region"
                            value={region}
                            checked={selectedRegion === region}
                            onChange={() => setSelectedRegion(region)}
                            style={{
                            accentColor: "#0B0B61",
                            width: 16,
                            height: 16
                            }}
                        />
                        <span style={{ color: selectedRegion === region ? "#0B0B61" : "#333", fontWeight: selectedRegion === region ? 600 : 400 }}>
                            {region}
                        </span>
                        </label>
                    ))}
                    </div>

                    {/* 두 번째 줄: 강원~제주 */}
                    <div style={{ 
                      display: "flex", 
                      flexWrap: "wrap", 
                      gap: 50, 
                      }}
                    >
                    {["강원", "충북", "충남", "경북", "경남", "전북", "전남", "제주"].map(region => (
                      <label key={region} //label = 드롭다운을 열고 닫는 트리거 버튼
                        style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: 6, 
                          cursor: "pointer" ,
                          //position: region === "전체보기" ? "relative" : "static",
                          position: "relative" 
                        }}
                        >
                        <input
                            type="radio"
                            name="region"
                            value={region}
                            checked={selectedRegion === region}
                            onChange={() => setSelectedRegion(region)}
                            style={{
                            accentColor: "#0B0B61",
                            width: 16,
                            height: 16
                            }}
                        />
                          <span style={{ color: selectedRegion === region ? "#0B0B61" : "#333", fontWeight: selectedRegion === region ? 600 : 400 }}>
                              {region}
                          </span>

                      </label>
                    ))}

                  </div>     
              </div>       
            </div>
          </section>

          {/* 관련 리뷰 섹션 - 검색어 입력 후 엔터 눌렀을 때 조건부 렌더링  */}
          {submitted && (
            <section style={{ padding: "48px 160px 120px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, width: "calc(100vw - 400px)",margin: "0 auto" }}>
                <h3 style={{ color: "#0B0B61", fontSize: 20, fontWeight: 600, marginBottom:30 }}>
                  관련된 {filteredReviews.length}개의 리뷰
                </h3>

                <SortDropdown value={sortOption} onChange={setSortOption} /> {/*정렬 드롭다운 - 최신순 인기순 공감순 스크랩순 */}                        
              </div>
              

              {filteredReviews.length === 0 ? (
              <div style={{
                width: "calc(100vw - 400px)",
                margin: "0 auto",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                padding: "80px 32px",
                textAlign: "center",
                borderRadius: 24,
                //fontFamily: "Pretendard, sans-serif"
              }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: "#333" }}>해당 옵션 검색 결과 없음</p>
                <p style={{ color: "#888", fontSize: 14, marginTop: 8 }}>청춘시는 결과가 보이지 않아요! 내가 먼저 후기를 남겨볼까요?</p>
                <button 
                onClick={() => navigate("/review-write")}
                style={{
                  marginTop: 20,
                  backgroundColor: "#0B0B61",
                  color: "white",
                  fontWeight: 600,
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer"
                }}>직접 후기 쓰기</button>
              </div>
              ) : (
                <div 
                  className="review-grid"
                  style={{ backgroundColor: "transparent" }}
                >
                  {sortedReviews.map((review) => (
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
                        rating={review.rating}
                        isLiked={review.isLiked}
                        isScraped={review.isScraped}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

        </div>
      </>
    );
  };

  export default SearchPage;