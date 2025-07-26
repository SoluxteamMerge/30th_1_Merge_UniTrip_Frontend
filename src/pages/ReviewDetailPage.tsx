import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import heartIcon from "../assets/interaction/empathy.svg";
import heartFillIcon from "../assets/interaction/empathy_fill.svg";
import starIcon from "../assets/interaction/scrap.svg";
import starFillIcon from "../assets/interaction/scrap_fill.svg";
import starRatingIcon from "../assets/interaction/star.svg";
import moreIcon from "../assets/interaction/more.svg";
import closeIcon from "../assets/module/close.svg";
import { deleteReview } from '../api/Review/deleteReviewApi';
import { getReviewDetail, ReviewDetailResponse } from '../api/Review/getReviewsApi';
import { likeReview } from '../api/Review/likeReviewApi';
import { bookmarkReview } from '../api/Review/bookmarkReviewApi';

const YouthTalkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isRated, setIsRated] = useState(false);
  
  // 현재 로그인한 사용자 (실제로는 API에서 가져올 예정)
  const currentUser = "김눈송";
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showUrlCopyModal, setShowUrlCopyModal] = useState(false);
  const [showScrapModal, setShowScrapModal] = useState(false);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Array<{
    id: number;
    username: string;
    date: string;
    content: string;
    likes: number;
    isLiked: boolean;
    isEditing: boolean;
    editText: string;
  }>>([]);
  const commentInputRef = React.useRef<HTMLTextAreaElement>(null);

  // API에서 게시글 데이터 가져오기
  const [postData, setPostData] = useState<ReviewDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) {
        console.log('id가 없습니다');
        setLoading(false);
        return;
      }
      
      console.log('게시글 상세 조회 시작:', id);
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken') || undefined;
        console.log('API 호출:', `/api/reviews/${id}`);
        const data = await getReviewDetail(parseInt(id), token);
        console.log('API 응답:', data);
        setPostData(data);
        setIsLiked(data.isLiked);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
        setPostData({
          postId: parseInt(id),
          boardType: "자유게시판",
          categoryName: "청춘톡",
          title: "게시글을 불러올 수 없습니다",
          content: "게시글을 불러오는 중 오류가 발생했습니다.",
          userId: 0,
          nickname: "알 수 없음",
          createdAt: new Date().toISOString(),
          views: 0,
          rating: 0,
          likes: 0,
          isLiked: false
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  // 클릭 외부 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.ytd-more-btn') && !target.closest('.ytd-more-menu')) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 페이지 로드 시 댓글 입력창에 포커스
  useEffect(() => {
    setTimeout(() => {
      commentInputRef.current?.focus();
    }, 100);
  }, []);

  // 로딩 중일 때
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        로딩 중...
      </div>
    );
  }

  console.log('postData 렌더링:', postData);

  // 데이터가 없을 때도 기본 UI 표시
  if (!postData) {
    return (
      <div className="ytd-bg">
        <Header isLoggedIn={true} username="김눈송" profileUrl="" />
        <div style={{ textAlign: 'center', padding: '40px' }}>
          게시글을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  const handleLike = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken') || '';
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        return;
      }

      const response = await likeReview(postData.postId, accessToken);
      
      // 좋아요 상태와 개수 업데이트
      setIsLiked(response.liked);
      setPostData(prev => prev ? {
        ...prev,
        likes: response.likeCount
      } : null);
      
    } catch (error: any) {
      console.error('좋아요 오류:', error);
      
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
      } else {
        alert('좋아요 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const handleStar = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken') || '';
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        return;
      }

      const response = await bookmarkReview(postData.postId, accessToken);
      setIsStarred(response.bookmarked);
      
      // 북마크 개수 업데이트
      setPostData(prev => prev ? {
        ...prev,
        bookmarkCount: response.bookmarkCount
      } : null);

      // 다른 사용자가 스크랩할 때 모달 표시
      if (!response.bookmarked && currentUser !== postData.nickname) {
        setShowScrapModal(true);
      }
    } catch (error: any) {
      console.error('스크랩 오류:', error);
      
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
      } else {
        alert('스크랩 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const handleRating = () => {
    setIsRated(!isRated);
  };

  // URL 복사 함수
  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setShowUrlCopyModal(true);
    }).catch(() => {
      alert('URL 복사에 실패했습니다.');
    });
    setShowMoreMenu(false);
  };

  // URL 복사 모달 닫기
  const handleUrlCopyModalClose = () => {
    setShowUrlCopyModal(false);
  };

  // 스크랩 모달 닫기
  const handleScrapModalClose = () => {
    setShowScrapModal(false);
  };

  // 스크랩 모달에서 글쓰기 페이지로 이동
  const handleScrapModalWrite = () => {
    setShowScrapModal(false);
    navigate('/review-write?category=청춘톡');
  };

  // 수정하기
  const handleEditClick = () => {
    const editData = {
      id: postData.postId,
      title: postData.title,
      content: postData.content,
      category: postData.categoryName,
      rating: postData.rating
    };
    
    const queryString = new URLSearchParams({
      edit: 'true',
      data: JSON.stringify(editData)
    }).toString();
    
    navigate(`/write-review?${queryString}`);
    setShowMoreMenu(false);
  };

  // 삭제 확인 모달 열기
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setShowMoreMenu(false);
  };

  // 삭제 확인
  const handleDeleteConfirm = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken') || '';
      const postId = parseInt(id || '0');
      
      if (!postId) {
        alert('잘못된 게시글 ID입니다.');
        return;
      }

      const response = await deleteReview(postId, accessToken);
      
      if (response.status === 200) {
        setShowDeleteModal(false);
        setShowDeleteSuccessModal(true);
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error: any) {
      console.error('삭제 오류:', error);
      
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
      } else if (error.response?.status === 403) {
        alert('삭제 권한이 없습니다.');
      } else if (error.response?.status === 404) {
        alert('게시글을 찾을 수 없습니다.');
      } else {
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
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



  // 댓글 입력 처리
  const handleCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  // 댓글 등록
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        username: currentUser,
        date: new Date().toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        content: commentText.trim(),
        likes: 0,
        isLiked: false,
        isEditing: false,
        editText: ""
      };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  // Enter 키로 댓글 등록
  const handleCommentKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  // 댓글 좋아요 토글
  const handleCommentLike = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  // 댓글 수정 모드 시작
  const handleCommentEdit = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, isEditing: true, editText: comment.content }
        : comment
    ));
  };

  // 댓글 수정 취소
  const handleCommentEditCancel = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, isEditing: false, editText: "" }
        : comment
    ));
  };

  // 댓글 수정 완료
  const handleCommentEditSubmit = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, content: comment.editText, isEditing: false, editText: "" }
        : comment
    ));
  };

  // 댓글 삭제
  const handleCommentDelete = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  // 댓글 수정 텍스트 변경
  const handleCommentEditChange = (commentId: number, value: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, editText: value }
        : comment
    ));
  };

  return (
    <div className="ytd-bg">
      <style>{`
        .ytd-bg { background: #e8f0f2; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; }
        .ytd-container { max-width: 1200px; margin: 0 auto; padding: 0px; min-height: 100vh; box-shadow: 0 1px 6px #0001; border: 1.5px solid #e0e0e0; }
        .ytd-post-card { background: #fff; border-radius: 0px; overflow: hidden; min-height: 100vh; }
        .ytd-post-header { padding: 100px 20px 30px 20px; border-bottom: 1px solid #bbb; margin: 0 80px; }
        .ytd-public-badge { display: inline-block; font-size: 15px; font-weight: 300; margin-bottom: 12px; font-family: inherit; }
        .ytd-post-title { font-weight: 700; font-size: 24px; color: #black; margin-bottom: 25px; line-height: 1.4; font-family: inherit; }
        .ytd-user-info { display: flex; align-items: center; }
        .ytd-profile { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; margin-right: 15px; background: #eee; }
        .ytd-profile-default { background: #bbb; }
        .ytd-username { color: #838383; font-size: 16px; font-family: inherit; }
        .yt-info-divider { width: 1px; height: 18px; background: #bbb; margin: 0 12px; }
        .ytd-date { color: #838383; font-size: 16px; font-family: inherit; }
        .ytd-interactions { display: flex; align-items: center; gap: 8px; }
        .ytd-interaction-btn { display: flex; align-items: center; gap: 8px; background: none; border: none; cursor: pointer; color: #333; font-size: 20px; font-weight: 700; padding: 8px; transition: all 0.2s; font-family: inherit; }
        .ytd-interaction-btn.active { color: #0b0b61; }
        .ytd-interaction-btn.active .ytd-interaction-count { color: #0b0b61; }
        .ytd-more-btn { 
          background: none; 
          border: none; 
          cursor: pointer; 
          color: #666; 
          font-size: 18px; 
          padding: 8px; 
          border-radius: 8px; 
          transition: background 0.2s; 
          font-family: inherit;
          position: relative;
        }
        .ytd-post-image { width: 1000px; height: 600px; object-fit: cover; margin-top: 100px; margin-left: 100px; }
        .ytd-post-image-with-location { margin-left: 0; }
        .ytd-image-location-container { display: flex; gap: 0px; align-items: flex-start; margin-top: 100px; margin-left: 100px; }
        .ytd-location-info { position: absolute; right: 330px; top: 380px; padding: 15px; min-width: 200px; text-align: right; }
        .ytd-location-name { font-size: 16px; font-weight: bold; margin-bottom: 5px; color: #333; }
        .ytd-location-address { font-size: 14px; color: #666; line-height: 1.4; }
        .ytd-post-content { padding: 80px 100px 80px 100px; }
        .ytd-content-text { color: #black; font-size: 18px; line-height: 1.5; white-space: pre-line; margin-bottom: 20px; font-family: inherit; }
        .ytd-content-text img { 
          width: 1000px; 
          height: 600px; 
          object-fit: cover; 
          margin: 20px 0; 
          display: block;
        }
        .ytd-tags-container { display: flex; gap: 10px; margin-top: 40px; }
        .ytd-tag { border-radius: 20px; padding: 6px 18px; font-size: 14px; font-weight: 500; font-family: inherit; }
        .ytd-tag-main { background: #0b0b61; color: #fff; position: relative; }
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
          padding: 8px 0;
        }
        .ytd-more-menu-item {
          padding: 8px 16px;
          border-bottom: 1px solid #bbb;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          transition: background 0.2s;
          font-family: inherit;
          text-align: center;
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
          font-family: inherit;
        }
        .ytd-modal-content {
          text-align: center;
          font-size: 16px;
          color: #666;
          margin-bottom: 50px;
          line-height: 1.5;
          font-family: inherit;
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
          font-family: inherit;
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
        .ytd-modal.publish {
          padding: 80px 150px 20px 150px;
          min-width: 400px;
          min-height: 370px;
          text-align: center;
        }
        .ytd-publish-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 60px;
        }
        .ytd-publish-title {
          font-size: 20px;
          font-weight: 700;
          color: #333;
        }
        .ytd-publish-close {
          background: none;
          border: none;
          cursor: pointer;
          width: 20px;
          height: 20px;
          padding: 0;
          position: absolute;
          right: 20px;
          top: 20px;
        }
        .ytd-publish-buttons {
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: center;
        }
        .ytd-publish-confirm-btn {
          background: #0b0b61;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px 68px;
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
        }
        .ytd-publish-cancel-btn {
          background: #fff;
          color: #333;
          border: 2px solid #838383;
          border-radius: 10px;
          padding: 12px 48px;
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
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
          font-family: inherit;
        }
        .ytd-comments-section {
          padding: 0px 100px 80px 100px;
        }
        .ytd-comments-title {
          font-size: 24px;
          font-weight: 700;
          color: #000;
          margin-bottom: 0;
          font-family: inherit;
        }
        .ytd-comments-header {
          border-bottom: 2px solid #838383;
          padding-bottom: 20px;
          margin-bottom: 50px;
        }
        .ytd-comment-input-container {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
        }
        .ytd-comment-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #bbb;
          border-radius: 8px;
          font-size: 14px;
          resize: none;
          min-height: 60px;
          outline: none;
          font-family: inherit;
        }
        .ytd-comment-input:focus {
          border-color: #0b0b61;
        }
        .ytd-comment-submit-btn {
          background: #0b0b61;
          color: #fff;
          border: none;
          border-radius: 15px;
          padding: 20px 40px;
          font-size: 24px;
          font-weight: 600;
          cursor: pointer;
          align-self: flex-end;
          font-family: inherit;
        }
        .ytd-comment-item {
          background: #fff;
          border-radius: 0px;
          border: 1px solid #bbb;
          padding: 20px;
          margin-bottom: 12px;
        }
        .ytd-comment-header {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        .ytd-comment-username {
          color: #0b0b61;
          font-weight: 600;
          font-size: 16px;
          font-family: inherit;
        }
        .ytd-comment-divider {
          width: 1px;
          height: 14px;
          background: #ccc;
          margin: 0 8px;
        }
        .ytd-comment-date {
          color: #838383;
          font-size: 13px;
          font-family: inherit;
        }
        .ytd-comment-content {
          color: #101010;
          font-size: 14px;
          line-height: 1.5;
          font-family: inherit;
        }
        .ytd-comment-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 5px;
        }
        .ytd-comment-action-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #838383;
          font-size: 12px;
          font-family: inherit;
          padding: 4px 8px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .ytd-comment-action-btn:hover {
          background: #f5f5f5;
          color: #0b0b61;
        }
        .ytd-comment-action-btn.liked {
          color: #0b0b61;
        }
        .ytd-comment-edit-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #bbb;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          margin-bottom: 8px;
        }
        .ytd-comment-edit-input:focus {
          border-color: #0b0b61;
        }
        .ytd-comment-edit-buttons {
          display: flex;
          gap: 8px;
        }
        .ytd-comment-edit-btn {
          background: #0b0b61;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 12px;
          font-family: inherit;
          cursor: pointer;
        }
        .ytd-comment-edit-btn.cancel {
          background: #f5f5f5;
          color: #666;
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
            <h1 className="ytd-post-title">{postData.title}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="ytd-user-info">
                <div className="ytd-profile ytd-profile-default" />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="ytd-username">{postData.nickname}</div>
                  <div className="yt-info-divider" />
                  <div className="ytd-date">{new Date(postData.createdAt).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</div>
                </div>
              </div>
              <div className="ytd-interactions">
                <button 
                  className={`ytd-interaction-btn ${isLiked ? 'active' : ''}`}
                  onClick={handleLike}
                >
                  <img src={isLiked ? heartFillIcon : heartIcon} alt="좋아요" style={{ width: 30, height: 30 }} />
                  <span className="ytd-interaction-count">{postData.likes + (isLiked ? 1 : 0)}</span>
                </button>
                <button 
                  className="ytd-interaction-btn"
                  onClick={handleStar}
                >
                  <img src={isStarred ? starFillIcon : starIcon} alt="스크랩" style={{ width: 30, height: 30 }} />
                  <span className="ytd-interaction-count">{postData.bookmarkCount}</span>
                </button>
                <button 
                  className="ytd-interaction-btn"
                  onClick={handleRating}
                >
                  <img src={starRatingIcon} alt="별점" style={{ width: 30, height: 30 }} />
                  <span className="ytd-interaction-count">{postData.rating}</span>
                </button>
                <div style={{ position: 'relative' }}>
                  <button 
                    className="ytd-more-btn"
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                  >
                    <img src={moreIcon} alt="더보기" style={{ width: 20, height: 20 }} />
                  </button>
                  {showMoreMenu && (
                    <div className="ytd-more-menu">
                      <div className="ytd-more-menu-item" onClick={handleCopyUrl} style={{ borderTop: '1px solid #bbb' }}>
                        URL 복사
                      </div>
                      <div className="ytd-more-menu-item" onClick={handleEditClick}>
                        수정
                      </div>
                      <div className="ytd-more-menu-item danger" onClick={handleDeleteClick}>
                        삭제
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 게시글 내용 */}
          <div className="ytd-post-content">
            <div className="ytd-content-text" dangerouslySetInnerHTML={{ __html: postData.content }}></div>
            {/* 태그들 */}
            <div className="ytd-tags-container">
              {/* 카테고리 태그 */}
              <span className="ytd-tag ytd-tag-main">
                #{postData.categoryName}
              </span>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="ytd-comments-section">
            <div className="ytd-comments-header">
              <div className="ytd-comments-title">댓글 {comments.length}</div>
            </div>
            {/* 댓글 입력 */}
            <div className="ytd-comment-input-container">
              <textarea
                ref={commentInputRef}
                className="ytd-comment-input"
                placeholder="댓글을 작성해주세요..."
                value={commentText}
                onChange={handleCommentInput}
                onKeyPress={handleCommentKeyPress}
              />
              <button className="ytd-comment-submit-btn" onClick={handleCommentSubmit}>
                등록
              </button>
            </div>

            {/* 댓글 목록 */}
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="ytd-comment-item">
                  <div className="ytd-comment-header">
                    <span className="ytd-comment-username">{comment.username}</span>
                    <div className="ytd-comment-divider" />
                    <span className="ytd-comment-date">{comment.date}</span>
                  </div>
                  
                  {comment.isEditing ? (
                    <div>
                      <textarea
                        className="ytd-comment-edit-input"
                        value={comment.editText}
                        onChange={(e) => handleCommentEditChange(comment.id, e.target.value)}
                        rows={3}
                      />
                      <div className="ytd-comment-edit-buttons">
                        <button 
                          className="ytd-comment-edit-btn" 
                          onClick={() => handleCommentEditSubmit(comment.id)}
                        >
                          완료
                        </button>
                        <button 
                          className="ytd-comment-edit-btn cancel" 
                          onClick={() => handleCommentEditCancel(comment.id)}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="ytd-comment-content">{comment.content}</div>
                  )}
                  
                  <div className="ytd-comment-actions">
                    <button 
                      className={`ytd-comment-action-btn ${comment.isLiked ? 'liked' : ''}`}
                      onClick={() => handleCommentLike(comment.id)}
                    >
                      <img 
                        src={comment.isLiked ? heartFillIcon : heartIcon} 
                        alt="좋아요" 
                        style={{ width: 16, height: 16, marginRight: 4, marginTop: 3 }} 
                      />
                      <span style={{ display: 'inline-block', verticalAlign: 'top', marginTop: 3 }}>{comment.likes}</span>
                    </button>
                    {currentUser === comment.username && (
                      <>
                        <button 
                          className="ytd-comment-action-btn"
                          onClick={() => handleCommentEdit(comment.id)}
                        >
                          수정
                        </button>
                        <button 
                          className="ytd-comment-action-btn"
                          onClick={() => handleCommentDelete(comment.id)}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 0', 
                color: '#838383',
                fontFamily: 'inherit',
                fontSize: '16px'
              }}>
                아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
              </div>
            )}
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

      {/* URL 복사 완료 모달 */}
      {showUrlCopyModal && (
        <div className="ytd-modal-overlay">
          <div className="ytd-modal">
            <div className="ytd-modal-title">URL 복사 완료</div>
            <div className="ytd-modal-content">
              게시글 URL이 클립보드에 복사되었습니다.
            </div>
            <div className="ytd-modal-buttons">
              <button className="ytd-modal-btn success" onClick={handleUrlCopyModalClose}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 스크랩 완료 모달 */}
      {showScrapModal && (
        <div className="ytd-modal-overlay">
          <div className="ytd-modal publish">
            <div className="ytd-publish-header">
              <span className="ytd-publish-title">스크랩하셨네요!<br />나도 작성해볼까요?</span>
              <button className="ytd-publish-close" onClick={handleScrapModalClose}>
                <img src={closeIcon} alt="닫기" style={{ width: 25, height: 25 }} />
              </button>
            </div>
            <div className="ytd-publish-buttons">
              <button className="ytd-publish-confirm-btn" onClick={handleScrapModalWrite}>
                예
              </button>
              <button className="ytd-publish-cancel-btn" onClick={handleScrapModalClose}>
                아니요
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