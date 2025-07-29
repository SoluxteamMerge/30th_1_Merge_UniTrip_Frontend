import React, { useEffect, useState } from "react"; // 여기 useEffect, useState 포함

import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import writeIcon from "../../assets/write-icon.svg";
import { ReviewCardTwo } from "../../pages/reviewcard/ReviewCardTwo";
import '../mainpage/MainPage.css'; 
import MyPageSidebar from "../../components/MyPageSidebar";
import Pagination from "../../components/Pagination";
import { fetchMyReviews,  MyReview} from "../../api/mypage/myReview"; 

const RecordedYouthPage: React.FC = () => {
  const username = "김눈송"; // 실제 로그인 사용자 정보와 연동 필요

  //const hasPosts = true; // 작성한 글이 있다고 가정

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

  // const postData = [
  //   {
  //     postId: 1,
  //     title: "서울 근교 나들이 후기",
  //     categoryName: "여행",
  //     thumbnailUrl: "https://picsum.photos/200/100?random=101",
  //     nickname: "여행러1",
  //     createdAt: "2025-07-15T10:00:00",
  //     likes: 5,
  //     scrapCount: 1,
  //     rating:1,
  //     isLiked: false,
  //     isScraped: false,    
  //   },
  //   {
  //     postId: 2,
  //     title: "두 번째",
  //     categoryName: "여행",
  //     thumbnailUrl: "https://picsum.photos/200/100?random=101",
  //     nickname: "여행러1",
  //     createdAt: "2025-07-15T10:00:00",
  //     likes: 1,
  //     scrapCount: 5,
  //     rating:1,
  //     isLiked: false,
  //     isScraped: false,  
  //   },
  //    {
  //     postId: 3,
  //     title: "세번째",
  //     categoryName: "여행",
  //     thumbnailUrl: "https://picsum.photos/200/100?random=101",
  //     nickname: "여행러1",
  //     createdAt: "2025-07-15T10:00:00",
  //     likes: 6,
  //     scrapCount: 5,
  //     rating:1,
  //     isLiked: false,
  //     isScraped: false,  
  //   },
  
  //    {
  //     postId: 4,
  //     title: "네번째",
  //     categoryName: "여행",
  //     thumbnailUrl: "https://picsum.photos/200/100?random=101",
  //     nickname: "여행러1",
  //     createdAt: "2025-07-15T10:00:00",
  //     likes: 3,
  //     scrapCount: 1,
  //     rating:1,
  //     isLiked: false,
  //     isScraped: false,  
  //   },
  
  //    {
  //     postId: 5,
  //     title: "다섯번째",
  //     categoryName: "여행",
  //     thumbnailUrl: "https://picsum.photos/200/100?random=101",
  //     nickname: "여행러1",
  //     createdAt: "2025-07-15T10:00:00",
  //     likes: 5,
  //     scrapCount: 1,
  //     rating:1,
  //     isLiked: false,
  //     isScraped: false,  
  //   },
  
  //    {
  //     postId: 6,
  //     title: "여섯번째",
  //     categoryName: "여행",
  //     thumbnailUrl: "https://picsum.photos/200/100?random=106",
  //     nickname: "여행러1",
  //     createdAt: "2025-07-15T10:00:00",
  //     likes: 4,
  //     scrapCount:2,
  //     rating:1,
  //     isLiked: false,
  //     isScraped: false,  
  //   },
  //   {
  //     postId: 7,
  //     title: "일곱 번째",
  //     categoryName: "여행",
  //     thumbnailUrl: "https://picsum.photos/200/100?random=107",
  //     nickname: "여행러1",
  //     createdAt: "2025-07-15T10:00:00",
  //     likes: 7,
  //     scrapCount: 11,
  //     rating:1,
  //     isLiked: false,
  //     isScraped: false,  
  //   },
  
  // ];
  const [myReviews, setMyReviews] = useState<MyReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchMyReviews();
        setMyReviews(data);
      } catch (err) {
        setError("리뷰를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);


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
              
              
                {/* 아래 내용도 실제 사용자가 작성한 게시글과 연동 필요*/}
                {loading ? (
                   <p>로딩 중...</p>
                  ) : error ? ( 
                    <p style={{ color: "red" }}>{error}</p>
                  ) : myReviews.length > 0 ? (// 정상적으로 데이터가 있을 때 처리
                  <Pagination
                      items={myReviews}
                      itemsPerPage={6}
                      renderItem={(review) => (
                      <div key={review.postId} onClick={() => navigate(`/youth-talk/${review.postId}`)}>
                        <ReviewCardTwo
                          postId={review.postId}
                          title={review.postTitle}
                          categoryName={review.categoryName}
                          thumbnailUrl={review.imageUrl}
                          nickname={review.nickname}
                          //createdAt={"작성일 없음"}
                          likes={review.likeCount}
                          scrapCount={review.scrapCount}
                          rating={review.rating}
                          isLiked={false} //내가 쓴 글 좋아요 false 
                          isScraped={false} //내가 쓴 글 스크랩 false 
                        />
                      </div>
                    )}
                  />

                )
                  : ( //아직 쓴 글 없을 때 안내 문구
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
