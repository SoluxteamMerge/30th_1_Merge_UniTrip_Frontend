import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import './YouthDrawer.css';
import { fetchMyUserInfo } from '../../api/YouthDrawer/fetchMyUserInfo';
import DrawerCheckIcon from '../../assets/체크아이콘.svg';
import AlertModal from '../../components/AlertModal/AlertModal';
import api from '../../api/api';
import { AxiosError } from 'axios';

const SUCCESS_MESSAGES = ['로그인이 필요합니다.', '회원탈퇴 되었습니다.'];


function YouthDrawer() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [userType, setUserType] = useState('');
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        console.log('📌 토큰 확인:', token);
        if (!token) {
            setResultMessage('로그인이 필요합니다.');
            setIsResultModalOpen(true);
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const data = await fetchMyUserInfo();
                setUserName(data.name);
                setNickname(data.nickname);
                setPhoneNumber(data.phoneNumber);
                setEmailVerified(data.emailVerified);
                setProfileImageUrl(data.profileImageUrl);
                setUserType(data.userType);
            } catch (error) {
                console.error('회원정보 불러오기 실패', error);
                setResultMessage('회원정보를 불러오지 못했습니다.');
                setIsResultModalOpen(true);
            }
        };
        fetchUserProfile();
    }, []);

    const handleWithdraw = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setResultMessage('로그인이 필요합니다.');
            setShouldRedirect(true);
            setIsResultModalOpen(true);
            return;
        }

        try {
            const res = await api.delete('/api/user/signout', {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            console.log('회원탈퇴 응답: ', res);

            setResultMessage(res.data.message);
            setShouldRedirect(true);
            setIsResultModalOpen(true);
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            setResultMessage(axiosError.response?.data?.message || '회원탈퇴 실패');
            setShouldRedirect(false);
            setIsResultModalOpen(true);
        }
    };

    const getUserTypeLabel = (type: string): string => {
        switch(type) {
            case 'PERSONAL':
                return '개인';
            case 'ORGANIZATION':
                return '조직';
            default:
                return '알 수 없음';
        }
    };

    return (
        <div>
            <Header />
            <div className="Drawer-main-background">
                <h2 className="Drawer-section-title">▶ 청춘서랍</h2>
                <div className="edit-card">
                    <h3 className="Drawer-title">회원정보 조회</h3>
                    <div className="edit-form">
                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">이름</label>
                            </div>
                            <input type="text" className="Drawerinput" value={userName} readOnly placeholder="이름" />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">닉네임</label>
                            </div>
                            <input type="text" className="Drawerinput" value={nickname} readOnly placeholder="닉네임" />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">핸드폰 번호</label>
                            </div>
                            <input type="text" className="Drawerinput" value={phoneNumber} readOnly placeholder="휴대폰 번호" />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">유저 유형</label>
                            </div>
                            <input 
                                type="text"
                                className="Drawerinput"
                                value={getUserTypeLabel(userType)} 
                                readOnly 
                                placeholder="유저 유형" />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">프로필 사진</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                {profileImageUrl ? (
                                    <>
                                        <span className="Drawer-file-name">{profileImageUrl}</span>
                                        <button onClick={() => setIsImageModalOpen(true)} className="Drawer-check-btn">미리보기</button>
                                    </>
                                ) : (
                                    <span style={{ color: '#999999' }}>등록된 사진이 없습니다.</span>
                                )}
                            </div>
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left" style={{ display: 'flex', alignItems: 'center' }}>
                                <label className="Drawer-label">학교 이메일 인증</label>
                                {emailVerified && (
                                    <img src={DrawerCheckIcon} alt="체크 아이콘" style={{ width: '16px', marginLeft: '0px' }} />
                                )}
                            </div>
                            <input
                                type="text"
                                className="Drawerinput"
                                placeholder='이메일 인증'
                                readOnly
                                value={emailVerified ? '인증 완료했습니다.' : '미인증 상태입니다.'}
                            />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="YouthDrawerButton">
                            <button className="Drawer-edit-btn" onClick={() => navigate('/youth-drawer-edit')}>수정하기</button>
                            <button className="Drawer-save-btn">저장하기</button>
                        </div>

                        {isResultModalOpen && (
                            <AlertModal
                                message={resultMessage}
                                onClose={() => {
                                    setIsResultModalOpen(false);
                                    if (shouldRedirect) {
                                        localStorage.clear();
                                        navigate('/');
                                    }
                                }}
                                onConfirm={() => {
                                    setIsResultModalOpen(false);
                                    if (shouldRedirect) {
                                        localStorage.clear();
                                        navigate('/');
                                    }
                                }}
                            />
                        )}

                        {isWithdrawModalOpen && (
                            <AlertModal
                                message="정말 탈퇴하시겠습니까?"
                                onClose={() => setIsWithdrawModalOpen(false)}
                                onConfirm={() => {
                                    handleWithdraw();
                                    setIsWithdrawModalOpen(false);
                                }}
                            />
                        )}

                        {isImageModalOpen && (
                            <AlertModal
                                message={
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={profileImageUrl} alt="프로필 이미지" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                    </div>
                                }
                                onClose={() => setIsImageModalOpen(false)}
                            />
                        )}
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
            </div>
        </div>
    );
}

export default YouthDrawer;
