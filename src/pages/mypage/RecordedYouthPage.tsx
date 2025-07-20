import React from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/header/default-profile.svg";
import writeIcon from "../../assets/write-icon.svg";

import starIcon from "../../assets/interaction/star.svg";
import empathyIcon from "../../assets/interaction/empathy.svg";
import scrapIcon from "../../assets/interaction/scrap.svg";
import grayThumbnail from "../../assets/gray-thumbnail.svg";


const RecordedYouthPage: React.FC = () => {
  const username = "김눈송"; // 실제 로그인 사용자 정보와 연동 필요
  const hasPosts = true; // 작성한 글이 있다고 가정

  // 스타일
  const pageBgStyle = { background: "#e8f0f2", minHeight: "100vh" };
  const containerStyle = { maxWidth: 1400, margin: "0 auto", padding: "60px 0" };
  const titleBoxStyle = {
    fontWeight: 700,
    fontSize: 22,
    color: "#0b0b61",
    display: "flex",
    alignItems: "center",
    marginBottom: 16
  };
  const titleIconStyle = { fontSize: 20, marginRight: 8 };

  const postData = [
    {
      id: 1,
      author: "김눈송",
      title: "첫 번째 이야기",
      tags: ["#태그 1", "태그 2", "#태그3"],
      starCount: 1,
      empathyCount: 0,
      scrapCount: 1,
      thumbnail: grayThumbnail
    },
    {
      id: 2,
      author: "김눈송",
      title: "두 번째 ",
      tags: ["#태그 1", "태그 2", "#태그3"],
      starCount: 2,
      empathyCount: 0,
      scrapCount: 2,
      thumbnail: grayThumbnail
    },
    {
      id: 3,
      author: "김눈송",
      title: "세 번째 ",
      tags: ["#태그 1", "태그 2", "#태그3"],
      starCount: 3,
      empathyCount: 0,
      scrapCount: 3,
      thumbnail: grayThumbnail
    },
    {
      id: 4,
      author: "김눈송",
      title: "네 번째 ",
      tags: ["#태그 1", "태그 2", "#태그3"],
      starCount: 4,
      empathyCount: 0,
      scrapCount: 4,
      thumbnail: grayThumbnail
    },
    {
      id: 5,
      author: "김눈송",
      title: "다섯 번째 ",
      tags: ["#태그 1", "태그 2", "#태그3"],
      starCount: 5,
      empathyCount: 0,
      scrapCount: 5,
      thumbnail: grayThumbnail
    },
    {
      id: 6,
      author: "김눈송",
      title: "여섯 번째 ",
      tags: ["#태그 1", "태그 2", "#태그3"],
      starCount: 6,
      empathyCount: 0,
      scrapCount: 6,
      thumbnail: grayThumbnail
    },
    
  ];
  const navigate = useNavigate(); 

  return (
    <div style={pageBgStyle}>
      <Header isLoggedIn={true} username={username} profileUrl="" />

      <div style={containerStyle}>

        <div style={{ display: "flex", alignItems: "flex-start"}}> {/*flex-start 없으면 양 컨테이너 높이 자동 맞춰짐 */}
          {/* 사이드바 */}
          <div
            style={{
              width: 220,
              background: "#fff",
              borderRadius: 15,
              padding: "32px 24px",
              boxShadow: "0 1px 6px #0001;",
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
                borderRadius: 15,
                padding: "24px 40px 24px 40px",
                boxShadow: "0 1px 6px #0001;",
                minHeight: "580px",
                position: "relative",
             }}
            >
              <h2 style={{ marginBottom: 8, fontSize: 18, color: "#0B0B61" }}>내가 만든 청춘</h2>
              <p style={{ marginBottom: 30, fontSize: 14, color: "#0B0B61" }}>내가 쓴 게시글</p>
              
              
                {/* 아래 내용도 실제 사용자가 작성한 게시글과 연동 필요 */}
                {hasPosts ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 400px)", 
                      columnGap: 80,  // 좌우 카드 간격
                      rowGap: 40,    // 위아래 카드 간격 줄이기
                      justifyContent: "center", // 좌우 여백 균등하게 배치
                    }}
                  >
                    {postData.map((post) => (
                      <div
                        key={post.id}
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: 12,
                          width: "100%",
                          aspectRatio: "1 / 1",
                          height: 320,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                          display: "flex",
                          flexDirection: "column",
                          overflow: "hidden"
                        }}
                      >
                        {/* 썸네일 영역 */}              
                          <img
                            src={post.thumbnail}
                            alt="썸네일"
                            style={{
                              width: "100%", // 카드 가로와 동일하게
                              height: "70%", // 카드 높이의 70% 차지
                              objectFit: "cover",
                              borderRadius: "8px 8px 0 0"
                            }}
                          />
                                                  
                        {/* 텍스트 영역 */}
                        <div style={{ padding: "16px" }}>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                              <p style={{ fontSize: 14, fontWeight: 500, color: "#a3a3a3", margin: 0 }}>{post.author}</p>

                              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                  <img src={starIcon} alt="댓글" style={{ width: 16, height: 16 }} />
                                  <span style={{ fontSize: 13, color: "#333" }}>{post.starCount}</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                  <img src={empathyIcon} alt="공감" style={{ width: 16, height: 16 }} />
                                  <span style={{ fontSize: 13, color: "#333" }}>{post.empathyCount}</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                  <img src={scrapIcon} alt="스크랩" style={{ width: 16, height: 16 }} />
                                  <span style={{ fontSize: 13, color: "#333" }}>{post.scrapCount}</span>
                                </div>

                              </div>
                            </div>
                            <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{post.title}</p>
                            <p style={{ fontSize: 12, color: "#0B0B61" }}>{post.tags.join(", ")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
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
                )}   
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
          width: 120,
          height: 120,
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
