import React from "react";
import { Link, useLocation } from "react-router-dom";
import defaultProfile from "../../assets/header/default-profile.svg";

interface HeaderProps {
  isLoggedIn?: boolean; //todo
  username?: string; //todo
  profileUrl?: string; //todo
}

function Header({ isLoggedIn = false, username = "", profileUrl = "" }: HeaderProps): React.JSX.Element {
  const location = useLocation();
  const menuLinks = [
    { to: "/cjdcnsqkfwkrnr", label: "청춘 발자국" },
    { to: "/mt-journey", label: "MT여정지도" },
    { to: "/gkaRpgody", label: "함께해요" },
    { to: "/youth-talk", label: "청춘톡" },
    { to: "/cjdcnstjfkq", label: "청춘서랍", last: true }
  ];

  return (
    <>
      <style>
        {`
        .header { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: #fbfbfb; border-bottom: 1px solid #dedede; }
        .header-left { display: flex; align-items: center; }
        .header-logo { height: 40px; vertical-align: middle; margin-right: 8px; }
        .header-nav-link { color: #0b0b61; font-weight: 700; margin-right: 24px; text-decoration: none; }
        .header-nav-link.last { margin-right: 0; }
        .header-nav-link.active { color: #bbb; cursor: default; }
        .header-right { display: flex; align-items: center; }
        .header-username { color: #0b0b61; font-weight: 600; margin-right: 12px; }
        .header-username-link { color: #0b0b61; font-weight: 600; text-decoration: none; }
        .header-username-link.active { color: #bbb; cursor: default; }
        .header-username-gap { display: inline-block; width: 24px; }
        .header-profile-img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; background: #eee; border: 1.5px solid #ccc; }
        .header-login-link { color: #0b0b61; font-weight: 600; margin-right: 16px; text-decoration: none; }
        .header-signup-link { color: #0b0b61; font-weight: 600; text-decoration: none; }
        `}
      </style>
      <header className="header">
        <div className="header-left">
          <span>
            <img src="/src/assets/header/logo.svg" alt="로고" className="header-logo" />
          </span>
          <nav>
            {menuLinks.map(({ to, label, last }) => (
              <Link
                key={to}
                to={to}
                className={
                  "header-nav-link" +
                  (last ? " last" : "") +
                  (location.pathname === to ? " active" : "")
                }
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="header-right">
          {isLoggedIn ? (
            <>
              <span className="header-username">
                <Link 
                  to="/recorded-youth" 
                  className={
                    "header-username-link" +
                    (location.pathname.startsWith("/recorded-youth") ? " active" : "")
                  }
                >
                  기록한 청춘
                </Link>
                <span className="header-username-gap" />
                <b>{username}</b>님
              </span>
              <img
                src={profileUrl ? profileUrl : defaultProfile}
                alt="프로필"
                className="header-profile-img"
              />
            </>
          ) : (
            <>
              <Link to="/login" className="header-login-link">로그인</Link>
              <Link to="/signup" className="header-signup-link">회원가입</Link>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header; 