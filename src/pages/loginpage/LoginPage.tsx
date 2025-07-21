import React from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom'; //연동 시 삭제 요망
import './LoginPage.css';
import logo from '../../assets/header/logo.svg';
import Google from '../../assets/Google_Logo.svg';

const LoginPage: FC = () => {
  //실제론 사용x
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // 연동 시 실제 코드 
    // window.location.href = '/api/google/login';
    localStorage.setItem('accessToken', 'dummy-access-token');

    // ✅ 더미 회원정보 데이터
    const dummyUser = {
      nickname: '가인', // 비어있으면 회원가입, 값 있으면 홈으로
    };

    // ✅ 조건 분기
    if (!dummyUser.nickname) {
      navigate('/signup');
    } else {
      navigate('/');
    }
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

