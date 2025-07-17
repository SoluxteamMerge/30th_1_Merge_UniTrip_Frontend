import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import './SignupPage.css';
import logo from '../../assets/header/logo.svg';
import checkIcon from "../../assets/체크아이콘.svg";


const SignupPage: React.FC = () => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : '');
  };

  const handleFileClick = () => {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <img src={logo} alt="uniTrip 로고" className="signup-logo" />
        <h2 className="signup-title">개인 정보 등록</h2>
        <p className="signup-description">정보를 입력하고 유니트립을 즐겨보세요</p>

        <div className="signup-form">

          {/* 이름 */}
          <div className="signup-form-row">
            <label className="signup-label">이름</label>
            <input type="text" placeholder="이름을 입력하세요" />
            <div className="signup-underline"></div>
          </div>

          {/* 닉네임 */}
          <div className="signup-form-row">
            <div className="signup-form-row-left">
              <label className="signup-label">닉네임</label>
              <span className="signup-check-duplicate">중복확인</span>
            </div>
            <input type="text" placeholder = "닉네임을 입력하세요"/>
            <div className="signup-underline"></div>
          </div>

          {/* 프로필사진 */}
          <div className="signup-form-row">
            <label className="signup-label">프로필사진</label>
            <div className="signup-row-with-button">
              <span className="signup-file-name">{fileName || ''}</span>
              <input
                type="file"
                id="file"
                title="파일 업로드"
                className="signup-hidden-file"
                onChange={handleFileChange}
              />
              <button
                className="signup-upload-btn"
                type="button"
                onClick={handleFileClick}
              >
                파일업로드
              </button>
            </div>
            <div className="signup-underline"></div>
          </div>

          {/* 비밀번호 */}
          <div className="signup-form-row">
            <label className="signup-label">비밀번호</label>
            <input type="password" placeholder = "비밀번호를 입력하세요" />
            <div className="signup-underline"></div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="signup-form-row">
            <label className="signup-label">비밀번호 확인</label>
            <input type="password" placeholder="비밀번호를 입력하세요" />
            <div className="signup-underline"></div>
          </div>

          {/* 생년월일 */}
          <div className="signup-form-row">
            <label className="signup-label">생년월일</label>
            <input type="text" placeholder="생일을 입력하세요" />
            <div className="signup-underline"></div>
          </div>

          {/* 학교 이메일 인증 */}
          <div className="signup-form-row">
            <label className="signup-label">학교 이메일 인증
              <img src={checkIcon} alt = "체크" className="signup-label-check-icon"/>
            </label>
            <input type="email" placeholder="이메일을 입력하세요" />
            <div className="signup-underline"></div>
          </div>

          
        </div>
        <button className="signup-submit-btn">확인</button>
      </div>
      

    </div>
  );
};

export default SignupPage;