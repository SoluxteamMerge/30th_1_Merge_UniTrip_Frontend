import React from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import writeIcon from "../../assets/write-icon.svg";
import grayThumbnail from "../../assets/gray-thumbnail.svg";
import { ReviewCard } from "../../pages/reviewcard/ReviewCard";
import '../mainpage/MainPage.css'; 
import MyPageSidebar from "../../components/MyPageSidebar";

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
      postId: 1,
      boardType: "모임구인",
      categoryName: "여행",
      title: "서울 근교 나들이 후기",
      userId: 101,
      nickname: "여행러1",
      createdAt: "2025-07-15T10:00:00",
      commentCount: 2,
      likes: 5,
      isLiked: false,
      scrapCount: 1,
      isScraped: false,
      thumbnailUrl: "https://picsum.photos/200/100?random=101"
    },
    {
      postId: 2,
      nickname: "김눈송",
      title: "두 번째",
      categoryName: "청춘기록",
      thumbnailUrl: grayThumbnail,
      createdAt: "2025-07-22T12:00:00",
      likes: 3,
      scrapCount: 2,
      isLiked: false,
      isScraped: false,
    },
     {
      postId: 3,
      nickname: "김눈송",
      title: "세 번째",
      categoryName: "청춘기록",
      thumbnailUrl: grayThumbnail,
      createdAt: "2025-07-22T12:00:00",
      likes: 3,
      scrapCount: 3,
      isLiked: false,
      isScraped: false,
    },
  
     {
      postId: 4,
      nickname: "김눈송",
      title: "네 번째",
      categoryName: "청춘기록",
      thumbnailUrl: grayThumbnail,
      createdAt: "2025-07-22T12:00:00",
      likes: 4,
      scrapCount: 4,
      isLiked: false,
      isScraped: false,
    },
  
     {
      postId: 5,
      nickname: "김눈송",
      title: "다섯 번째",
      categoryName: "청춘기록",
      thumbnailUrl: grayThumbnail,
      createdAt: "2025-07-22T12:00:00",
      likes: 5,
      scrapCount: 2,
      isLiked: false,
      isScraped: false,
    },
  
     {
      postId: 6,
      nickname: "김눈송",
      title: "여섯 번째",
      categoryName: "청춘기록",
      thumbnailUrl: grayThumbnail,
      createdAt: "2025-07-22T12:00:00",
      likes: 6,
      scrapCount: 2,
      isLiked: false,
      isScraped: false,
    },
  
  
];

  const navigate = useNavigate(); 

  return (
    <div style={pageBgStyle}>
      <Header isLoggedIn={true} username={username} profileUrl="" />

      <div style={containerStyle}>

        <div style={{ display: "flex", alignItems: "flex-start"}}> {/*flex-start 없으면 양 컨테이너 높이 자동 맞춰짐 */}
          {/* 사이드바 */}
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
                width: "100%",
                boxSizing: "border-box" 
             }}
            >
              <h2 style={{ marginBottom: 8, fontSize: 18, color: "#0B0B61" }}>내가 만든 청춘</h2>
              <p style={{ marginBottom: 30, fontSize: 14, color: "#0B0B61" }}>내가 쓴 게시글</p>
              
              
                {/* 아래 내용도 실제 사용자가 작성한 게시글과 연동 필요 */}
                {hasPosts ? (
                  
                  <div className="review-grid">
                      {postData.map((post) => (
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
                            rating={4}
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
