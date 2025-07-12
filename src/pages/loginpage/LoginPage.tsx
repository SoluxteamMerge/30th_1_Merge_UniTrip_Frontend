import type { FC } from 'react'; 
import './LoginPage.css';
import logo from '../../assets/header/logo.svg';
import Google from '../../assets/Google_Logo.svg.svg';

const LoginPage: FC = () => {
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="logo-wrapper">
                    <img src={logo} alt="UniTrip 로고" className="logo" />
                </div>
                <div className="description">
                    <p>로그인하고<br />유니트립을 즐겨보세요</p>
                </div>
                
                <div className ="login-form">
                    <div className="input-group">
                        <label>아이디</label>
                        <input type="text" placeholder="아이디를 입력하세요" />
                    </div>
                    <div className="input-group">
                        <label>비밀번호</label>
                        <input type="password" placeholder="비밀번호를 입력하세요" />
                    </div>
                </div>
                <div className="forgot-password">
                    <a href="#" style={{ textDecoration: 'underline' }}>비밀번호를 잊으셨나요?</a>
                </div>
                <button 
                    className="login-btn"
                    onClick={() => (window.location.href = "#")}>
                    <img src={ Google } alt="로고" className="google-icon"/>
                    <span className="login-text">구글 계정으로 로그인</span>
                </button>

                <div className="signup-link">
                    <span>아직 회원이 아니신가요?</span>
                    <a href="#" style={{ textDecoration: 'underline' }}>구글 계정으로 회원가입</a>
                </div>

            
            </div>
        </div>
    )
};

export default LoginPage;