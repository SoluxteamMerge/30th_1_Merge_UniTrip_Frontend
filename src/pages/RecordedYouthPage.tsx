import React from "react";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";



const RecordedYouthPage: React.FC = () => {
  const username = "김눈송"; // 실제 로그인 사용자 정보와 연동 필요

  // 💡 스타일
  const pageBgStyle = { background: "#e8f0f2", minHeight: "100vh" };
  const containerStyle = { maxWidth: 1200, margin: "0 auto", padding: "40px 0" };
  const titleBoxStyle = {
    fontWeight: 700,
    fontSize: 22,
    color: "#0b0b61",
    display: "flex",
    alignItems: "center",
    marginBottom: 16
  };
  const titleIconStyle = { fontSize: 20, marginRight: 8 };

  return (
    <div style={pageBgStyle}>
      {/* Header에 전달되는 사용자 정보도 실제 로그인 데이터로 연동 필요 */}
      <Header isLoggedIn={true} username={username} profileUrl="" />

      <div style={containerStyle}>
        <div style={titleBoxStyle}>
          <span style={titleIconStyle}>▶</span>기록한 청춘
        </div>

        <div style={{ display: "flex" }}>
          {/* 사이드바 */}
          <div
            style={{
              width: 220,
              background: "#fff",
              borderRadius: 12,
              padding: "32px 24px",
              boxShadow: "0 0 8px rgba(0,0,0,0.05)",
              marginRight: 32,
              textAlign: "center"
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "#e0e0e0",
                margin: "0 auto 12px"
              }}
            />
            <p style={{ fontWeight: "bold", marginBottom: 24 }}>{username}</p> {/* 사용자명 연동 */}

            <ul style={{ listStyle: "none", padding: 0, textAlign: "left", fontSize: 14, color: "#888" }}>
              <li style={{ marginBottom: 12, fontWeight: 700, color: "#333" }}>• 내가 만든 청춘</li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/recorded-youth/scrapped-youth" style={{ color: "#888", textDecoration: "none" }}>
                  · 스크랩한 청춘
                </Link>
                </li>
              <li>· 청춘 일정</li>
            </ul>
          </div>

          {/* 콘텐츠 */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: 12,
              padding: "32px 48px",
              boxShadow: "0 0 8px rgba(0,0,0,0.05)"
            }}
          >
            <h2 style={{ marginBottom: 8, fontSize: 20 }}>내가 만든 청춘</h2>
            <p style={{ marginBottom: 48, fontSize: 14, color: "#888" }}>내가 쓴 게시글</p>

            {/* 아래 내용도 실제 사용자가 작성한 게시글과 연동 필요 */}
            <p style={{ fontSize: 16, color: "#555", textAlign: "center", marginTop: 80 }}>
              아직 내가 만든 청춘이 없어요
            </p>
            <p style={{ fontSize: 14, color: "#888", textAlign: "center", marginTop: 8 }}>
              <Link to="/write" style={{ color: "#888", textDecoration: "underline" }}>
                청춘을 만들러 가볼까요? &gt;
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Floating 글쓰기 버튼 */}
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

export default RecordedYouthPage;
