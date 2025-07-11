import React, { useState } from "react";
import Header from "../components/Header/Header";
import writeIcon from "../assets/write-icon.svg";
import { useNavigate } from "react-router-dom";
import list1Icon from "../assets/toolbar/list1.svg";
import list2Icon from "../assets/toolbar/list2.svg";
import tagIcon from "../assets/toolbar/tag.svg";
import imageInsertIcon from "../assets/toolbar/imageInsert.svg";
import locationIcon from "../assets/toolbar/location.svg";
import starIcon from "../assets/toolbar/star.svg";
import leftlistIcon from "../assets/toolbar/leftlist.svg";
import middlelistIcon from "../assets/toolbar/middlelist.svg";
import rightlistIcon from "../assets/toolbar/rightlist.svg";

const WriteReviewPage: React.FC = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();

  // 메모 입력값(프론트에서만 사용)
  const [memo, setMemo] = useState("");

  const categories = [
    "청춘톡",
    "MT여정지도",
    "함께해요-동행구해요",
    "함께해요-번개모임",
    "함께해요-졸업/휴학여행",
    "함께해요-국내학점교류",
    "카테고리별-해외교환학생"
  ];
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[2]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCategoryOpen(false);
  };

  const isEmailVerified = true; // todo

  return (
    <div className="wr-bg">
      <style>{`
        .wr-bg { background: #e8f0f2; min-height: 100vh; }
        .wr-left {
          position: absolute;
          top: 50%;
          left: 60px;
          transform: translateY(-50%);
          width: 280px;
          min-width: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
        }
        @media (max-width: 900px) {
          .wr-left {
            width: 140px;
            min-width: 100px;
            left: 10px;
            padding-left: 0;
          }
          .wr-memo-box {
            padding-left: 10px;
            padding-right: 6px;
          }
        }
        .wr-container { max-width: 1500px; margin: 0 auto; padding: 0 0px 0px 300px; min-height: 100vh; display: flex; flex-direction: column; }
        .wr-category-select { width: 100%; margin-bottom: 24px; position: relative; }
        .wr-category-btn { width: 80%; margin-left: 40px; background: #fff; border: 1px solid #bbb; border-radius: 8px; padding: 10px 16px; font-size: 16px; font-weight: 500; text-align: left; cursor: pointer; display: flex; align-items: center; position: relative; z-index: 2; }
        .wr-category-arrow { margin-left: auto; transition: transform 0.2s; }
        .wr-category-dropdown {
          position: absolute;
          top: 48px;
          left: 75px;
          width: 80%;
          background: #fff;
          border: 1.5px solid #bbb;
          border-radius: 12px;
          box-shadow: 0 2px 12px #0002;
          z-index: 10;
          padding: 6px 0;
        }
        .wr-category-item {
          padding: 12px 18px;
          font-size: 16px;
          color: #222;
          cursor: pointer;
          transition: background 0.15s;
        }
        .wr-category-item.selected {
          background: #ededed;
          font-weight: 700;
        }
        .wr-category-item:hover {
          background: #f5f5f5;
        }
        .wr-memo-box { width: 90%; background: #fff; border-radius: 15px; border: 1px solid #bbb; padding: 30px 20px 0px 50px; min-height: 500px; margin-bottom: 0; position: relative; height: auto; }
        .wr-memo-label-abs { position: absolute; left: 16px; top: 50%; color: #838383; font-size: 15px; transform: translateY(-50%); }
        .wr-memo-textarea {
          width: 95%;
          height: 320px;
          min-height: 500px;
          max-height: 500px;
          font-size: 15px;
          color: #333;
          border: none;
          outline: none;
          background: repeating-linear-gradient(to bottom, #fff, #fff 31px, #bbb 31px, #fff 32px);
          line-height: 32px;
          padding: 0 0 0 10px;
          box-sizing: border-box;
          resize: none;
          overflow-y: auto;
        }
        .wr-memo-textarea::placeholder {
          line-height: 32px;
        }
        .wr-main { flex: 1; background: #fff; border-radius: 0 0 0 0; box-shadow: 0 1px 6px #0001; border: 1.5px solid #e0e0e0; padding: 0; min-height: 600px; display: flex; flex-direction: column; }
        .wr-toolbar { display: flex; align-items: center; border-bottom: 1px solid #dedede; padding: 18px 32px 10px 32px; gap: 30px; font-size: 22px; color: #222; }
        .wr-toolbar-btn { background: none; border: none; font-size: 30px; cursor: pointer; color: #222; margin-right: 10px; }
        .wr-toolbar-btn:last-child { margin-right: 0; }
        .wr-title-input,
        .wr-content-input {
          font-family: 'Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', Arial, sans-serif;
        }
        .wr-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 80px 0 0 0;
          margin-bottom: 24px;
          position: relative;
        }
        .wr-title-input {
          flex: none;
          width: 70%;
          font-size: 32px;
          font-weight: 700;
          border: none;
          outline: none;
          color: #black;
          background: none;
          text-align: left;
          margin-left: 80px;
        }
        .wr-title-input::placeholder {
          color: #bbb;
          font-weight: 500;
          text-align: left;
          font-size: 32px;
        }
        .wr-private-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-right: 40px;
          position: absolute;
          right: 10px;
          top: 130px;
        }
        .wr-private-label {
          font-size: 20px;
          font-weight: 700;
          color: #333;
        }
        .wr-switch {
          width: 60px;
          height: 32px;
          border-radius: 18px;
          background: #838383;
          position: relative;
          cursor: pointer;
          transition: background 0.2s;
          box-shadow: inset 0 4px 16px 0 rgba(0,0,0,0.18), 0 2px 8px #0002;
          display: inline-block;
        }
        .wr-switch.on {
          background: #88cece;
        }
        .wr-switch-circle {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 2px 8px #0001;
          transition: left 0.2s;
        }
        .wr-switch.on .wr-switch-circle {
          left: 32px;
        }
        .wr-divider {
          border: none;
          border-top: 1.5px solid #bbb;
          margin: 18px 40px 0 40px;
        }
        .wr-content-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 60px 0 0 0;
        }
        .wr-content-input {
          width: 87%;
          min-height: 180px;
          border: none;
          outline: none;
          font-size: 18px;
          color: #black;
          background: none;
          resize: none;
          text-align: left;
          padding-left: 80px;
        }
        .wr-content-input::placeholder {
          color: #bbb;
          text-align: left;
        }
        .wr-floating-write-btn {
          position: fixed;
          right: 60px;
          bottom: 60px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          box-shadow: 0 4px 24px 0 rgba(0,0,0,0.18);
          border: 2px solid #0b0b61;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
        }
        .wr-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.13);
          z-index: 200;
          pointer-events: auto;
        }
        .wr-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          border-radius: 25px;
          box-shadow: 0 4px 32px 0 rgba(0,0,0,0.13);
          padding: 80px 150px 50px 150px;
          z-index: 300;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .wr-modal-text {
          font-size: 20px;
          color: #black;
          font-weight: 700;
          text-align: center;
          margin-bottom: 30px;
          line-height: 1.5;
        }
        .wr-modal-btn {
          background: #0b0b61;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          padding: 12px 48px;
          cursor: pointer;
        }
        .wr-disabled-area {
          pointer-events: none;
          opacity: 0.45;
          filter: blur(0.5px);
        }
      `}</style>
      <Header isLoggedIn={true} username="김눈송" profileUrl="" />
      <div className="wr-content-root" style={{ position: 'relative' }}>
        <div className={isEmailVerified ? undefined : "wr-disabled-area"}>
          <div className="wr-left">
            <div className="wr-category-select">
              <button
                className="wr-category-btn"
                onClick={() => setCategoryOpen(o => !o)}
                type="button"
                disabled={!isEmailVerified}
              >
                <span>{selectedCategory}</span>
                <span className="wr-category-arrow" style={{ transform: categoryOpen ? "rotate(180deg)" : undefined }}>▼</span>
              </button>
              {categoryOpen && (
                <div className="wr-category-dropdown">
                  {categories.map(cat => (
                    <div
                      key={cat}
                      className={"wr-category-item" + (cat === selectedCategory ? " selected" : "")}
                      onClick={() => handleCategorySelect(cat)}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="wr-memo-box">
              <span className="wr-memo-label-abs">메모</span>
              <textarea
                className="wr-memo-textarea"
                value={memo}
                onChange={e => setMemo(e.target.value)}
                placeholder=""
                spellCheck={false}
                autoComplete="off"
                style={{ resize: "none" }}
                disabled={!isEmailVerified}
              />
            </div>
          </div>
          <div className="wr-container">
            <div className="wr-main">
              <div className="wr-toolbar">
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><b>B</b></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><b><u>U</u></b></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><b><s>S</s></b></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={list1Icon} alt="리스트1" style={{ width: 33, height: 40, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={list2Icon} alt="리스트2" style={{ width: 33, height: 40, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={tagIcon} alt="태그" style={{ width: 25, height: 25, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={imageInsertIcon} alt="이미지삽입" style={{ width: 25, height: 25, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={locationIcon} alt="장소정보" style={{ width: 25, height: 25, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={starIcon} alt="즐겨찾기" style={{ width: 25, height: 25, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={leftlistIcon} alt="왼쪽정렬" style={{ width: 40, height: 40, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={middlelistIcon} alt="가운데정렬" style={{ width: 40, height: 40, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={rightlistIcon} alt="오른쪽 정렬" style={{ width: 40, height: 40, verticalAlign: "middle" }} /></button>
              </div>
              <div className="wr-title-row">
                <input className="wr-title-input" placeholder="제목을 입력하세요." disabled={!isEmailVerified} />
                <div className="wr-private-row">
                  <span className="wr-private-label">비공개</span>
                  <div
                    className={"wr-switch" + (isPrivate ? " on" : "")}
                    onClick={() => isEmailVerified && setIsPrivate(v => !v)}
                    role="button"
                    tabIndex={0}
                    aria-checked={isPrivate}
                    style={{ outline: "none" }}
                  >
                    <div className="wr-switch-circle" />
                  </div>
                </div>
              </div>
              <hr className="wr-divider" />
              <div className="wr-content-area">
                <textarea className="wr-content-input" placeholder="내용을 입력하세요..." disabled={!isEmailVerified} />
              </div>
            </div>
          </div>
          {/* 플로팅 버튼 */}
          <button
            className="wr-floating-write-btn"
            onClick={() => isEmailVerified && navigate(-1)}
            aria-label="뒤로가기"
            disabled={!isEmailVerified}
          >
            <img src={writeIcon} alt="글쓰기" style={{ width: 120, height: 120 }} />
          </button>
        </div>
        {!isEmailVerified && (
          <>
            <div className="wr-overlay" style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'absolute' }} />
            <div className="wr-modal">
              <div className="wr-modal-text">
                해당 게시판은 작성 전<br />학교 이메일 인증이 필요합니다.
              </div>
              <button className="wr-modal-btn" onClick={() => navigate('/cjdcnstjfkq')}>인증하기</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WriteReviewPage; 