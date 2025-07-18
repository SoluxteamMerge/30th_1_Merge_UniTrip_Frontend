import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import defaultProfile from "../../assets/header/default-profile.svg";

interface HeaderProps {
  isLoggedIn?: boolean; //todo
  username?: string; //todo
  profileUrl?: string; //todo
}

function Header({ isLoggedIn = false, username = "", profileUrl = "" }: HeaderProps): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLogoutSuccessModal, setShowLogoutSuccessModal] = useState(false);
  const menuLinks = [
    { to: "/", label: "청춘 발자국" },
    { to: "/mt-journey", label: "MT여정지도" },
    { to: "/together", label: "함께해요" },
    { to: "/youth-talk", label: "청춘톡" },
    { to: "/youth-drawer", label: "청춘서랍", last: true }
  ];

  // 현재 카테고리 확인
  const currentCategory = searchParams.get('category');

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    // 로그아웃 로직 (실제로는 API 호출 등)
    console.log('로그아웃 전 localStorage 상태:', localStorage.getItem('isEmailVerified'));
    
    localStorage.removeItem('isEmailVerified');
    
    console.log('로그아웃 후 localStorage 상태:', localStorage.getItem('isEmailVerified'));
    console.log('로그아웃 완료 - 로그인 페이지로 이동합니다.');
    
    setShowLogoutModal(false);
    setShowLogoutSuccessModal(true);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handleLogoutSuccessConfirm = () => {
    setShowLogoutSuccessModal(false);
    window.location.href = '/login';
  };

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
        .header-logout-btn { 
          background: none; 
          border: none; 
          color: #0b0b61; 
          font-weight: 600; 
          font-size: 17px;
          margin-right: 20px; 
          cursor: pointer; 
          font-family: inherit;
        }
        .header-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }
        .header-modal {
          background: #fff;
          border-radius: 25px;
          box-shadow: 0 4px 32px 0 rgba(0,0,0,0.13);
          padding: 80px 120px 50px 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 400px;
        }
        .header-modal-title {
          font-size: 20px;
          color: #000;
          font-weight: 700;
          text-align: center;
          margin-bottom: 30px;
          line-height: 1.5;
          font-family: inherit;
        }
        .header-modal-content {
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          color: #000;
          margin-bottom: 50px;
          line-height: 1.5;
          font-family: inherit;
        }
        .header-modal-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .header-modal-btn {
          background: #0b0b61;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          padding: 12px 48px;
          cursor: pointer;
          font-family: inherit;
        }
        .header-modal-btn.cancel {
          background: #f5f5f5;
          color: #666;
        }
        `}
      </style>
      <header className="header">
        <div className="header-left">
          <span>
            <img src="/src/assets/header/logo.svg" alt="로고" className="header-logo" />
          </span>
          <nav>
            {menuLinks.map(({ to, label, last }) => {
              // 링크 활성화 조건 확인
              let isActive = false;
              
              if (location.pathname === to) {
                isActive = true;
              } else if (to === "/youth-talk" && (location.pathname.startsWith("/youth-talk") || location.pathname.startsWith("/review"))) {
                // 청춘톡 상세 페이지에서 카테고리가 청춘톡이거나 없을 때만 활성화
                if (!currentCategory || currentCategory === "청춘톡") {
                  isActive = true;
                }
              } else if (to === "/mt-journey" && (location.pathname.startsWith("/youth-talk") || location.pathname.startsWith("/review")) && currentCategory === "MT여정지도") {
                isActive = true;
              } else if (to === "/together" && (location.pathname.startsWith("/youth-talk") || location.pathname.startsWith("/review")) && 
                ["동행구해요", "번개모임", "졸업/휴학여행", "국내학점교류", "해외교환학생"].includes(currentCategory || "")) {
                isActive = true;
              }
              
              return (
                <Link
                  key={to}
                  to={to}
                  className={
                    "header-nav-link" +
                    (last ? " last" : "") +
                    (isActive ? " active" : "")
                  }
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="header-right">
          {isLoggedIn ? (
            <>
              <button 
                className="header-logout-btn" 
                onClick={handleLogoutClick}
              >
                로그아웃
              </button>
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

      {/* 로그아웃 확인 모달 */}
      {showLogoutModal && (
        <div className="header-modal-overlay">
          <div className="header-modal">
            <div className="header-modal-title">로그아웃</div>
            <div className="header-modal-content">
              정말 로그아웃하시겠습니까?
            </div>
            <div className="header-modal-buttons">
              <button className="header-modal-btn cancel" onClick={handleLogoutCancel}>
                취소
              </button>
              <button className="header-modal-btn" onClick={handleLogoutConfirm}>
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 로그아웃 완료 모달 */}
      {showLogoutSuccessModal && (
        <div className="header-modal-overlay">
          <div className="header-modal">
            <div className="header-modal-title">
              로그아웃 되었습니다.
            </div>
            <div className="header-modal-buttons">
              <button className="header-modal-btn" onClick={handleLogoutSuccessConfirm}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header; 