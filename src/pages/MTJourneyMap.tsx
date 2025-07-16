import React from "react";
import Header from "../components/Header/Header"

const MTJourneyMap: React.FC = () => {
  const username = "김눈송";

  const pageBgStyle = { background: "#e8f0f2", minHeight: "100vh" };
  const containerStyle = { maxWidth: 1200, margin: "0 auto", padding: "40px 0" };
  const titleBoxStyle = {
    fontWeight: 700,
    fontSize: 22,
    color: "#0b0b61",
    display: "flex",
    alignItems: "center",
    marginBottom: 24
  };
  const titleIconStyle = { fontSize: 20, marginRight: 8 };

  const sortButtonStyle = {
    position: "relative" as const,
    display: "inline-block",
    marginBottom: 24,
    marginLeft: "auto"
  };

  return (
    <div style={pageBgStyle}>
      <Header isLoggedIn={true} username={username} profileUrl="" />

      <div style={containerStyle}>
        {/* 제목 */}
        <div style={titleBoxStyle}>
          <span style={titleIconStyle}>▶</span>MT여정지도
        </div>

        {/* 정렬 드롭다운 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 18, color: "#0b0b61", margin: 0 }}>리뷰모음</h3>

          <div style={sortButtonStyle}>
            <select style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #ccc" }}>
              <option value="latest">최신순</option>
              <option value="popular">인기순</option>
              <option value="rating">별점순</option>
            </select>
          </div>
        </div>

        {/* 리뷰 카드 영역 (지금은 아무것도 없음) */}
        <div style={{ marginTop: 32 }}>
          {/* 리뷰 카드 비어 있음 */}
        </div>
      </div>

      {/* 플로팅 버튼 */}
      <button
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          background: "#2c3e50",
          color: "#fff",
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "none",
          fontSize: 28,
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
        }}
      >
        ✎
      </button>
    </div>
  );
};

export default MTJourneyMap;
