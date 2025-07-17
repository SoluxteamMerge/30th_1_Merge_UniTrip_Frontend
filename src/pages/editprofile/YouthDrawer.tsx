import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import './YouthDrawer.css';
/*import { getUserInfo } from '../../api/getUserInfo'; */
import DrawerCheckIcon from '../../assets/체크아이콘.svg';

function YouthDrawer() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');

    //실제 사용할 코드 (배포 시 주석 해제)
    
    /*useEffect(() => {
        const getchUserProfile = async () => {
            try {
                const response = await getUserInfo();
                setName(response.data.name);
                setNickname(response.data.nickname);
                setPhoneNumber(response.data.phoneNumber);
                setEmail(response.data.userEmail);
                setProfileImageUrl(response.data.profileImageUrl);
            } catch (error) {
                console.error('회원정보 불러오기 실패', error);
            }
        };
        getchUserProfile();
    }, []);
    */

    // ✅ 더미 테스트용 데이터
    useEffect(() => {
        const dummyUser = {
            name: '홍길동',
            nickname: '길동이',
            phoneNumber: '010-1234-5678',
            userEmail: 'gildong@example.com',
            profileImageUrl: 'https://dummyimage.com/100x100/000/fff.png',
        };
        setName(dummyUser.name);
        setNickname(dummyUser.nickname);
        setPhoneNumber(dummyUser.phoneNumber);
        setEmail(dummyUser.userEmail);
        setProfileImageUrl(dummyUser.profileImageUrl);
    }, []);

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
                            <input type="text" className="Drawerinput" value={name} readOnly placeholder="이름" />
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
                                <label className="Drawer-label">프로필 사진 URL</label>
                            </div>
                            <input type="text" className="Drawerinput" value={profileImageUrl} readOnly placeholder="이미지 주소" />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">학교 이메일</label>
                                <img src={DrawerCheckIcon} alt='체크아이콘' style={{ width: '24px', cursor: 'pointer', verticalAlign: 'middle' }} onClick={() => window.open('', '_blank', 'width=400, height=300')} />
                            </div>
                            <input type="email" className="Drawerinput" value={email} readOnly placeholder="이메일" />
                            <div className="Drawer-underline"></div>
                        </div>
                    </div>

                    <button className="Drawer-submit-btn" onClick={() => navigate('/youth-drawer-edit')}>
                        수정하기
                    </button>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <a href="#" style={{ display: 'inline-block', color: '#BBBBBB', textDecoration: 'underline', fontWeight: '00', fontSize: '24px', marginBottom: '40px' }}>
                        고객센터
                    </a>
                </div>

            </div>
        </div>
    );
}

export default YouthDrawer;
