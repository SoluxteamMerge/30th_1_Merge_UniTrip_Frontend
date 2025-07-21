import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../../assets/header/logo.svg';
import Google from '../../assets/Google_Logo.svg';
//import { getGoogleLogin } from '../../api/login';
import AlertModal from '../../components/AlertModal/AlertModal';

//테스트용
const getGoogleLogin = async () => {
  return {
    success: true,
    message: ''
  };
};
//

const LoginPage: FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    //테스트용
    useEffect(() => {
        localStorage.setItem('isNewUser', 'true'); // true로 세팅
    }, []);
    //

    const handleGoogleLogin = async () => {
        const result = await getGoogleLogin();

        if (result.success) {
            if (localStorage.getItem('isNewUser') === 'true') {
                setModalMessage('새로운 사용자입니다. 회원가입을 진행해주세요.');
                setIsModalOpen(true);
            } 
          else {
                navigate('/');
            }
        } else {
            setModalMessage(result.message);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
    setIsModalOpen(false);

    if (modalMessage === '새로운 사용자입니다. 회원가입을 진행해주세요.') {
        navigate('/signup');
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

            {isModalOpen && (
                <AlertModal message={modalMessage} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default LoginPage;
