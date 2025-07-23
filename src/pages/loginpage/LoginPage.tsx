import React from 'react';
import type { FC } from 'react';
import './LoginPage.css';
import logo from '../../assets/header/logo.svg';
import Google from '../../assets/Google_Logo.svg';

const LoginPage: FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = '/api/google/login';  // ✅ 실제 구글 OAuth 연결
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo-wrapper">
          <img src={logo} alt="UniTrip 로고" className="logo" />
        </div>
        <div className="description">
          <p>로그인하고<br />유니트립을 즐겨보세요</p>
        </div>

        <button className="login-btn" onClick={handleGoogleLogin}>
          <img src={Google} alt="로고" className="google-icon" />
          <span className="login-text">구글 계정으로 로그인</span>
        </button>

        <div className="signup-link">
          <span>아직 회원이 아니신가요?</span>
          <a onClick={handleGoogleLogin} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            구글 계정으로 회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
