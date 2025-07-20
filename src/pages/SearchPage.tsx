import React, { useState } from "react";
import Header from "../components/Header/Header";
import searchIcon from '../assets/search_icon.svg';
import "./mainpage/MainPage.css"; // 기존 메인페이지 CSS 재사용
import { useNavigate } from "react-router-dom"; // 이미 있으면 생략
import grayThumbnail from "../assets/gray-thumbnail.svg";
import starIcon from "../assets/interaction/star-icon.svg";
import empathyIcon from "../assets/interaction/empathy.svg";
import scrapIcon from "../assets/interaction/scrap-icon.svg";


const dummyReviews = [
  {
    id: 1,
    image:grayThumbnail,
    title: "동기들과 함께 제주도 3박 4일 여행",
    tags: ["#제주도", "#4인여행"],
    author: "김눈송",
    starCount: 1,
    empathyCount: 0,
    scrapCount: 1,
  },
  {
    id: 2,
    image:grayThumbnail,
    title: "설악산 단풍 구경 2박 3일",
    tags: ["#설악산", "#가을여행"],
    author: "김눈송",
    starCount: 2,
    empathyCount: 0,
    scrapCount: 2,
  },
  {
    id: 3,
    image:grayThumbnail,
    title: "설악산 2",
    tags: ["#태그1", "#태그2"],
    author: "김눈송",
    starCount: 3,
    empathyCount: 0,
    scrapCount: 3,
  },
  {
    id: 4,
    image:grayThumbnail,
    title: "설악산 3",
    tags: ["#태그1", "#태그2"],
    author: "김눈송",
    starCount: 4,
    empathyCount: 0,
    scrapCount: 4,
  },
  {
    id: 5,
    image:grayThumbnail,
    title: "설악산 4",
    tags: ["#태그1", "#태그2"],
    author: "김눈송",
    starCount: 5,
    empathyCount: 0,
    scrapCount: 5,
  },
  {
    id: 6,
    image:grayThumbnail,
    title: "설악산 5",
    tags: ["#태그1", "#태그2"],
    author: "김눈송",
    starCount: 6,
    empathyCount: 0,
    scrapCount: 6,
  },
  
];

const dropdownRegions = [
  ["부산", "제주", "바다", "광안리", "속초"],
  ["강릉", "MT", "대구", "전주", "힐링"]
];

