import React from "react";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";

import grayThumbnail from "../../assets/gray-thumbnail.svg";

import { ReviewCard } from "../../pages/reviewcard/ReviewCard";
import '../mainpage/MainPage.css';
import MyPageSidebar from "../../components/MyPageSidebar";


const ScrappedYouthPage: React.FC = () => {
  const navigate = useNavigate();
  const username = "김눈송"; // 실제 로그인 사용자 정보와 연동 필요
  const hasScraps = true; // 스크랩한 게시글이 있다고 가정

  const scrappedData = [
    {
      postId: 1,
      title: "스크랩 게시글 1",
      categoryName: "여행",
      thumbnailUrl: "https://picsum.photos/200/100?random=101",
      nickname: "김눈송",
      createdAt: "2025-07-20T10:00:00",
      likes: 0,
      scrapCount: 3,
      rating: 1,
      isLiked: false,
      isScraped: true,
    },
    {
      postId: 1,
      title: "스크랩 게시글 2",
      categoryName: "여행",
      thumbnailUrl: grayThumbnail,
      nickname: "김눈송",
      createdAt: "2025-07-20T10:00:00",
      likes: 2,
      scrapCount: 3,
      rating: 1,
      isLiked: false,
      isScraped: true,
    },
    {
      postId: 1,
      title: "세번째",
      categoryName: "여행",
      thumbnailUrl: "https://picsum.photos/200/100?random=103",
      nickname: "김눈송",
      createdAt: "2025-07-20T10:00:00",
      likes: 1,
      scrapCount: 3,
      rating: 1,
      isLiked: false,
      isScraped: true,
    },
    {
      postId: 1,
      title: "네 번째",
      categoryName: "여행",
      thumbnailUrl: "https://picsum.photos/200/100?random=101",
      nickname: "김눈송",
      createdAt: "2025-07-20T10:00:00",
      likes: 4,
      scrapCount: 3,
      rating: 1,
      isLiked: false,
      isScraped: true,
    },
    {
      postId: 1,
      title: "다섯번째",
      categoryName: "여행",
      thumbnailUrl: "https://picsum.photos/200/100?random=101",
      nickname: "김눈송",
      createdAt: "2025-07-20T10:00:00",
      likes: 5,
      scrapCount: 3,
      rating: 1,
      isLiked: false,
      isScraped: true,
    },
    {
      postId: 1,
      title: "여섯번째",
      categoryName: "여행",
      thumbnailUrl: "https://picsum.photos/200/100?random=101",
      nickname: "김눈송",
      createdAt: "2025-07-20T10:00:00",
      likes: 6,
      scrapCount: 2,
      rating: 1,
      isLiked: false,
      isScraped: true,
    },
  ];

  //스타일
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

  return (
    <div style={pageBgStyle}>
      <Header isLoggedIn={true} username={username} profileUrl="" />

      <div style={containerStyle}>

        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {/* 사이드바 - 양식 통일) */}
          <MyPageSidebar />  {/* 이 한 줄로 사이드바 대체 */}

          {/* 콘텐츠 */}
          <div style={{ flex: 1 }}>

            <div style={titleBoxStyle}>
              <span style={titleIconStyle}>▶</span>기록한 청춘
            </div>

            <div
              style={{
                flex: 1,
                background: "#FBFBFB",
                borderRadius: 15,
                padding: "24px 40px 24px 40px",
                boxShadow: "0 1px 6px #0001;",
                minHeight: "580px",
                position: "relative",
              }}
            >
              <h2 style={{ marginBottom: 8, fontSize: 18, color: "#0B0B61"}}>스크랩한 청춘</h2>
              <p style={{ marginBottom: 30, fontSize: 14, color: "#0B0B61" }}>스크랩한 게시글</p>
              
              {hasScraps ? (
              //스크랩한 게시글이 있을 때 보여줄 카드 리스트
              <div className="review-grid">
                {scrappedData.map((post) => (
                  <div key={post.postId} onClick={() => navigate(`/youth-talk/${post.postId}`)}>
                    <ReviewCard
                      postId={post.postId}
                      title={post.title}
                      categoryName={post.categoryName}
                      thumbnailUrl={post.thumbnailUrl}
                      nickname={post.nickname}
                      createdAt={post.createdAt}
                      likes={post.likes}
                      scrapCount={post.scrapCount}
                      rating={post.rating}
                      isLiked={post.isLiked}
                      isScraped={post.isScraped}
                    />
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
              <p style={{ fontSize: 20, color: "#0B0B61", fontWeight: 700, margin: 0 }}>
                아직 스크랩한 청춘이 없어요
              </p>
                
              <p style={{fontSize: 16, color: "#888", fontWeight: 700, marginTop: 10}}>
                <Link to="/mt-journey" style={{ color: "#888", textDecoration: "underline" }}>
                  청춘을 스크랩하러 가볼까요? &gt;
                </Link>
              </p>
            </div>
          )} 
          </div>
        </div>

        </div>
      </div>
    </div>
  );
};

export default ScrappedYouthPage;
