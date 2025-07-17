import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { postUserProfile } from '../../api/Signup/postUserProfile';
import './SignupPage.css';
import logo from '../../assets/header/logo.svg';
import checkIcon from "../../assets/체크아이콘.svg";
import { checkNicknameDuplicate } from '../../api/Signup/checkNicknameDuplicate';

const SignupPage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [fileName, setFileName] = useState('');


const handleEmailVerified = (email:string) => {
  setUserEmail(email);
  setEmailVerified(true);

};

/*닉네임 중복 확인*/
const handleCheckNickname = async () => {
  if (!nickname) {
    alert('닉네임을 입력하세요.');
    return;
  }

  if (nickname.length < 2 || nickname.length > 20) {
    alert('닉네임은 2~20자여야 합니다.');
    return;
  }

  try {
    const result = await checkNicknameDuplicate(nickname);
    console.log(result.data);
    if (result.data.isDuplicated) {
      alert('사용 가능한 닉네임입니다.');
    } else {
      alert('이미 사용 중인 닉네임입니다.');
    }
  } catch (err: any) {
    alert(err.response?.data?.message || '닉네임 확인 중 오류가 발생했습니다.');
  }
};

/*휴대폰 번호 숫자만 입력 가능, 하이픈 저절로 생김*/
const formatPhoneNumber = (value: string) => {
  const onlyNumber = value.replace(/[^0-9]/g, '');
  if (onlyNumber.length < 4) return onlyNumber;
  if (onlyNumber.length < 8) return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3)}`;
  return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3, 7)}-${onlyNumber.slice(7, 11)}`;
};


const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
  setPhoneNumber(formatPhoneNumber(e.target.value));
};


/* 이메일 인증 여부 테스트 용 코드*/
useEffect(() => {
  const isTestEmailVerified = true;

  if(isTestEmailVerified) {
    handleEmailVerified('testuser@example.com');
  } else {
    setEmailVerified(false);
    setUserEmail('');
  }
}, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : '');
    setProfileImageUrl(file ? file.name : '');
  };

/*필수 입력창 입력 여부*/
  const validateForm = () => {
    if (!nickname) return "닉네임을 입력하세요.";
    if (!phoneNumber) return "핸드폰 번호를 입력하세요.";
    if (!userType) return "유저 타입을 입력하세요.";
    if (userType !== '개인' && userType !== '단체') return "유저 타입은 '개인' 또는 '단체'로 입력하세요.";
    if (!emailVerified) return "학교 이메일 인증을 완료하세요.";
    return null;
  };

  const handleRegister = async () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    try {
      await postUserProfile({
        nickname,
        phoneNumber,
        userType,
        emailVerified,
        profileImageUrl,
      });
      alert('회원정보가 등록되었습니다.');
    } catch (err: any) {
      if (err.response?.data?.message) {
        alert('회원가입 실패: ' + err.response.data.message);
      } else {
        alert('회원가입 실패');
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <img src={logo} alt="uniTrip 로고" className="signup-logo" />
        <h2 className="signup-title">개인 정보 등록</h2>
        <p className="signup-description">
          정보를 입력하고 유니트립을 즐겨보세요
        </p>

        <div className="signup-form">
          {/* 닉네임 */}
          <div className="signup-form-row">
            <div className="signup-form-row-left">
              <label className="signup-label">닉네임</label>
              <span className="signup-check-duplicate" onClick={handleCheckNickname}>중복확인</span>
            </div>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
            />
            <div className="signup-underline"></div>
          </div>

          {/* 프로필 사진 */}
          <div className="signup-form-row">
            <label className="signup-label">프로필사진</label>
            <div className="signup-row-with-button">
              <span className="signup-file-name">{fileName || ''}</span>
              <input
                type="file"
                id="file"
                className="signup-hidden-file"
                onChange={handleFileChange}
              />
              <label htmlFor="file" className="signup-upload-btn"> 파일 업로드 </label>
            </div>
            <div className="signup-underline"></div>
          </div>

          {/* 핸드폰 번호 */}
          <div className="signup-form-row">
            <label className="signup-label">핸드폰 번호</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="핸드폰 번호를 입력하세요"
            />
            <div className="signup-underline"></div>
          </div>


          <div className="signup-form-row">
            <label className="signup-label">유저 타입 (개인/단체)</label>
            <input
              type="text"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              placeholder="개인 또는 단체를 입력하세요"
            />
            <div className="signup-underline"></div>
          </div>


          {/* 이메일 인증 */}
          <div className="signup-form-row">
            <label className="signup-label">학교 이메일 인증
              {emailVerified && (
                <img src={checkIcon} alt="체크" className="signup-label-check-icon" />
              )}
            </label>
            {emailVerified && userEmail? (
              <span className="signup-email-display">{userEmail}</span>
            ) : (
              <span className="signup-email-not-verified">구글 로그인 후 이메일이 확인됩니다.</span>
            )}
            <div className="signup-underline"></div>
          </div>
        </div>

        <button className="signup-submit-btn" onClick={handleRegister}>확인</button>
      </div>
    </div>
  );
};

export default SignupPage;