const SearchPage: React.FC = () => {
    const navigate = useNavigate(); 

    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const [submitted, setSubmitted] = useState(false);   //엔터 입력 여부 상태

    const [selectedRegion, setSelectedRegion] = useState<string | null>(null); // 지역 선택 상태
    const [showDropdown, setShowDropdown] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setSubmitted(true);
      }
    };
    {/*검색어 필터링*/}
    const filteredReviews = dummyReviews.filter(review =>
      review.title.includes(searchQuery)
    ).slice(0, 6);

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
              //value="검색어를 입력하세요"
              className="mainpage-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown} // 엔터 입력 감지
            />
          </div>
        </section>

        {/* 필터 섹션 (지역) */}
        <section style={{ padding: "32px 160px 16px" }}>
          <div style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: "28px 32px",
            border: "1px solid #ccc",
            fontFamily: "Pretendard, sans-serif",
            display: "flex",                 // ← 가로 정렬
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 50                      // ← 버튼 간 간격
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

                  {/* 두 번째 줄: 강원~전체보기 */}
                  <div style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: 50, 
                    }}
                  >
                  {["강원", "충북", "충남", "경북", "경남", "전북", "전남", "제주", "전체보기"].map(region => (
                      <label key={region} 
                      onClick={() => {
                        if (region === "전체보기") {
                          setShowDropdown(prev => !prev);
                          setSelectedRegion(region);
                        }
                      }}
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
                    

                        {/* 전체보기 드롭다운 */}
                        {region === "전체보기" && showDropdown && (
                        <div style={{ 
                          position: "absolute", 
                          top: 30, 
                          left: 0, 
                          background: "#fff", 
                          border: "1px solid #ccc", 
                          borderRadius: 12, 
                          padding: 0, 
                          width: 360, // 너비 조정
                          display: "grid", 
                          gridTemplateColumns: "1fr 1px 1fr",  
                          zIndex: 10 ,
                          }}
                        >
                          {/* 왼쪽 컬럼 */} 
                          <div style={{ display: "flex", flexDirection: "column", paddingTop:32, paddingBottom:32 }}>
                            
                            {/* 상단 가로선 */}
                            <div style={{ height: 1, backgroundColor: "#eee", width: "100%" }}></div>
                            {dropdownRegions[0].map((regionName, index) => (
                              <div 
                              key={index} 
                              style={{ 
                                display: "flex", 
                                gap: 8, 
                                borderBottom: "1px solid #eee", 
                                padding: "8px 12px",
                                transition: "background-color 0.2s ease",
                                cursor: "pointer",
                              }}
                              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                              >
                                <span style={{ width: 20 }}>{index + 1}.</span>
                                <span>{regionName}</span>
                              </div>
                            ))}
                          </div>

                          {/* 세로 구분선 */}
                          <div
                            style={{
                              backgroundColor: "#eee",
                              width: 1,
                              alignSelf: "center",    // 중앙 정렬
                              height: "calc(100% - 64px)", // ← 위아래 padding 합친 높이만큼 빼줌 (32+32)
                              marginTop: 0,
                              marginBottom: 0
                            }}
                          />

                          {/* 오른쪽 컬럼 */}
                          <div style={{ display: "flex", flexDirection: "column",  paddingTop: 32, paddingBottom: 32}}>
                            {/* 상단 가로선 */}
                            <div style={{ height: 1, backgroundColor: "#eee", width: "100%" }}></div>

                            {dropdownRegions[1].map((regionName, index) => (
                              <div 
                              key={index} 
                              style={{ 
                                display: "flex", 
                                gap: 8, 
                                borderBottom: "1px solid #eee", 
                                padding: "8px 12px" ,
                                transition: "background-color 0.2s ease",
                                cursor: "pointer",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                              >
                                <span style={{ width: 20 }}>{index + 6}.</span>
                                <span>{regionName}</span>
                              </div>
                            ))}
                          </div>

                        </div>
                      )}
                    </label>
                  ))}

                </div>     
            </div>       
          </div>
        </section>

        {/* 관련 리뷰 섹션 - 검색어 입력 후 엔터 눌렀을 때 조건부 렌더링  */}
        {submitted && (
          <section style={{ padding: "48px 160px 120px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ color: "#0B0B61", fontSize: 20, fontWeight: 600 }}>
                관련된 {filteredReviews.length}개의 리뷰
              </h3>
              <select style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #ccc" }}>
                <option value="latest">최신순</option>
                <option value="popular">인기순</option>
                <option value="rating">즐겨찾기순</option>
                <option value="rating">공감순</option>
              </select>
            </div>

            {filteredReviews.length === 0 ? (
            <div style={{
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
                {filteredReviews.map((review) => (
                  <div key={review.id} style={{ backgroundColor: "#fff", borderRadius: 16, boxShadow: "0 1px 6px #0001", overflow: "hidden" }}>
                    <img src={review.image} alt={review.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />

                    <div style={{ padding: 16 }}>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <p style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>{review.author}</p>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <img src={starIcon} alt="댓글" style={{ width: 16, height: 16 }} />
                            <span style={{ fontSize: 13, color: "#333" }}>{review.starCount}</span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <img src={empathyIcon} alt="공감" style={{ width: 16, height: 16 }} />
                            <span style={{ fontSize: 13, color: "#333" }}>{review.empathyCount}</span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <img src={scrapIcon} alt="스크랩" style={{ width: 16, height: 16 }} />
                            <span style={{ fontSize: 13, color: "#333" }}>{review.scrapCount}</span>
                          </div>

                        </div>
                      </div>
                      <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{review.title}</p>
                      <div style={{ fontSize: 12, color: "#888" }}>{review.tags.join(", ")}</div>
                    </div>
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
