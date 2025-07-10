import React, { useState } from "react";
import Header from "../components/Header/Header";
import ToggleSwitch from "../components/ToggleSwitch";

const toolbarStyle = {
  display: "flex",
  alignItems: "center",
  gap: 24,
  padding: "12px 24px",
  borderBottom: "1px solid #ccc",
  background: "#fff"
};
const iconStyle = { fontSize: 28, fontWeight: 700, cursor: "pointer" };
const editorWrapStyle = {
  background: "#fff",
  minHeight: "calc(100vh - 80px)",
  //maxWidth: 1200,
  maxWidth: "1200px",
  margin: "0 auto",
  border: "1px solid #ccc",
  borderTop: "none",
  //boxSizing: "border-box"
  boxSizing: "border-box" as const
};
const titleRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "48px 48px 0 48px"
};
const titleInputStyle = {
  border: "none",
  outline: "none",
  fontSize: 28,
  fontWeight: 700,
  color: "#bbb",
  background: "transparent",
  width: "100%",
  //textAlign: "center"
  textAlign: "center" as const
};
const dividerStyle = {
  height: 1,
  background: "#ccc",
  border: "none",
  margin: "32px 0 0 0"
};
const contentInputStyle = {
  width: "100%",
  minHeight: 200,
  border: "none",
  outline: "none",
  fontSize: 18,
  color: "#bbb",
  background: "transparent",
  padding: "32px 48px 0 48px",
  //resize: "vertical"
  resize: "vertical" as const
};

const WritePostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <div style={{ background: "#e8f0f2", minHeight: "100vh" }}>
      <Header isLoggedIn={true} username="김눈송" profileUrl="" />
      <div style={editorWrapStyle}>
        {/* 툴바 */}
        <div style={toolbarStyle}>
          <span style={iconStyle}>B</span>
          <span style={iconStyle}>U</span>
          <span style={iconStyle}>S</span>
          <span style={iconStyle}>≡</span>
          <span style={iconStyle}>≣</span>
          <span style={iconStyle}>#</span>
          <span style={iconStyle}>🖼️</span>
          <span style={iconStyle}>📍</span>
          <span style={iconStyle}>≡</span>
          <span style={iconStyle}>≡</span>
          <span style={iconStyle}>≡</span>
        </div>
        {/* 제목 + 비공개 토글 */}
        <div style={titleRowStyle}>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={titleInputStyle}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ToggleSwitch checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />
          </div>
        </div>
        <hr style={dividerStyle} />
        {/* 내용 입력 */}
        <textarea
          placeholder="내용을 입력하세요..."
          value={content}
          onChange={e => setContent(e.target.value)}
          style={contentInputStyle}
        />
      </div>
    </div>
  );
};

export default WritePostPage; 