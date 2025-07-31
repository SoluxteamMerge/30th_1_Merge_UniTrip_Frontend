  import React, { useEffect, useState } from "react";
  import Header from "../components/Header/Header";
  import searchIcon from '../assets/search_icon.svg';
  import "./mainpage/MainPage.css"; // 기존 메인페이지 CSS 재사용
  import { useNavigate } from "react-router-dom"; 
  import { ReviewCardTwo } from "../pages/reviewcard/ReviewCardTwo";

  import SortDropdown from "../components/SortDropdown"; //리뷰 정렬 드롭다운
  import Pagination from "../components/Pagination";

  import { getPlaceByRegion } from "../api/getPlaceByRegion";
  import { searchReviews } from "../api/search/searchReviews";
  import { getPopularKeywords } from "../api/popularKeywords/getPopularKeywords";
  import { updateKeywordRank } from "../api/popularKeywords/updateKeywordRank"; // import 추가



  // const dummyReviews = [
  //   {
  //   postId: 1, 
  //   thumbnailUrl:  "https://picsum.photos/200/100?random=101", 
  //   title: "제주도 3박 4일 여행",
  //   categoryName: "#제주도, #4인여행", 
  //   nickname: "김눈송", 
  //   createdAt: "2025-07-23", 
  //   likes: 0,
  //   scrapCount: 1,
  //   rating: 1,
  //   isLiked: false,
  //   isScraped: false,
  // },
  //   {
  //   postId: 2, 
  //   thumbnailUrl: "https://picsum.photos/200/100?random=102", 
  //   title: "설악산 단풍 구경 2박 3일",
  //   categoryName: "#설악산, #가을여행",
  //   nickname: "김눈송", 
  //   createdAt: "2025-07-23", 
  //   likes: 2,
  //   scrapCount: 1,
  //   rating: 1,
  //   isLiked: false,
  //   isScraped: false,
  // },
  // {
  //   postId: 3, 
  //   thumbnailUrl: "https://picsum.photos/200/100?random=103", 
  //   title: "설악산 3",
  //   categoryName: "#설악산", 
  //   nickname: "김눈송", 
  //   createdAt: "2025-07-23", 
  //   likes: 0,
  //   scrapCount: 3,
  //   rating: 1,
  //   isLiked: false,
  //   isScraped: false,
  // },
  // {
  //   postId: 4, 
  //   thumbnailUrl:  "https://picsum.photos/200/100?random=104", 
  //   title: "설악산 4",
  //   categoryName: "#여행", 
  //   nickname: "김눈송", 
  //   createdAt: "2025-07-23", 
  //   likes: 5,
  //   scrapCount: 1,
  //   rating: 1,
  //   isLiked: false,
  //   isScraped: false,
  // },
  // {
  //   postId: 5, 
  //   thumbnailUrl: "https://picsum.photos/200/100?random=102", 
  //   title: "설악산 5",
  //   categoryName: "#여행", 
  //   nickname: "김눈송", 
  //   createdAt: "2025-07-23", 
  //   likes: 2,
  //   scrapCount: 2,
  //   rating: 3,
  //   isLiked: false,
  //   isScraped: false,
  // },
  // {
  //   postId: 6, 
  //   thumbnailUrl: "https://picsum.photos/200/100?random=102", 
  //   title: "설악산 6",
  //   categoryName: "#여행", 
  //   nickname: "김눈송", 
  //   createdAt: "2025-07-23", 
  //   likes: 2,
  //   scrapCount: 2,
  //   rating: 3,
  //   isLiked: false,
  //   isScraped: false,
  // },
  // {
  //   postId: 7, 
  //   thumbnailUrl: "https://picsum.photos/200/100?random=102", 
  //   title: "설악산 7",
  //   categoryName: "#여행", 
  //   nickname: "김눈송", 
  //   createdAt: "2025-07-23", 
  //   likes: 2,
  //   scrapCount: 2,
  //   rating: 3,
  //   isLiked: false,
  //   isScraped: false,
  // },
  // {
  //   postId: 8, 
  //   thumbnailUrl: "https://picsum.photos/200/100?random=102", 
  //   title: "설악산 8",
  //   categoryName: "#여행", 
  //   nickname: "김눈송", 
  //   createdAt: "2025-07-23", 
  //   likes: 2,
  //   scrapCount: 2,
  //   rating: 3,
  //   isLiked: false,
  //   isScraped: false,
  // },

  // ];

  
  //const popularKeywords = ["부산", "제주", "바다", "광안리", "속초", "강릉", "MT", "대구", "전주", "힐링"];

  const SearchPage: React.FC = () => {
      const navigate = useNavigate(); 
      const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
      const [selectedRegion, setSelectedRegion] = useState<string | null>(null); // 라디오 전체 지역 선택 상태

      const [sortOption, setSortOption] = useState("인기순"); //정렬(최신순, 인기순, 즐겨찾기순, 공감순)

      const [regionReviews, setRegionReviews] = useState<any[]>([]);
      const [isRegionFiltered, setIsRegionFiltered] = useState(false);

      const [searchResults, setSearchResults] = useState<any[]>([]);
      const [isSearchActive, setIsSearchActive] = useState(false);

      const [popularKeywords, setPopularKeywords] = useState<{ keyword: string, rank: number, searchCount: number }[]>([]);

      //console.log("🔥 SearchPage 렌더링됨");

      //인기 키워드 조회
      useEffect(() => {
        const fetchPopularKeywords = async () => {
          try {
            const keywords = await getPopularKeywords(10);
            console.log("받은 인기 키워드:", keywords); // 콘솔 로그
            setPopularKeywords(keywords);// 상태 업데이트 완료
          } catch (err) {
            console.error("인기 키워드 조회 안됨:", err);
          }
        };
        fetchPopularKeywords();
      }, []);

      //인기 검색어 하루 단위로 갱신
      useEffect(() => {
        const now = Date.now(); // 현재 시간(ms)
        const lastUpdateTime = parseInt(localStorage.getItem("lastKeywordUpdateTime") || "0", 10);
        const fiveMinutes = 5 * 60 * 1000; // 5분 in ms

        if (now - lastUpdateTime > fiveMinutes) {
          updateKeywordRank()
            .then(() => {
              console.log("🔥 인기 키워드 랭킹 5분 단위로 갱신 완료");
              localStorage.setItem("lastKeywordUpdateDate", now.toString()); // 성공 시에만 저장
            })
            .catch((err) => {
              console.error("인기 키워드 랭킹 갱신 안됨:", err.message);
            });
        }
      }, []);

      {/*정렬*/}
      //regionReviews에서 정렬 후 사용(지역 필터 결과 정렬)
      const reviewsToShow = [...regionReviews].sort((a, b) => {
        switch (sortOption) {
          case "스크랩순":
            return b.scrapCount - a.scrapCount;
          case "공감순":
            return b.likeCount - a.likeCount;
          case "최신순":
            return b.postId - a.postId;
          case "인기순":
            return b.rating - a.rating;
          default:
            return 0; // 기본 순서 유지
        }
      });
      //검색 결과(searchResults)에도 정렬 적용
      const sortedSearchResults = [...searchResults].sort((a, b) => {
        switch (sortOption) {
          case "스크랩순":
            return b.bookmarkCount - a.bookmarkCount;
          case "공감순":
            return b.likedCount - a.likedCount;
          case "최신순":
            return b.postId - a.postId;
          case "인기순":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });

      {/*지역 필터 -> 함수로 만듦*/}
      const handleRegionChange = async (region: string) => {
        setSelectedRegion(region);

        if (region === "전체보기") {
          setIsRegionFiltered(false);
          setRegionReviews([]);
          return;
        }

        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            alert("로그인이 필요합니다.");
            return;
          }

          const response = await getPlaceByRegion(region, token);

          if (response.code === 200) {
            setRegionReviews(response.data); // ✔ 성공 시만 데이터 적용
          }else{
            setRegionReviews([]); // 실패 시 빈 배열
          }

          setIsRegionFiltered(true);
        } catch (error: any) {
          console.error("지역 필터링 실패:", error);
          alert(error?.response?.data?.message || "지역 필터링에 실패했습니다.");
        }
      };



      const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log("💡 handleKeyDown 호출됨");
        
        if (e.key === "Enter") {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            alert("로그인이 필요합니다.");
            return;
          }

           // 공백이나 빈 문자열 감지
          if (!searchQuery.trim()) {
            alert("검색어를 입력해주세요.");
            return;
          }
          try {
            setIsRegionFiltered(false);
            setRegionReviews([]);

            console.log("💥 searchReviews 호출됨:", searchQuery);
            const response = await searchReviews(searchQuery, token); // 공통 함수로 변경

            console.log("🔍 검색 결과:", response);

            if (response.code === 200 && Array.isArray(response.data)) {
              setSearchResults(response.data);
            } else {
              setSearchResults([]);
            }

            setIsSearchActive(true);
          } catch (error: any) {
            console.error("검색 오류:", error);
            alert(error?.response?.data?.message || "검색에 실패했습니다.");
          }
        }
      };

      // 예: 인기 키워드 클릭 시
      const handleKeywordClick = async (keyword: string) => {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            alert("로그인이 필요합니다.");
            return;
          }

          setIsRegionFiltered(false);
          setRegionReviews([]);
          setSearchQuery(keyword);

          const response = await searchReviews(keyword, token, true); 

          if (response.code === 200 && Array.isArray(response.data)) {
            setSearchResults(response.data); // 응답 포맷 둘 다 처리
          } else {
            setSearchResults([]);
          }

          setIsSearchActive(true);
        } catch (err: any) {
          alert(err.message || "검색 중 오류 발생");
        }
      };



      {/*검색어 필터링 - 삭제(주석처리)
      const filteredReviews = dummyReviews.filter((review) =>
        review.title.includes(searchQuery)
      );
      */}

      {/*리뷰 정렬(최신순, 인기순, 스크랩순, 공감순) - 삭제(주석처리)
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
    })//.slice(0, 6); // 6개만 잘라서 보여주기
    */}

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
          

          {/* 필터 섹션 (지역 + 인기 검색어) */}
          <section style={{ display: "flex", justifyContent: "center", paddingTop: 32, paddingBottom: 16 }}>

            {/* 바깥 wrapper: 검색창과 동일 너비 */}
            <div style={{
              width: "calc(100vw - 400px)",   // 검색창과 동일한 너비
              //backgroundColor: "#fff",
              //borderRadius: 16,
              //padding: "28px 32px",
              //border: "1px solid #ccc",
              //fontFamily: "Pretendard, sans-serif",
              display: "flex",                 // 가로 정렬
              //alignItems: "flex-start",
              //justifyContent: "center",   // 가운데 정렬 추가
              justifyContent: "space-between",
              alignItems: "flex-start", 
              //flexWrap: "wrap",
              gap: 32, // 버튼 간 간격
              }}
            >

              {/* 왼쪽: 지역 선택 필터 */}
              <div style={{  
                flex: 1,
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: "28px 32px",
                border: "1px solid #ccc",
                fontFamily: "Pretendard, sans-serif",
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                }}
                >
                  {/* 지역 제목 */}
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#0B0B61", width: "100%" }}>지역</div>
       
              
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {/* 첫 번째 줄: 서울~경기 */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 50, paddingLeft: 24, }}>
                      {["서울", "인천", "대전", "대구", "광주", "부산", "울산", "세종", "경기"].map((region) => (
                        <label key={region} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="region"
                            value={region}
                            checked={selectedRegion === region}
                            onChange={() => handleRegionChange(region)}

                            style={{ accentColor: "#0B0B61", width: 16, height: 16 }}
                          />
                          <span style={{ color: selectedRegion === region ? "#0B0B61" : "#333", fontWeight: selectedRegion === region ? 600 : 400 }}>{region}</span>
                        </label>
                      ))}
                    </div>

                    {/* 두 번째 줄: 강원~제주 */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 50, paddingLeft: 24, }}>
                      {["강원", "충북", "충남", "경북", "경남", "전북", "전남", "제주", "전체보기"].map((region) => (
                        <label key={region} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="region"
                            value={region}
                            checked={selectedRegion === region}
                            onChange={() => handleRegionChange(region)}
                            
                            style={{ accentColor: "#0B0B61", width: 16, height: 16 }}
                          />
                          <span style={{ color: selectedRegion === region ? "#0B0B61" : "#333", fontWeight: selectedRegion === region ? 600 : 400 }}>{region}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 오른쪽: 인기 검색어 박스 */}
                <div
                  style={{
                    width: 210,
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 16,
                    padding: "20px 16px",
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: 14,
                    color: "#0B0B61",
                  }}
                >
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🔥 인기 검색어</h4>
                  <ul style={{ paddingLeft: 12, listStyle: "none" }}>
                    {popularKeywords.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleKeywordClick(item.keyword)}
                        style={{
                          marginBottom: 6,
                          fontSize: 16,
                          color: "#000",
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        {item.rank}. {item.keyword}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          </section>


          {/* 관련 리뷰 섹션 - 검색어 입력 후 엔터 눌렀을 때 조건부 렌더링  */}
          {isRegionFiltered && (// 필터링된 regionReviews를 reviewsToShow로 보여줌
            <section style={{ padding: "48px 160px 120px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "calc(100vw - 400px)",margin: "0 auto 30px" }}>
                
                <h3 style={{ color: "#0B0B61", fontSize: 20, fontWeight: 600, }}>
                  관련된 {reviewsToShow.length}개의 리뷰
                </h3>

                <SortDropdown value={sortOption} onChange={setSortOption} /> {/*정렬 드롭다운 - 인기순 최신순 공감순 스크랩순 */}                        
              </div>
              
              
              {reviewsToShow.length === 0 ? (
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
                <p style={{ color: "#888", fontSize: 14, marginTop: 8 }}>찾으시는 결과가 보이지 않아요! 내가 먼저 후기를 남겨볼까요?</p>
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
              ) : 
              (
                <Pagination
                  items={reviewsToShow}
                  itemsPerPage={6}
                  renderItem={(review) => (
                    <div key={review.postId} onClick={() => navigate(`/youth-talk/${review.postId}`)}>
                      <ReviewCardTwo
                        postId={review.postId}
                        title={review.postTitle}
                        categoryName={review.categoryName}
                        thumbnailUrl={review.imageUrl}
                        nickname={review.nickname}
                        //createdAt={review.createdAt}
                        likes={review.likeCount}
                        scrapCount={review.scrapCount}
                        rating={review.rating}
                        isLiked={false} //일단 false로
                        isScraped={false} //일단 false로
                      />
                    </div>
                  )}
                />
              )}
            </section>
          )}

          {isSearchActive && (
            <section style={{ padding: "48px 160px 120px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "calc(100vw - 400px)",margin: "0 auto 30px" }}>
                <h3 style={{ color: "#0B0B61", fontSize: 20, fontWeight: 600 }}>
                  "{searchQuery}" 검색 결과 ({searchResults.length}개)
                </h3>
                <SortDropdown value={sortOption} onChange={setSortOption} />
              </div>

              {searchResults.length === 0 ? (
                <div style={{
                  width: "calc(100vw - 400px)",
                  margin: "0 auto",
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                  padding: "80px 32px",
                  textAlign: "center",
                  borderRadius: 24,
                }}>
                  <p style={{ fontSize: 18, fontWeight: 600, color: "#333" }}>해당 옵션 검색 결과 없음</p>
                  <p style={{ color: "#888", fontSize: 14, marginTop: 8 }}>찾으시는 결과가 없어요! 직접 후기를 남겨볼까요?</p>

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
                <Pagination
                  items={sortedSearchResults} //정렬된 배열
                  itemsPerPage={6}
                  renderItem={(review) => (
                    <div key={review.postId} onClick={() => navigate(`/youth-talk/${review.postId}`)}>
                      <ReviewCardTwo
                        postId={review.postId}
                        title={review.postTitle}
                        categoryName={review.categoryName}
                        thumbnailUrl={review.imageUrl} 
                        nickname={review.nickname}
                        likes={review.likeCount}
                        scrapCount={review.scrapCount}
                        rating={review.rating} 
                        isLiked={false}
                        isScraped={false}
                      />
                    </div>
                  )}
                />
              )}
            </section>
          )}

        </div>
      </>
    );
  };

  export default SearchPage;