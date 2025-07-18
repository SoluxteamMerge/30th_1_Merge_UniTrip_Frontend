import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import Header from "../../components/Header/Header";
import './YouthDrawer.css';
import DrawerCheckIcon from '../../assets/체크아이콘.svg';

function YouthDrawerEdit() {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [nicknameChecked, setNicknameChecked] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [profileImageName, setProfileImageName] = useState('선택된 파일 없음');

    // 더미 데이터 세팅
    useEffect(() => {
        const dummyUser = {
            name: '홍길동',
            nickname: '길동이',
            phoneNumber: '010-1234-5678',
            userEmail: 'gildong@example.com',
        };
        setName(dummyUser.name);
        setNickname(dummyUser.nickname);
        setPhoneNumber(dummyUser.phoneNumber);
        setEmail(dummyUser.userEmail);
        setNicknameChecked(true); // 초기에 닉네임은 중복확인 완료된 상태로 가정
    }, []);

    // 닉네임 중복 확인 - 더미용
    const handleCheckNickname = () => {
        if (!nickname) {
            alert('닉네임을 입력하세요');
            return;
        }
        if (nickname.length < 2 || nickname.length > 20) {
            alert('닉네임은 2~20자여야 합니다.');
            return;
        }
        // 더미 중복 체크: '가인'은 중복된 닉네임으로 가정
        const isDuplicated = nickname === '가인';
        if (isDuplicated) {
            alert('이미 사용 중인 닉네임입니다.');
            setNicknameChecked(false);
        } else {
            alert('사용 가능한 닉네임입니다.');
            setNicknameChecked(true);
        }
    };

    // 휴대폰 번호 포맷팅
    const formatPhoneNumber = (value: string) => {
        const onlyNumber = value.replace(/[^0-9]/g, '');
        if (onlyNumber.length < 4) return onlyNumber;
        if (onlyNumber.length < 8) return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3)}`;
        return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3, 7)}-${onlyNumber.slice(7, 11)}`;
    };

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(formatPhoneNumber(e.target.value));
    };

    // 파일 선택시 파일명 업데이트
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setProfileImageName(file ? file.name : '선택된 파일 없음');
    };

    // 저장하기 - 더미용
    const handleSave = () => {
        if (!nicknameChecked) {
            alert('닉네임 중복 확인을 해주세요.');
            return;
        }
        // 서버 호출 없이 콘솔에 저장할 데이터 출력 후 알림
        console.log('저장할 정보', { name, nickname, phoneNumber, email, profileImageName });
        alert('저장되었습니다. (더미 테스트)');
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
                            <div className="input-row-left">
                                <label className="Drawer-label">이름</label>
                            </div>
                            <input
                                type="text"
                                className="Drawerinput"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름을 입력하세요"
                            />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">닉네임</label>
                                <span className="Drawer-check-duplicate" onClick={handleCheckNickname}>중복확인</span>
                            </div>
                            <input
                                type="text"
                                className="Drawerinput"
                                value={nickname}
                                onChange={(e) => {
                                    setNickname(e.target.value);
                                    setNicknameChecked(false);
                                }}
                                placeholder="닉네임을 입력하세요"
                            />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">핸드폰 번호</label>
                            </div>
                            <input
                                type="tel"
                                className="Drawerinput"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                placeholder="휴대폰 번호를 입력하세요"
                            />
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">프로필 사진</label>
                            </div>
                            <div className="input-with-button">
                                <span className="Drawer-file-name">{profileImageName}</span>
                                <input type="file" id="file" className="Drawer-hidden-file" onChange={handleFileChange} />
                                <label htmlFor="file" className="Drawer-check-btn">파일 업로드</label>
                            </div>
                            <div className="Drawer-underline"></div>
                        </div>

                        <div className="input-row">
                            <div className="input-row-left">
                                <label className="Drawer-label">학교 이메일</label>
                                <img
                                    src={DrawerCheckIcon}
                                    alt='체크아이콘'
                                    style={{ width: '24px', cursor: 'pointer', verticalAlign: 'middle' }}
                                    onClick={() => window.open('', '_blank', 'width=400, height=300')}
                                />
                            </div>
                            <input
                                type="email"
                                className="Drawerinput"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="학교 이메일을 입력하세요"
                            />
                            <div className="Drawer-underline"></div>
                        </div>

                    </div>
                    <button className="Drawer-submit-btn" onClick={handleSave}>저장</button>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <a
                        href="#"
                        style={{
                            display: 'inline-block',
                            color: '#BBBBBB',
                            textDecoration: 'underline',
                            fontWeight: '00',
                            fontSize: '24px',
                            marginBottom: '40px',
                        }}
                    >
                        고객센터
                    </a>
                </div>
            </div>
        </div>
    );
}

export default YouthDrawerEdit;
