import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import commentIcon from "../assets/interaction/comment.svg";
import heartIcon from "../assets/interaction/empathy.svg";
import starIcon from "../assets/interaction/scrap.svg";
import moreIcon from "../assets/interaction/more.svg";

const YouthTalkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);

  // 실제로는 API에서 데이터를 가져올 예정
  const post = {
    id: id || "1",
    title: "동기들과 함께 제주도 3박 4일 여행 다녀왔습니다",
    content: "동기들과 함께 제주도에 다녀왔습니다!\n\n바닷바람이 너무 심해서 날아가는 줄 알았지만 근처에 있는 한옥을 모티브로 한 베이커리 카페가 정말 맛있었습니다. 기회가 된다면 다녀오시는 걸 추천할게요!",
    username: "김눈송 님",
    date: "2025.05.06 12:01",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    profileUrl: "",
    isPublic: true,
    commentCount: 1,
    likeCount: 2,
    starCount: 2,
    tags: ["#제주도", "#4인여행"]
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleStar = () => {
    setIsStarred(!isStarred);
  };

  // URL 복사 함수
  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert('URL이 복사되었습니다.');
    }).catch(() => {
      alert('URL 복사에 실패했습니다.');
    });
    setShowMoreMenu(false);
  };

  // 삭제 확인 모달 열기
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setShowMoreMenu(false);
  };

  // 삭제 확인
  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    setShowDeleteSuccessModal(true);
  };

  // 삭제 취소
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  // 삭제 완료 확인
  const handleDeleteSuccessConfirm = () => {
    setShowDeleteSuccessModal(false);
    navigate('/youth-talk');
  };

  // 드롭다운 메뉴 외부 클릭 시 닫기
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('.ytd-more-btn') && !target.closest('.ytd-more-menu')) {
      setShowMoreMenu(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="ytd-bg">
      <style>{`
        .ytd-bg { background: #e8f0f2; min-height: 100vh; }
        .ytd-container { max-width: 1200px; margin: 0 auto; padding: 0px; min-height: 100vh; box-shadow: 0 1px 6px #0001; border: 1.5px solid #e0e0e0; }
        .ytd-post-card { background: #fff; border-radius: 0px; overflow: hidden; min-height: 100vh; }
        .ytd-post-header { padding: 100px 20px 30px 20px; border-bottom: 1px solid #bbb; margin: 0 80px; }
        .ytd-public-badge { display: inline-block; font-size: 15px; font-weight: 300; margin-bottom: 12px; }
        .ytd-post-title { font-weight: 700; font-size: 24px; color: #black; margin-bottom: 25px; line-height: 1.4; }
        .ytd-user-info { display: flex; align-items: center; }
        .ytd-profile { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; margin-right: 15px; background: #eee; }
        .ytd-profile-default { background: #bbb; }
        .ytd-username { color: #838383; font-size: 16px; }
        .yt-info-divider { width: 1px; height: 18px; background: #bbb; margin: 0 12px; }
        .ytd-date { color: #838383; font-size: 16px; }
        .ytd-interactions { display: flex; align-items: center; gap: 8px; }
        .ytd-interaction-btn { display: flex; align-items: center; gap: 8px; background: none; border: none; cursor: pointer; color: #333; font-size: 20px; font-weight: 700; padding: 8px; transition: background 0.2s; }
        .ytd-more-btn { background: none; border: none; cursor: pointer; color: #666; font-size: 18px; padding: 8px; border-radius: 8px; transition: background 0.2s; }
        .ytd-post-image { width: 1000px; height: 600px; object-fit: cover; margin-top: 100px; margin-left: 100px; }
        .ytd-post-content { padding: 80px 100px 80px 100px; }
        .ytd-content-text { color: #black; font-size: 18px; line-height: 1.5; white-space: pre-line; margin-bottom: 20px; }
        .ytd-tags-container { display: flex; gap: 10px; margin-top: 40px; }
        .ytd-tag { border-radius: 20px; padding: 6px 18px; font-size: 14px; font-weight: 500; }
        .ytd-tag-main { background: #0b0b61; color: #fff; }
        .ytd-tag-sub { background: #fff; border: 1.5px solid #0b0b61; color: #0b0b61; }
        .ytd-more-menu {
          position: absolute;
          top: 100%;
          right: 0px;
          background: #fff;
          border: 1.5px solid #bbb;
          border-radius: 10px;
          z-index: 10;
          min-width: 120px;
          padding: 8px 0;,
          background: "#fff",
        }
        .ytd-more-menu-item {
          padding: 8px 16px;
          border-bottom: 1px solid #bbb;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          transition: background 0.2s;
        }
        .ytd-more-menu-item:hover {
          background: #f5f5f5;
        }
        .ytd-more-menu-item.danger {
          color: #dc4141;
        }
        .ytd-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }
        .ytd-modal {
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
        .ytd-modal-title {
          font-size: 20px;
          color: #black;
          font-weight: 700;
          text-align: center;
          margin-bottom: 30px;
          line-height: 1.5;
        }
        .ytd-modal-content {
          font-size: 16px;
          color: #666;
          margin-bottom: 50px;
          line-height: 1.5;
        }
        .ytd-modal-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .ytd-modal-btn {
          background: #0b0b61;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          padding: 12px 48px;
          cursor: pointer;
        }
        .ytd-modal-btn.cancel {
          background: #f5f5f5;
          color: #666;
        }
        .ytd-modal-btn.confirm {
          background: #0b0b61;
          color: #fff;
        }
        .ytd-modal-btn.success {
          background: #0b0b61;
          color: #fff;
        }
        .ytd-back-btn {
          position: fixed;
          left: 40px;
          top: 100px;
          background: #fff;
          border: 2px solid #0b0b61;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      `}</style>
      <Header isLoggedIn={true} username="김눈송" profileUrl="" />
      
      {/* 뒤로가기 버튼 */}
      <button className="ytd-back-btn" onClick={() => navigate(-1)}>
        ←
      </button>

      <div className="ytd-container">
        <div className="ytd-post-card">
          {/* 게시글 헤더 */}
          <div className="ytd-post-header">
            <div className="ytd-public-badge">
              {post.isPublic ? "공개" : "비공개"}
            </div>
            <h1 className="ytd-post-title">{post.title}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="ytd-user-info">
                {post.profileUrl ? (
                  <img src={post.profileUrl} alt="프로필" className="ytd-profile" />
                ) : (
                  <div className="ytd-profile ytd-profile-default" />
                )}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="ytd-username">{post.username}</div>
                  <div className="yt-info-divider" />
                  <div className="ytd-date">{post.date}</div>
                </div>
              </div>
              <div className="ytd-interactions">
                <button className="ytd-interaction-btn">
                  <img src={commentIcon} alt="댓글" style={{ width: 30, height: 30 }} />
                  {post.commentCount}
                </button>
                <button 
                  className={`ytd-interaction-btn ${isLiked ? 'active' : ''}`}
                  onClick={handleLike}
                >
                  <img src={heartIcon} alt="좋아요" style={{ width: 30, height: 30 }} />
                  {post.likeCount + (isLiked ? 1 : 0)}
                </button>
                <button 
                  className={`ytd-interaction-btn ${isStarred ? 'active' : ''}`}
                  onClick={handleStar}
                >
                  <img src={starIcon} alt="스크랩" style={{ width: 30, height: 30 }} />
                  {post.starCount + (isStarred ? 1 : 0)}
                </button>
                <div style={{ position: 'relative' }}>
                  <button 
                    className="ytd-more-btn"
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                  >
                    <img src={moreIcon} alt="더보기" style={{ width: 30, height: 30 }} />
                  </button>
                                      {showMoreMenu && (
                      <div className="ytd-more-menu">
                        <div className="ytd-more-menu-item">수정하기</div>
                        <div className="ytd-more-menu-item" onClick={handleCopyUrl}>URL 복사</div>
                        <div className="ytd-more-menu-item danger" onClick={handleDeleteClick}>삭제하기</div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* 게시글 이미지 */}
          <img src={post.imageUrl} alt="게시글 이미지" className="ytd-post-image" />

          {/* 게시글 내용 */}
          <div className="ytd-post-content">
            <div className="ytd-content-text">{post.content}</div>
            {/* 태그들 */}
            <div className="ytd-tags-container">
              {post.tags.map((tag, idx) => (
                <span
                  key={tag}
                  className={idx === 0 ? "ytd-tag ytd-tag-main" : "ytd-tag ytd-tag-sub"}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="ytd-modal-overlay">
          <div className="ytd-modal">
            <div className="ytd-modal-title">게시글 삭제</div>
            <div className="ytd-modal-content">
              정말 삭제하시겠습니까?<br />
              삭제된 게시글은 복구할 수 없습니다.
            </div>
            <div className="ytd-modal-buttons">
              <button className="ytd-modal-btn cancel" onClick={handleDeleteCancel}>
                취소
              </button>
              <button className="ytd-modal-btn confirm" onClick={handleDeleteConfirm}>
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 완료 모달 */}
      {showDeleteSuccessModal && (
        <div className="ytd-modal-overlay">
          <div className="ytd-modal">
            <div className="ytd-modal-title">삭제 완료</div>
            <div className="ytd-modal-content">
              게시글이 삭제되었습니다.
            </div>
            <div className="ytd-modal-buttons">
              <button className="ytd-modal-btn success" onClick={handleDeleteSuccessConfirm}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouthTalkDetailPage; 