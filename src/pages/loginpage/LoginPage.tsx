import type { FC } from 'react'; 
import './LoginPage.css';
import logo from '../../assets/header/logo.svg'

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
                    <a href="#">비밀번호를 잊으셨나요?</a>
                </div>
                <button className="login-btn">로그인</button>
                <div className="divider-with-text">
                    <span>다른 방법으로 로그인</span>
                </div>

                
                <button className="google-login-btn">
                    <img src="" alt="구글 로그인" />
                </button>

                <div className="signup-link">
                    <span>아직 회원이 아니신가요?</span>
                    <a href="#">회원가입</a>
                </div>

            
            </div>
        </div>
    )
};

export default LoginPage;