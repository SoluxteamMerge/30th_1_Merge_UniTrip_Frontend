import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import axios from 'axios';
import { postUserProfile } from '../../api/Signup/postUserProfile';
import { checkNicknameDuplicate } from '../../api/Signup/checkNicknameDuplicate';
import { sendEmailVerification } from '../../api/Signup/sendEmailVerification';
import { verifyEmailCode } from '../../api/Signup/verifyEmailCode';
import './SignupPage.css';
import logo from '../../assets/header/logo.svg';
import checkIcon from "../../assets/체크아이콘.svg";
import AlertModal from '../../components/AlertModal/AlertModal';
import { uploadUserProfileImage } from '../../api/userProfileImageApi';

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
  const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,20}$/; // 한글, 영문, 숫자 2~20자
  const [isCodeSent, setIsCodeSent] = useState(false); //인증 코드 입력창 노출 여부
  const [verificationCode, setVerificationCode] = useState(''); //인증코드

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };
  //닉네임 인증
  const handleCheckNickname = async () => {
    if (!nickname) {
      showModal('닉네임을 입력은 필수입니다.');
      return;
    }

    {/* 글자수 제한 */}
    if (!nicknameRegex.test(nickname)) {
      showModal('닉네임은 2~20자의 한글, 영문, 숫자만 가능합니다.');
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

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
    //더미테스트 주석처리
    //console.log('업로드한 파일:',file.name);
    //const dummyUploadUrl = 'https://picsum.photos/200';

    //setFileName(file.name);
    //setProfileImageUrl(dummyUploadUrl);
    //showModal('프로필 이미지가 업로드 되었습니다 (더미)');
  //}
  try {
    const token = localStorage.getItem('accessToken') || '';
    const uploadedUrl = await uploadUserProfileImage(file, token);
    setFileName(file.name);
    setProfileImageUrl(uploadedUrl); // 최종 등록된 이미지 URL
    showModal('프로필 이미지가 업로드되었습니다');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || '이미지 업로드에 실패했습니다.';
      showModal(message);
    } else {
      showModal('이미지 업로드에 실패했습니다.');
      }
    } 
  }; 

  {/*업로드취소 하고 싶을 때 */}
  const handleCancelUpload = () => {
    setProfileImageUrl('');
    setFileName('');
  }


  const handleSendVerification = async () => {
    if (!userEmail || !userEmail.trim()) {
      showModal('학교 이메일을 입력해주세요.');
      return;
    }
    //이메일 인증 코드 유효성 조건 확인//
    if (!userEmail.endsWith('@sookmyung.ac.kr')) {
      showModal('이메일은 @sookmyung.ac.kr로 끝나야 합니다.');
      return;
    }
    
    try {
      const result = await sendEmailVerification(userEmail);
      showModal(result.message);
      setIsCodeSent(true);
      setEmailVerified(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '이메일 인증 요청에 실패했습니다.';
        showModal(message);
      } else {
        showModal('이메일 인증 요청에 실패했습니다.');
      }
      setEmailVerified(false);
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
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '인증에 실패했습니다.';
        showModal(message);
      } else {
        showModal('인증에 실패했습니다.');
      }
    }
  };


  const handleRegister = async () => { 
    //유효성 검사//
    if (!nickname) {
      showModal('닉네임을 입력은 필수입니다.');
      return;
    }
    if (!isNicknameChecked) {
      showModal('닉네임 중복 확인을 해주세요.');
      return;
    }
    if (!userEmail || !emailVerified) {
      showModal('학교 이메일 인증은 필수입니다.');
      return;
    }
    if (!userType) {
      showModal('유저 타입 입력은 필수입니다.');
      return;
    }
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

              {profileImageUrl && (
                <button type="button" className="signup-upload-btn" onClick={handleCancelUpload}>
                  업로드 취소
                </button>
              )}
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
              <option value="" disabled hidden>선택하세요</option>
              <option value="개인">개인</option>
              <option value="조직">조직</option>
            </select>
            <div className="signup-underline"></div>
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