import React from "react";

interface PostCardProps {
  post: {
    postId: number;
    title: string;
    content: string;
    nickname: string;
    createdAt: string;
    categoryName: string;
    recruitmentCnt: number;
  };
  imageUrl: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, imageUrl }) => (
  <div style={{ display: "flex", alignItems: "center", background: "#fff", borderRadius: 18, boxShadow: "0 1px 6px #0001", padding: 24, marginBottom: 8 }}>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#eee", marginRight: 8 }} />
        <span style={{ color: "#888", fontSize: 14 }}>{post.nickname}</span>
        <span style={{ color: "#bbb", fontSize: 13, marginLeft: 8 }}>{post.createdAt.slice(0, 10).replace(/-/g, ".")}</span>
      </div>
      <div style={{ fontWeight: 700, fontSize: 20, color: "#0b0b61", marginBottom: 6 }}>{post.title}</div>
      <div style={{ color: "#222", fontSize: 15, marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: post.content.replace(/<img[^>]*>/g, "") }} />
      <div style={{ display: "flex", gap: 8 }}>
        <span style={{ background: "#0b0b61", color: "#fff", borderRadius: 16, padding: "2px 14px", fontSize: 13 }}>#{post.categoryName}</span>
        <span style={{ background: "#0b0b61", color: "#fff", borderRadius: 16, padding: "2px 14px", fontSize: 13 }}>#{post.recruitmentCnt}인</span>
      </div>
    </div>
    <img src={imageUrl} alt="썸네일" style={{ width: 180, height: 110, borderRadius: 12, objectFit: "cover", marginLeft: 24 }} />
  </div>
);

export default PostCard; 