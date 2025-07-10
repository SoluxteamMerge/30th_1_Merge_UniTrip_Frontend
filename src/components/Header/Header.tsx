import React from "react";
import { Link, useLocation } from "react-router-dom";
import defaultProfile from "../../assets/default-profile.svg";

// 스타일 객체 분리
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 40px",
  background: "#fbfbfb",
  borderBottom: "1px solid #dedede"
};
const leftBoxStyle = { display: "flex", alignItems: "center" };
const logoStyle = { height: 40, verticalAlign: "middle", marginRight: 8 };
const navLinkStyle = {
  color: "#0b0b61",
  fontWeight: 700,
  marginRight: 24,
  textDecoration: "none"
};
const navLastLinkStyle = { ...navLinkStyle, marginRight: 0 };
const rightBoxStyle = { display: "flex", alignItems: "center" };
const usernameStyle = { color: "#0b0b61", fontWeight: 600, marginRight: 12 };
const usernameGapStyle = { display: "inline-block", width: 24 };
const profileImgStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: "50%",
  objectFit: "cover",
  background: "#eee",
  border: "1.5px solid #ccc"
};
const loginLinkStyle = { color: "#0b0b61", fontWeight: 600, marginRight: 16, textDecoration: "none" };
const signupLinkStyle = { color: "#0b0b61", fontWeight: 600, textDecoration: "none" };

interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  profileUrl?: string;
}

function Header({ isLoggedIn = false, username = "", profileUrl = "" }: HeaderProps): React.JSX.Element {
  const location = useLocation();
  
  // 경로에 따라 스타일 변경
  const youthTalkActive = location.pathname.startsWith("/youth-talk");
  const recordedYouthActive = location.pathname === "/recorded-youth";

  const youthTalkStyle = youthTalkActive
    ? { ...navLinkStyle, color: "#bbb", cursor: "default" }
    : navLinkStyle;

    const recordedUsernameStyle = recordedYouthActive
    ? { ...usernameStyle, color: "#bbb", cursor: "default" }
    : usernameStyle;

  return (
    <header style={headerStyle}>
      <div style={leftBoxStyle}>
        <span>
          <img src="/src/assets/logo.svg" alt="로고" style={logoStyle} />
        </span>
        <nav>
          <a href="#" style={navLinkStyle}>청춘 발자국</a>
          <a href="#" style={navLinkStyle}>MT여정지도</a>
          <a href="#" style={navLinkStyle}>함께해요</a>
          <Link to="/youth-talk" style={youthTalkStyle}>청춘톡</Link>
          <a href="#" style={navLastLinkStyle}>청춘서랍</a>
        </nav>
      </div>
      <div style={rightBoxStyle}>
        {isLoggedIn ? (
          <>
            <Link to="/recorded-youth" 
            style={recordedUsernameStyle}>
              기록한 청춘
              <span style={usernameGapStyle} />
              <b>{username}</b>님
            </Link>

            
            <img
              src={profileUrl ? profileUrl : defaultProfile}
              alt="프로필"
              style={profileImgStyle}
            />
          </>
        ) : (
          <>
            <a href="#" style={loginLinkStyle}>로그인</a>
            <a href="#" style={signupLinkStyle}>회원가입</a>
          </>
        )}
      </div>
    </header>
  );
}

export default Header; 