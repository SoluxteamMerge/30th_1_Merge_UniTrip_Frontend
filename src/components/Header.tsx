import React from "react";

interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  profileUrl?: string;
}

function Header({ isLoggedIn = false, username = "", profileUrl = "" }: HeaderProps): React.JSX.Element {
  return (
    <header style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "20px 40px", background: "#fbfbfb", borderBottom: "1px solid #dedede"
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>
          <img src="/logo.png" alt="로고" style={{ height: 40, verticalAlign: "middle", marginRight: 8 }} />
        </span>
        <nav>
          <a href="#" style={{ color: "#0b0b61", fontWeight: 700, marginRight: 24, textDecoration: "none" }}>청춘 발자국</a>
          <a href="#" style={{ color: "#0b0b61", fontWeight: 700, marginRight: 24, textDecoration: "none" }}>MT여정지도</a>
          <a href="#" style={{ color: "#0b0b61", fontWeight: 700, marginRight: 24, textDecoration: "none" }}>함께해요</a>
          <a href="#" style={{ color: "#0b0b61", fontWeight: 700, marginRight: 24, textDecoration: "none" }}>청춘톡</a>
          <a href="#" style={{ color: "#0b0b61", fontWeight: 700, textDecoration: "none" }}>청춘서랍</a>
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoggedIn ? (
          <>
            <span style={{ color: "#0b0b61", fontWeight: 600, marginRight: 12 }}>
              기록한 청춘 <b>{username}</b>님
            </span>
            <img
              src={profileUrl}
              alt="프로필"
              style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
            />
          </>
        ) : (
          <>
            <a href="#" style={{ color: "#0b0b61", fontWeight: 600, marginRight: 16, textDecoration: "none" }}>로그인</a>
            <a href="#" style={{ color: "#0b0b61", fontWeight: 600, textDecoration: "none" }}>회원가입</a>
          </>
        )}
      </div>
    </header>
  );
}

export default Header; 