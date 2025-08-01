import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import AlertModal from "../AlertModal/AlertModal";
import defaultProfile from "../../assets/header/default-profile.svg";
import { fetchUserInfo } from "../../api/mypage/userApi";
import logo from '../../assets/header/logo.svg'

interface HeaderProps {
  isLoggedIn?: boolean; //todo
  username?: string; //todo
  profileUrl?: string; //todo
}

interface UserInfo {
  nickname: string;
  profileImageUrl?: string;
}

function Header({ isLoggedIn = false, username = "", profileUrl = "" }: HeaderProps): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLogoutSuccessModal, setShowLogoutSuccessModal] = useState(false);
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  
  // 실제 로그인 상태 확인
  const actualIsLoggedIn = !!localStorage.getItem('accessToken');
  const finalIsLoggedIn = isLoggedIn || actualIsLoggedIn;
  
  const menuLinks = [
    { to: "/", label: "청춘 발자국" },
    { to: "/mt-journey", label: "MT여정지도" },
    { to: "/together", label: "함께해요", requiresLogin: true },
    { to: "/youth-talk", label: "청춘톡" },
    { to: "/youth-drawer", label: "청춘서랍", last: true, requiresLogin: true }
  ];

  // 사용자 정보 가져오기
  useEffect(() => {
    const getUserInfo = async () => {
      console.log('Header: getUserInfo 호출됨, finalIsLoggedIn:', finalIsLoggedIn);
      console.log('Header: localStorage accessToken:', localStorage.getItem('accessToken'));
      
      if (!finalIsLoggedIn) {
        console.log('Header: 로그인되지 않음, userInfo 초기화');
        setUserInfo(null);
        return;
      }

      setLoading(true);
      try {
        console.log('Header: API 호출 시작');
        const userData = await fetchUserInfo();
        console.log('Header: API 응답 성공:', userData);
        
        console.log('Header: 사용자 정보 설정:', userData.nickname, userData.profileImageUrl);
        setUserInfo({
          nickname: userData.nickname,
          profileImageUrl: userData.profileImageUrl
        });
      } catch (error) {
        console.error('Header: 사용자 정보 조회 실패:', error);
        // 임시 테스트용 데이터 (API가 실패할 경우)
        setUserInfo({
          nickname: "테스트사용자",
          profileImageUrl: defaultProfile
        });
      } finally {
        setLoading(false);
        console.log('Header: 로딩 완료, userInfo:', userInfo);
      }
    };

    getUserInfo();
  }, [finalIsLoggedIn]);

  // 현재 카테고리 확인
  const currentCategory = searchParams.get('category');

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    // 로그아웃 로직 (실제로는 API 호출 등)
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isEmailVerified');
    setUserInfo(null);
    setShowLogoutModal(false);
    setShowLogoutSuccessModal(true);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handleLogoutSuccessConfirm = () => {
    setShowLogoutSuccessModal(false);
    window.location.href = '/';
  };

  const handleLoginRequiredModalClose = () => {
    setShowLoginRequiredModal(false);
    navigate('/login');
  };

  const handleMenuClick = (link: any, e: React.MouseEvent) => {
    if (link.requiresLogin && !finalIsLoggedIn) {
      e.preventDefault();
      setShowLoginRequiredModal(true);
    }
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

        /* 태블릿 (768px 이하) */
        @media (max-width: 768px) {
          .header {
            padding: 15px 20px;
          }
          .header-logo {
            height: 35px;
          }
          .header-nav-link {
            margin-right: 16px;
            font-size: 14px;
          }
          .header-username {
            font-size: 14px;
            margin-right: 8px;
          }
          .header-profile-img {
            width: 40px;
            height: 40px;
          }
          .header-logout-btn {
            font-size: 15px;
            margin-right: 15px;
          }
          .header-modal {
            padding: 60px 80px 40px 80px;
            min-width: 320px;
          }
          .header-modal-title {
            font-size: 18px;
          }
          .header-modal-content {
            font-size: 18px;
          }
          .header-modal-btn {
            font-size: 18px;
            padding: 10px 40px;
          }
        }

        /* 모바일 (480px 이하) */
        @media (max-width: 480px) {
          .header {
            padding: 10px 15px;
            flex-direction: column;
            gap: 10px;
          }
          .header-left {
            width: 100%;
            justify-content: space-between;
          }
          .header-logo {
            height: 30px;
          }
          .header-nav-link {
            margin-right: 12px;
            font-size: 12px;
          }
          .header-right {
            width: 100%;
            justify-content: center;
          }
          .header-username {
            font-size: 12px;
            margin-right: 6px;
          }
          .header-profile-img {
            width: 35px;
            height: 35px;
          }
          .header-logout-btn {
            font-size: 13px;
            margin-right: 10px;
          }
          .header-modal {
            padding: 40px 40px 30px 40px;
            min-width: 280px;
            margin: 20px;
          }
          .header-modal-title {
            font-size: 16px;
          }
          .header-modal-content {
            font-size: 16px;
          }
          .header-modal-btn {
            font-size: 16px;
            padding: 8px 30px;
          }
        }

        /* 작은 모바일 (360px 이하) */
        @media (max-width: 360px) {
          .header {
            padding: 8px 10px;
          }
          .header-logo {
            height: 25px;
          }
          .header-nav-link {
            margin-right: 8px;
            font-size: 11px;
          }
          .header-username {
            font-size: 11px;
          }
          .header-profile-img {
            width: 30px;
            height: 30px;
          }
          .header-logout-btn {
            font-size: 12px;
            margin-right: 8px;
          }
          .header-modal {
            padding: 30px 20px 20px 20px;
            min-width: 250px;
          }
          .header-modal-title {
            font-size: 14px;
          }
          .header-modal-content {
            font-size: 14px;
          }
          .header-modal-btn {
            font-size: 14px;
            padding: 6px 25px;
          }
        }
        `}
      </style>
      <header className="header">
        <div className="header-left">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="logo" className="header-logo" />
          </Link>
          <nav>
            {menuLinks.map((link) => {
              const { to, label, last } = link;
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
                  onClick={(e) => handleMenuClick({ to, label, last, requiresLogin: link.requiresLogin }, e)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="header-right">
          {finalIsLoggedIn ? (
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
                <b>{loading ? "로딩 중..." : (userInfo?.nickname || username)}</b>님
              </span>
              <img
                src={userInfo?.profileImageUrl || profileUrl || defaultProfile}
                alt="프로필"
                className="header-profile-img"
                onError={(e) => {
                  console.log('Header: 프로필 이미지 로드 실패, src:', e.currentTarget.src);
                  e.currentTarget.src = defaultProfile;
                }}
              />
            </>
          ) : (
            <>
              <Link to="/login" className="header-login-link">로그인</Link>
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

      {/* 로그인 필요 모달 */}
      {showLoginRequiredModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '40px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}>
            <h3 style={{ 
              color: '#333', 
              marginBottom: '20px', 
              fontSize: '18px',
              fontWeight: '600'
            }}>
              로그인이 필요한 서비스입니다
            </h3>
            <p style={{ 
              color: '#666', 
              marginBottom: '30px',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              게시글을 보려면 로그인해주세요
            </p>
            <button
              onClick={handleLoginRequiredModalClose}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#0b0b61',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              로그인
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header; 