import React from 'react';
import Header from "../../components/Header/Header";
import './YouthDrawer.css';



function YouthDrawer() {
    return (
        <div>
            <Header />
            <div className="Drawer-main-background">
                <h2 className="Drawer-section-title">▶ 청춘 서랍</h2>
                <div className="edit-card">
                    <h3 className="Drawer-title">개인정보 수정</h3>
                        <div className="edit-form">
                        {/* 닉네임 */}
                            <div className="input-row">
                                <div className="input-row-left">
                                    <label className="Drawer-label">닉네임</label>
                                    <span className="Drawer-check-duplicate" onClick={()=>window.open('','_blank','width=400, height=300')}>중복확인</span>
                                </div>
                                <input type="text" placeholder="닉네임을 입력하세요" />
                                <div className="Drawer-underline"></div>
                            </div>

                            {/* 비밀번호
                            <div className="input-row">
                                <div className="input-row-left">
                                    <label className="label">비밀번호</label>
                                </div>
                                <input type="password" placeholder="비밀번호를 입력하세요" />
                                <div className="underline"></div>
                                
                            </div>
                            */}

                            {/* 비밀번호 확인 */}
                            {/*
                            <div className="input-row">
                                <div className="input-row-left">
                                    <label className="label">비밀번호 확인</label>
                                </div>
                                <input type="password" placeholder="비밀번호를 입력하세요" />
                                <div className="underline"></div>
                            </div>
                            */}

                            {/* 프로필사진 */}
                            <div className="input-row">
                                <div className="input-row-left">
                                    <label className="Drawer-label">프로필 사진</label>
                                </div>
                                <div className="input-with-button">
                                    <span className="Drawer-file-name">선택된 파일 없음</span>
                                    <button className="Drawer-check-btn">파일 업로드</button>
                                </div>
                                <div className="Drawer-underline"></div>
                            </div>
                        </div>
                        <button className="Drawer-submit-btn">저장</button>

                </div>
                <div style={{ textAlign: 'center'}}>
                    <a href="/" style={{ display: 'inline-block',color: '#BBBBBB', textDecoration: 'underline', fontWeight: '600', fontSize: '24px', marginBottom: '40px'}}>
                        고객센터
                    </a>
                </div>

            </div>
        </div>
    )
}

export default YouthDrawer;