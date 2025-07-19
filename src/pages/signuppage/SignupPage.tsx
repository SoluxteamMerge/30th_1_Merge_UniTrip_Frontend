import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { postUserProfile } from '../../api/Signup/postUserProfile';
import { checkNicknameDuplicate } from '../../api/Signup/checkNicknameDuplicate';
import { sendEmailVerification } from '../../api/Signup/sendEmailVerification';
import { verifyEmailCode } from '../../api/Signup/verifyEmailCode';
import './SignupPage.css';
import logo from '../../assets/header/logo.svg';
import checkIcon from "../../assets/체크아이콘.svg";
import AlertModal from '../../components/AlertModal/AlertModal';

const SignupPage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false); //인증 코드 입력창 노출 여부
  const [verificationCode, setVerificationCode] = useState(''); //인증코드

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };
  {/* 닉네임 인증 */}
  const handleCheckNickname = async () => {
    if (!nickname) {
      showModal('닉네임을 입력하세요.');
      return;
    }
    try {
      const result = await checkNicknameDuplicate(nickname);
      showModal(result.message);
      setIsNicknameChecked(!result.data.isDuplicated);
    } catch (error) {
      if (error instanceof Error) {
        showModal(error.message);
        setIsNicknameChecked(false);
      }
    }
  };

  {/*휴대폰 번호 하이픈 입력 */}
  const formatPhoneNumber = (value: string) => {
    const onlyNumber = value.replace(/[^0-9]/g, '');
    if (onlyNumber.length < 4) return onlyNumber;
    if (onlyNumber.length < 8) return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3)}`;
    return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3, 7)}-${onlyNumber.slice(7, 11)}`;
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : '');
    setProfileImageUrl(file ? file.name : '');
  };

  {/*학교 이메일 인증 */}
  const handleSendVerification = async () => {
    if (!userEmail) {
      showModal('학교 이메일을 입력하세요.');
      return;
    }

    try {
      const result = await sendEmailVerification(userEmail);
      showModal(result.message);
      setIsCodeSent(true);
      setEmailVerified(false);
    } catch (error) {
      if (error instanceof Error) {
        showModal(error.message);
        setEmailVerified(false);
      }
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      showModal('인증 코드를 입력하세요.');
      return;
    }

    try {
      const result = await verifyEmailCode(userEmail, verificationCode);
      showModal(result.message);
      setEmailVerified(true);
      setIsCodeSent(false);
    } catch (error) {
      if (error instanceof Error) {
        showModal(error.message);
      }
    }
  };

  const handleRegister = async () => { 
    try {
      const response = await postUserProfile({
        nickname,
        phoneNumber,
        userType,
        emailVerified,
        profileImageUrl,
      });
      showModal(response.message);
    } catch (error) {
      if (error instanceof Error) {
        showModal(error.message || '회원가입 실패');
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <img src={logo} alt="uniTrip 로고" className="signup-logo" />
        <h2 className="signup-title">개인 정보 등록</h2>
        <p className="signup-description">정보를 입력하고 유니트립을 즐겨보세요</p>

        <div className="signup-form">
          <div className="signup-form-row">
            <div className="signup-form-row-left">
              <label className="signup-label">닉네임</label>
              <span className="signup-check-duplicate" onClick={handleCheckNickname}>
                {isNicknameChecked ? '인증완료' : '중복확인'}
              </span>
            </div>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setIsNicknameChecked(false);
              }}
              placeholder="닉네임을 입력하세요"
            />
            <div className="signup-underline"></div>
          </div>

          <div className="signup-form-row">
            <label className="signup-label">프로필사진</label>
            <div className="signup-row-with-button">
              <span className="signup-file-name">{fileName || ''}</span>
              <input type="file" id="file" className="signup-hidden-file" onChange={handleFileChange} />
              <label htmlFor="file" className="signup-upload-btn">파일 업로드</label>
            </div>
            <div className="signup-underline"></div>
          </div>

          <div className="signup-form-row">
            <label className="signup-label">핸드폰 번호</label>
            <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="핸드폰 번호를 입력하세요" />
            <div className="signup-underline"></div>
          </div>

          <div className="signup-form-row">
            <label className="signup-label">유저 타입 (개인/조직)</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="signup-select"
              aria-label="회원 유형 선택"
        
            >
              <option value="">선택하세요</option>
              <option value="개인">개인</option>
              <option value="조직">조직</option>
            </select>
          </div>

          <div className="signup-form-row">
            <label className="signup-label">
              학교 이메일 인증
              {emailVerified && <img src={checkIcon} alt="체크" className="signup-label-check-icon" />}
            </label>

            <div className="signup-row-with-button">
              <input
                type="email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setEmailVerified(false);
                }}
                placeholder="학교 이메일을 입력하세요"
                className="signup-input"
              />
              <button type="button" className="signup-email-verify-btn" onClick={handleSendVerification}>
                인증요청
              </button>
            </div>

            <div className="signup-underline"></div>

            {isCodeSent && (
              <>
                <div className="signup-row-with-button" style={{ marginTop: '8px' }}>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="인증 코드를 입력하세요"
                    className="signup-input"
                  />
                  <button type="button" className="signup-email-verify-btn" onClick={handleVerifyCode}>
                    인증확인
                  </button>
                </div>
                <div className="signup-underline"></div>
              </>
            )}
          </div>

          <button className="signup-submit-btn" onClick={handleRegister}>확인</button>
        </div>

        {isModalOpen && <AlertModal message={modalMessage} onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
};

export default SignupPage;