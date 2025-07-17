import React from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/header/default-profile.svg";
import writeIcon from "../../assets/write-icon.svg";


const RecordedYouthPage: React.FC = () => {
  const username = "김눈송"; // 실제 로그인 사용자 정보와 연동 필요

  // 스타일
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
  const navigate = useNavigate(); 

  return (
    <div style={pageBgStyle}>
      {/* Header에 전달되는 사용자 정보도 실제 로그인 데이터로 연동 필요 */}
      <Header isLoggedIn={true} username={username} profileUrl="" />

      <div style={containerStyle}>

        <div style={{ display: "flex", alignItems: "flex-start"}}> {/*flex-start 없으면 양 컨테이너 높이 자동 맞춰짐 */}
          {/* 사이드바 */}
          <div
            style={{
              width: 220,
              background: "#fff",
              borderRadius: 12,
              padding: "32px 24px",
              boxShadow: "0 0 8px rgba(0,0,0,0.05)",
              marginRight: 32,
              textAlign: "center",
              marginTop: 48
            }}
          >
            <img
              src={defaultProfile}
              alt="기본 프로필"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                margin: "0 auto 12px",
                display: "block"
              }}
            />
            <p style={{ fontWeight: "bold", marginBottom: 24, color: "#0B0B61" }}>{username}</p> {/* 사용자명 연동 */}

            <ul style={{ listStyle: "none", padding: 0, textAlign: "left", fontSize: 14, color: "#888" }}>
              <li 
              style={{ 
                  marginBottom: 12,
                  fontWeight: 700,
                  color: "#333",
                  backgroundColor: "#e0e0e0",
                  padding: "4px 12px",
                  borderRadius: 5,
               }}
              >
                • 내가 만든 청춘
              </li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/recorded-youth/scrapped-youth" style={{ color: "#888", textDecoration: "none" }}>
                  · 스크랩한 청춘
                </Link>
              </li>
              <li>
                <Link to="/recorded-youth/youth-calendar" style={{ color: "#888", textDecoration: "none" }}>
                  · 청춘 일정
                </Link>
              </li>
            </ul>
          </div>

          {/* 콘텐츠 */}
          <div style={{ flex: 1 }}>

            <div style={titleBoxStyle}>
              <span style={titleIconStyle}>▶</span>기록한 청춘
            </div>

            <div
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: 12,
                padding: "32px 48px",
                boxShadow: "0 0 8px rgba(0,0,0,0.05)",
                minHeight: "580px",
                position: "relative",
             }}
            >
              <h2 style={{ marginBottom: 8, fontSize: 20, color: "#0B0B61" }}>내가 만든 청춘</h2>
              <p style={{ marginBottom: 0, fontSize: 14, color: "#0B0B61" }}>내가 쓴 게시글</p>
              
              
                {/* 아래 내용도 실제 사용자가 작성한 게시글과 연동 필요 */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center"
                  }}
                >
                  <p style={{ fontSize: 16, color: "#0B0B61", fontWeight: 600, margin: 0 }}>
                    아직 내가 만든 청춘이 없어요
                  </p>
                  <p style={{ fontSize: 14, color: "#888", marginTop: 8 }}>
                    <Link to="/review-write" style={{ color: "#888", textDecoration: "underline" }}>
                      청춘을 만들러 가볼까요? &gt;
                    </Link>
                  </p>
                </div>             

            </div>
          </div>
        </div>
      </div>

      {/* Floating 글쓰기 버튼 */}
      <button
        onClick={() => navigate("/review-write")}  // 이 줄 추가!
        style={{
          position: "fixed",
          right: 60,
          bottom: 60,
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: "none", 
    
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          background: "transparent", 
          overflow: "hidden"  // 이미지 삐져나가지 않게
        }}
        aria-label="게시글 작성"
      >
        <img
          src={writeIcon}
          alt="글쓰기 아이콘"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",  // 이미지가 버튼 원형에 꽉 차게
            borderRadius: "50%",  // 이미지도 원형으로
            display: "block",
          }}
        />
      </button>

    </div>
  );
};

export default RecordedYouthPage;
