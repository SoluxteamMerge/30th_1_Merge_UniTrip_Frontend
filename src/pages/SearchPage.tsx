import React, { useState } from "react";
import Header from "../components/Header/Header";
import searchIcon from '../assets/search_icon.svg';
import "./mainpage/MainPage.css"; // 기존 메인페이지 CSS 재사용

const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const [submitted, setSubmitted] = useState(false);   //엔터 입력 여부 상태

    const [selectedRegion, setSelectedRegion] = useState<string | null>(null); // 지역 선택 상태
    const [selectedPeople, setSelectedPeople] = useState<string | null>(null); // 인원 선택 상태

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setSubmitted(true);
      }
    };

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

        {/* 필터 섹션 (지역/인원/금액) */}
        <section style={{ padding: "32px 160px 16px" }}>
          <div style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: "28px 32px",
            border: "1px solid #ccc",
            fontFamily: "Pretendard, sans-serif"
          }}>
            <div style={{ marginBottom: 24, fontSize: 18, fontWeight: 600 }}>지역</div>
            {/* 첫 번째 줄: 서울~경기 */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                {["서울", "인천", "대전", "대구", "광주", "부산", "울산", "세종", "경기"].map(region => (
                    <label key={region} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
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
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
                {["강원", "충북", "충남", "경북", "경남", "전북", "전남", "제주", "전체보기"].map(region => (
                    <label key={region} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
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

            <div style={{ marginBottom: 24, fontSize: 18, fontWeight: 600 }}>인원</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
              {["1인", "2인", "3~4인", "4~8인", "10명 이상", "전체보기"].map(option => (
                <label key={option} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <input
                        type="radio"
                        name="people"
                        value={option}
                        checked={selectedPeople === option}
                        onChange={() => setSelectedPeople(option)}
                        style={{
                        accentColor: "#0B0B61",
                        width: 16,
                        height: 16
                        }}
                    />
                    <span style={{ color: selectedPeople === option ? "#0B0B61" : "#333", fontWeight: selectedPeople === option ? 600 : 400 }}>
                        {option}
                    </span>
                    </label>
                ))}
            </div>

            <div style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>금액</div>
            <div style={{ display: "flex", gap: 12 }}>
              <input type="number" placeholder="최소 금액" style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc" }} />
              <span style={{ alignSelf: "center" }}>-</span>
              <input type="number" placeholder="최대 금액" style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc" }} />
            </div>
          </div>
        </section>

        {/* 관련 리뷰 섹션 - 검색어 입력 후 엔터 눌렀을 때 조건부 렌더링  */}
        {submitted && (
          <section style={{ padding: "48px 160px 120px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ color: "#0B0B61", fontSize: 20, fontWeight: 600 }}>관련된 0개의 리뷰</h3>
              <select style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #ccc" }}>
                <option value="latest">최신순</option>
                <option value="popular">인기순</option>
                <option value="rating">별점순</option>
              </select>
            </div>

            <div style={{
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              padding: "80px 32px",
              textAlign: "center",
              borderRadius: 24,
              fontFamily: "Pretendard, sans-serif"
            }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#333" }}>해당 옵션 검색 결과 없음</p>
              <p style={{ color: "#888", fontSize: 14, marginTop: 8 }}>청춘시는 결과가 보이지 않아요! 내가 먼저 후기를 남겨볼까요?</p>
              <button style={{
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
          </section>
        )}
      </div>
    </>
  );
};

export default SearchPage;
