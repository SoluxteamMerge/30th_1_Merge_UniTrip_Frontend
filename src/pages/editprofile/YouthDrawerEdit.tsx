import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import './YouthDrawer.css';
import api from '../../api/api';
import { AxiosError } from 'axios';
import DrawerCheckIcon from '../../assets/체크아이콘.svg';
import AlertModal from '../../components/AlertModal/AlertModal';
import  UploadModal  from '../../components/AlertModal/UploadModal';
import { updateMyUserInfo } from '../../api/YouthDrawer/updateMyUserInfo';
import { fetchMyUserInfo } from '../../api/YouthDrawer/fetchMyUserInfo';
import { sendEmailVerification } from '../../api/Signup/sendEmailVerification';
import { verifyEmailCode } from '../../api/Signup/verifyEmailCode';
import { deleteUserProfileImage, uploadUserProfileImage } from '../../api/userProfileImageApi';


function YouthDrawerEdit() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [nicknameChecked, setNicknameChecked] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

    const [isEmailCodeSent, setIsEmailCodeSent] = useState(false);
    const [emailVerificationCode, setEmailVerificationCode] = useState('');

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);


    
    useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const data = await fetchMyUserInfo();
            setName(data.name);
            setNickname(data.nickname);
            setPhoneNumber(data.phoneNumber);
            setEmailVerified(data.emailVerified);
            setProfileImageUrl(data.profileImageUrl || '');
            setNicknameChecked(true);
        } catch (error) {
            console.error('회원정보 불러오기 실패', error);
        }
    };
    fetchUserProfile();
    }, []); 

    const handleCheckNickname = () => {
        if (!nickname) {
            setResultMessage('닉네임을 입력하세요');
            setIsResultModalOpen(true);
            return;
        }
        if (nickname.length < 2 || nickname.length > 20) {
            setResultMessage('닉네임은 2~20자여야 합니다.');
            setIsResultModalOpen(true);
            return;
        }
        setResultMessage('사용 가능한 닉네임입니다.');
        setNicknameChecked(true);
        setIsResultModalOpen(true);
    };
    
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
        if (file) {
            setSelectedFile(file);
            setIsImageModalOpen(true);
        }
    };

    const handleConfirmImageUpload = () => {
        setIsImageModalOpen(false);
    };



    const handleCancelImageUpload = () => {
        setSelectedFile(null);
        setIsImageModalOpen(false);
    };

    /*const handleDeleteFile = () => {
        setSelectedFile(null);
        setProfileImageName('선택된 파일 없음');
};*/
    const handleWithdraw = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        setResultMessage('로그인이 필요합니다.');
        setIsResultModalOpen(true);
        return;
    }

    try {
        const res = await api.delete('/api/user/signout', {
            headers: { Authorization: token },
        });

        if (res.data.code === 200) {
            setResultMessage(res.data.message);
            setIsResultModalOpen(true);
            localStorage.clear();
            navigate('/');
        } else {
            setResultMessage(res.data.message);
            setIsResultModalOpen(true);
        }
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        setResultMessage(axiosError.response?.data?.message || '회원탈퇴 실패');
    } finally {
        setIsResultModalOpen(true);
    }
};


    const handleVerifyEmailCode = async () => {
  if (!emailVerificationCode) {
    setResultMessage('인증 코드를 입력하세요');
    setIsResultModalOpen(true);
    return;
  }

  try {
    const res = await verifyEmailCode(email, emailVerificationCode);
    setEmailVerified(true);
    setIsEmailCodeSent(false);
    setResultMessage(res.message || '이메일 인증이 완료되었습니다.');
  } catch (error) {
    setResultMessage((error as Error).message || '인증 실패');
  } finally {
    setIsResultModalOpen(true);
  }
};


    {/*인증 코드 보냄 */}
    const handleSendEmailVerification = async () => {
        if (!email) {
            setResultMessage('학교 이메일을 입력하세요');
            setIsResultModalOpen(true);
            return;
        }
        try {
            const res = await sendEmailVerification(email);
            setIsEmailCodeSent(true);
            setEmailVerified(false);
            setResultMessage(res.message);
        } catch (error) {
            setResultMessage((error as Error).message);

        } finally {
            setIsResultModalOpen(true);
        }
    };

    {/*저장*/}
    const handleSave = async () => {
        const token = localStorage.getItem('accessToken');
        if(!token) {
            setResultMessage('로그인이 필요합니다.');
            setIsResultModalOpen(true);
            return;
        }


        if (!nicknameChecked) {
            setResultMessage('닉네임 중복 확인을 해주세요.');
            setIsResultModalOpen(true);
            return;
        }
        try {
            let finalProfileImageUrl = profileImageUrl;
            if (selectedFile) {
                const uploadedUrl = await uploadUserProfileImage(selectedFile,token);
                finalProfileImageUrl = uploadedUrl || '';
            } else if (!selectedFile && profileImageUrl === '') {
                await deleteUserProfileImage(token);
            }
            await updateMyUserInfo({
                name: name,
                nickname,
                phoneNumber: phoneNumber.replace(/-/g, ''),
                userType,
                emailVerified,
            });
            setResultMessage('회원정보가 저장되었습니다.');
            setIsResultModalOpen(true);
            navigate('/youth-drawer');
        } catch (error) {
            setResultMessage((error as Error).message);
        } finally {
            setIsResultModalOpen(true);
        }
    };
    


    return (
        <div>
            <Header />
            <div className="Drawer-main-background">
                <h2 className="Drawer-section-title">▶ 청춘서랍</h2>
                <div className="edit-card">
                    <h3 className="Drawer-title">개인정보 수정</h3>
                    <div className="edit-form">
                        <div className="input-row">
                            <div className="input-row-left"><label className="Drawer-label">이름</label></div>
                            <input type="text" className="Drawerinput" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요" />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">닉네임</label>
                                <span className="Drawer-check-duplicate" onClick={handleCheckNickname}>중복확인</span>
                            </div>
                            <input type="text" className="Drawerinput" value={nickname} onChange={(e) => { setNickname(e.target.value); {/*setNicknameChecked(false);*/} }} placeholder="닉네임을 입력하세요" />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left"><label className="Drawer-label">핸드폰 번호</label></div>
                            <input type="tel" className="Drawerinput" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="휴대폰 번호를 입력하세요" />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left"><label className="Drawer-label">유저 유형</label></div>
                            <select id="userTypeSelect" className="Drawerinput" value={userType} onChange={(e) => setUserType(e.target.value)} aria-label="유저 유형 선택">
                                <option value="">선택하세요</option>
                                <option value="개인">개인</option>
                                <option value="조직">조직</option>
                            </select>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left"><label className="Drawer-label">프로필 사진</label></div>
                            <div className="input-with-button">
                                {selectedFile ? (
                                    <span className="Drawer-file-name">{selectedFile.name}</span>
                                ) : profileImageUrl ? (
                                    <span className="Drawer-file-name">{profileImageUrl}</span>
                                ) : (
                                    <span className="Drawer-file-name">프로필 이미지가 없습니다.</span>
                                )}
                                {/*<span className="Drawer-file-name">{profileImageName}</span>*/}
                                <div className="Drawer-button-gruop">
                                    <div>
                                    <input type="file" id="file" className="Drawer-hidden-file" onChange={handleFileChange} />
                                    <label htmlFor="file" className="Drawer-check-btn">파일 업로드</label>
                                </div>

                                {(selectedFile || profileImageUrl) && (
                                    <button type="button" className="Drawer-check-btn" onClick={() => {
                                        setSelectedFile(null);
                                        setProfileImageUrl('');
                                    }}>
                                        삭제
                                    </button>
                                )}

                                </div>
                                
                            </div>
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">학교 이메일</label>
                                {emailVerified && (
                                    <>
                                      <img 
                                        src={DrawerCheckIcon} 
                                        alt="체크아이콘" 
                                        style={{ width: '24px', marginLeft: '4px', verticalAlign: 'middle' }} 
                                      />
                                    </>
                                    )}
                            </div>
                            <div className="input-with-button">
                                <input 
                                    type="email"
                                    className="Drawerinput" 
                                    value={emailVerified? '' : email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder={emailVerified ? '이미 인증된 사용자입니다.' : '학교 이메일을 입력하세요.'
                                        } />
                                <button className="Drawer-check-btn" onClick={handleSendEmailVerification}>인증요청</button>
                            </div>
                            <div className="Drawer-underline"></div>
                        </div>

                        {isEmailCodeSent && (
                            <>
                              <div className="input-with-button" style={{ marginTop: '8px' }}>
                                <input
                                    type="text"
                                    className="Drawerinput"
                                    value={emailVerificationCode}
                                    onChange={(e) => setEmailVerificationCode(e.target.value)}
                                    placeholder="인증 코드를 입력하세요"
                                />
                                <button className="Drawer-check-btn" onClick={handleVerifyEmailCode}>확인</button>
                            </div>
                            <div className="Drawer-underline"></div>
                            </>
                
                        )}
                

                    <div className="YouthDrawerButton">
                        <button className="Drawer-edit-btn" onClick={() => navigate('/youth-drawer-edit')}>수정하기</button>
                        <button className="Drawer-save-btn" onClick={handleSave}>저장하기</button>
                    </div>
                </div>

            </div>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScc04yLaBsTFIQN3jp7MJJoCSvAWcx2vorbfpZbor4kFeAe1w/viewform?usp=header" style={{ color: '#BBBBBB', textDecoration: 'underline', fontWeight: '400', fontSize: '24px', marginRight: '24px' }}>
                    고객센터
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setIsWithdrawModalOpen(true); }} style={{ color: '#BBBBBB', textDecoration: 'underline', fontWeight: '400', fontSize: '24px' }}>
                    회원 탈퇴
                </a>
            </div>

            {isResultModalOpen && <AlertModal message={resultMessage} onClose={() => setIsResultModalOpen(false)} />}

            {isImageModalOpen && (
                <UploadModal     
                    fileName={selectedFile?.name||''}
                    onConfirm={handleConfirmImageUpload}
                    onClose={handleCancelImageUpload}
                />
            )}

            {isWithdrawModalOpen && (
  <             AlertModal
                    message="정말로 탈퇴하시겠습니까?"
                    onClose={() => setIsWithdrawModalOpen(false)}
                    onConfirm={() => {
                        handleWithdraw();
                        setIsWithdrawModalOpen(false);
                    }}
                />  
            )}

        </div>
        </div>
    );

}

export default YouthDrawerEdit;

