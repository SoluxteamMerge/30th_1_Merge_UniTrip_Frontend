import React, { useState } from "react";
import Header from "../components/Header/Header";
import SortDropdown from "../components/SortDropdown";
import { useNavigate } from "react-router-dom";
import writeIcon from "../assets/write-icon.svg";

// todo
const posts = [
  {
    id: 1,
    username: "김눈송 님",
    date: "2025.05.06 12:01",
    title: "제목칸",
    content: "내용칸",
    tags: ["#가평", "#대성리"],
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    profileUrl: ""
  },
  {
    id: 2,
    username: "김눈송 님",
    date: "2025.05.06 12:01",
    title: "제목칸",
    content: "내용란",
    tags: ["#제주도", "#4인"],
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    profileUrl: ""
  }
];

const YouthTalkBoardPage: React.FC = () => {
  const [sort, setSort] = useState("최신순");
  const navigate = useNavigate();

  return (
    <div className="yt-bg">
      <style>{`
        .yt-bg { background: #e8f0f2; min-height: 100vh; }
        .yt-container { max-width: 1500px; margin: 0 auto; padding: 60px 0px 0px 300px; }
        .yt-title-box { font-weight: 700; font-size: 22px; color: #0b0b61; display: flex; align-items: center; margin-bottom: 0px; }
        .yt-title-icon { font-size: 20px; margin-right: 8px; }
        .yt-board-title { font-weight: 700; font-size: 18px; color: #0b0b61; margin-bottom: 20px; }
        .yt-white-container { background: #fff; border-radius: 15px; box-shadow: 0 1px 6px #0001; padding: 24px 40px 24px 40px; margin-top: 10px; }
        .yt-post-list { display: flex; flex-direction: column; gap: 24px; }
        .yt-post-card { display: flex; flex-direction: column; gap: 0; background: #fff; border-radius: 15px; border: 2px solid #bbb; padding: 24px; margin-bottom: 8px; }
        .yt-post-top-row { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #bbb; padding-bottom: 12px; margin-bottom: 18px; }
        .yt-post-info-row { display: flex; align-items: center; }
        .yt-profile { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; margin-right: 8px; background: #eee; }
        .yt-profile-default { background: #bbb; }
        .yt-username { color: #838383; font-size: 15px; }
        .yt-info-divider { width: 1px; height: 18px; background: #bbb; margin: 0 12px; }
        .yt-date { color: #555; font-size: 13px; }
        .yt-tag-row { display: flex; gap: 10px; }
        .yt-tag { border-radius: 20px; padding: 6px 18px; font-size: 15px; font-weight: 400; }
        .yt-tag-main { background: #0b0b61; color: #fff; }
        .yt-tag-sub { background: #fff; border: 1.5px solid #0b0b61; color: #0b0b61; }
        .yt-post-title { font-weight: 700; font-size: 22px; color: #0b0b61; padding: 0 0 0 10px; margin-bottom: 2px; margin-top: 0; }
        .yt-post-bottom-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
        .yt-post-content { color: #222; padding: 0 0 0 10px; font-size: 16px; font-weight: 400; flex: 1; }
        .yt-thumbnail { width: 220px; height: 130px; border-radius: 0px; object-fit: cover; margin-left: 24px; }
        .yt-title-thumb-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0px; }
        .yt-main-row { display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between; gap: 24px; margin-top: 0; }
        .yt-main-texts { display: flex; flex-direction: column; flex: 1; padding-top: 0; margin-top: 0; }
        .yt-post-title { font-weight: 700; font-size: 22px; color: #0b0b61; padding: 0 0 0 10px; margin-bottom: 2px; margin-top: 0; }
        .yt-post-content { color: #black; padding: 10px 0 0 10px; font-size: 15px; font-weight:600; }
        .yt-thumbnail { width: 220px; height: 130px; border-radius: 0px; object-fit: cover; margin-left: 24px; }
        .yt-floating-write-btn {
          position: fixed;
          right: 60px;
          bottom: 60px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          box-shadow: 0 4px 24px 0 rgba(0,0,0,0.18);
          border: 2px solid #0b0b61;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
          transition: box-shadow 0.2s;
        }
      `}</style>
      <Header isLoggedIn={true} username="김눈송" profileUrl="" />
      <div className="yt-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="yt-title-box">
            <span className="yt-title-icon">▶</span>청춘톡
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
        <div className="yt-white-container">
          <div className="yt-board-title">게시글 모음</div>
          <div className="yt-post-list">
            {posts.map(post => (
              <div key={post.id} className="yt-post-card" onClick={() => navigate(`/youth-talk/${post.id}`)} style={{ cursor: 'pointer' }}>
                {/* 상단: 프로필/닉네임/날짜(왼쪽) + 태그(오른쪽) */}
                <div className="yt-post-top-row">
                  <div className="yt-post-info-row">
                    {post.profileUrl ? (
                      <img src={post.profileUrl} alt="프로필" className="yt-profile" />
                    ) : (
                      <div className="yt-profile yt-profile-default" />
                    )}
                    <span className="yt-username">{post.username}</span>
                    <div className="yt-info-divider" />
                    <span className="yt-date">{post.date}</span>
                  </div>
                  <div className="yt-tag-row">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={tag}
                        className={idx === 0 ? "yt-tag yt-tag-main" : "yt-tag yt-tag-sub"}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* 제목+내용(왼쪽) + 썸네일(오른쪽) 한 줄 */}
                <div className="yt-main-row">
                  <div className="yt-main-texts">
                    <div className="yt-post-title">{post.title}</div>
                    <div className="yt-post-content">{post.content}</div>
                  </div>
                  <img src={post.imageUrl} alt="썸네일" className="yt-thumbnail" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 플로팅 버튼 */}
      <button
        className="yt-floating-write-btn"
        onClick={() => navigate("/review-write?category=청춘톡")}
        aria-label="게시글 작성"
      >
        <img src={writeIcon} alt="글쓰기" style={{ width: 120, height: 120 }} />
      </button>
    </div>
  );
};

export default YouthTalkBoardPage; 