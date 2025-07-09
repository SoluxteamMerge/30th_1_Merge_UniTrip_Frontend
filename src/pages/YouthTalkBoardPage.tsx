import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import PostCard from "../components/PostCard";
import { fetchYouthTalkReviews } from "../api/youthTalk";
import writeIcon from "../assets/write-icon.svg";

// 스타일 객체 분리
const pageBgStyle = { background: "#e8f0f2", minHeight: "100vh" };
const containerStyle = { maxWidth: 1200, margin: "0 auto", padding: "40px 0" };
const titleBoxStyle = { fontWeight: 700, fontSize: 22, color: "#0b0b61", display: "flex", alignItems: "center", marginBottom: 16 };
const titleIconStyle = { fontSize: 20, marginRight: 8 };
const boardBoxStyle = { background: "#fff", borderRadius: 24, boxShadow: "0 2px 8px #0001", padding: 32 };
const boardTitleStyle = { fontWeight: 700, color: "#0b0b61", marginBottom: 24 };
const sortBtnBoxStyle = { display: "flex", justifyContent: "flex-end", marginBottom: 16 };
const sortBtnStyle = { border: "1px solid #bbb", borderRadius: 8, padding: "4px 16px", background: "#fff", cursor: "pointer" };
const postListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 32
};
const floatingBtnStyle = {
  position: "fixed" as const,
  bottom: 40,
  right: 40,
  background: "#0b0b61",
  borderRadius: "50%",
  width: 64,
  height: 64,
  boxShadow: "0 2px 8px #0002",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  cursor: "pointer"
};

interface Review {
  postId: number;
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  categoryName: string;
  recruitmentCnt: number;
}

const getImageFromContent = (content: string | undefined | null) => {
  if (typeof content !== "string") return "";
  const match = content.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : "";
};

const YouthTalkBoardPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchYouthTalkReviews()
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={pageBgStyle}>
      <Header isLoggedIn={true} username="000" profileUrl="" />
      <div style={containerStyle}>
        <div style={titleBoxStyle}>
          <span style={titleIconStyle}>▶</span>청춘톡
        </div>
        <div style={boardBoxStyle}>
          <div style={boardTitleStyle}>게시글 모음</div>
          <div style={sortBtnBoxStyle}>
            <button style={sortBtnStyle}>최신순 ▲</button>
          </div>
          <div style={postListStyle}>
            {loading ? (
              <div>로딩 중...</div>
            ) : (
              reviews.map(post => (
                <PostCard
                  key={post.postId}
                  post={post}
                  imageUrl={getImageFromContent(post.content)}
                />
              ))
            )}
          </div>
        </div>
        {/* 우측 하단 플로팅 버튼 */}
        <button style={floatingBtnStyle} onClick={() => navigate("/youth-talk/write")}>
          <img src={writeIcon} alt="글쓰기" width={130} height={130} />
        </button>
      </div>
    </div>
  );
};

export default YouthTalkBoardPage; 