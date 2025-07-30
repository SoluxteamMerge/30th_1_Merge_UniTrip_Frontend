import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header/Header";
import LocationModal from "../components/LocationModal";
import writeIcon from "../assets/write-icon.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import list1Icon from "../assets/toolbar/list1.svg";
import list2Icon from "../assets/toolbar/list2.svg";
import tagIcon from "../assets/toolbar/tag.svg";
import imageInsertIcon from "../assets/toolbar/imageInsert.svg";
import locationIcon from "../assets/toolbar/location.svg";
import starIcon from "../assets/toolbar/star.svg";
import leftlistIcon from "../assets/toolbar/leftlist.svg";
import middlelistIcon from "../assets/toolbar/middlelist.svg";
import rightlistIcon from "../assets/toolbar/rightlist.svg";
import closeIcon from "../assets/module/close.svg";
import starWishIcon from "../assets/module/star_wish.svg";
import starWishFillIcon from "../assets/module/star_wish_fill.svg";
import { postReview } from '../api/Review/writeReviewApi';
import { updateReview } from '../api/Review/updateReviewApi';
import { rateReview } from '../api/Review/ratingReviewApi';

const WriteReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState<number | null>(null);

  const categories = [
    "청춘톡",
    "MT여정지도",
    "함께해요-동행구해요",
    "함께해요-번개모임",
    "함께해요-졸업/휴학여행",
    "함께해요-국내학점교류",
    "함께해요-해외교환학생"
  ];
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // URL 파라미터에서 카테고리 읽어오기
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // 함께해요 카테고리인 경우 "함께해요-" 접두사 추가
      if (["동행구해요", "번개모임", "졸업/휴학여행", "국내학점교류", "해외교환학생"].includes(categoryParam)) {
        setSelectedCategory(`함께해요-${categoryParam}`);
      } else if (categories.includes(categoryParam)) {
        setSelectedCategory(categoryParam);
      }
    }
  }, [searchParams]);

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    const editParam = searchParams.get('edit');
    const dataParam = searchParams.get('data');
    const postIdParam = searchParams.get('postId');
    
    if (editParam === 'true' && dataParam) {
      try {
        const editData = JSON.parse(dataParam);
        setIsEditMode(true);
        setEditPostId(postIdParam ? parseInt(postIdParam) : null);
        setTitle(editData.title || '');
        setContent(editData.content || '');
        setSelectedCategory(editData.category || categories[0]);
        setSelectedImage(editData.imageUrl || '');
        setSelectedLocation(editData.location || null);
        setTags(editData.tags || []);
        setRating(editData.rating || 0);
      } catch (error) {
        console.error('수정 데이터 파싱 오류:', error);
      }
    }
  }, [searchParams]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleInput, setScheduleInput] = useState("");
  const [showTagModal, setShowTagModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    address: string;
    lat: number;
    lng: number;
    kakaoId?: string;
    categoryGroupName?: string;
    region?: string;
  } | null>(null);

  // textarea ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 이메일 인증 상태
  // const isEmailVerified = localStorage.getItem('isEmailVerified') === 'true';
  const isEmailVerified = true; // 임시로 항상 true로 설정
  
  // 디버깅용 콘솔 로그
  // console.log('localStorage isEmailVerified 값:', localStorage.getItem('isEmailVerified'));
  // console.log('isEmailVerified 상태:', isEmailVerified);
  console.log('selectedImage:', selectedImage);
  console.log('selectedLocation:', selectedLocation);
  console.log('tags:', tags);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCategoryOpen(false);
    
    // MT여정지도가 선택되면 MT일정 모달을, 나머지는 여행일정 모달을 표시
    if (cat === "MT여정지도") {
      setShowScheduleModal(true);
    } else {
      setShowScheduleModal(true);
    }
  };

  const handleScheduleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 허용
    const numbersOnly = value.replace(/[^0-9]/g, '');
    
    if (numbersOnly.length <= 12) { // 최대 12자리 (YYMMDDYYMMDD)
      let formatted = '';
      
      // 숫자를 2자리씩 그룹화하여 하이픈과 물결표 추가
      for (let i = 0; i < numbersOnly.length; i++) {
        if (i === 2 || i === 4) {
          formatted += '-';
        } else if (i === 6) {
          formatted += ' ~ ';
        } else if (i === 8 || i === 10) {
          formatted += '-';
        }
        formatted += numbersOnly[i];
      }
      
      setScheduleInput(formatted);
    }
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      const newTag = `#${tagInput.trim()}`;
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const handleTagButtonClick = () => {
    setShowTagModal(true);
  };

  const handleImageButtonClick = () => {
    setShowImageModal(true);
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // 파일을 URL로 변환
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setSelectedImageFile(file);
      }
    };
    input.click();
  };

  const handleImageRemove = () => {
    setSelectedImage("");
    setSelectedImageFile(null);
  };

  const handleRatingButtonClick = () => {
    setShowRatingModal(true);
  };

  const handleStarClick = async (starIndex: number, isHalf: boolean = false) => {
    const newRating = starIndex + (isHalf ? 0.5 : 1);
    setRating(newRating);
    
    // 수정 모드이고 postId가 있을 때만 API 호출
    if (isEditMode && editPostId) {
      try {
        const accessToken = localStorage.getItem('accessToken') || '';
        if (!accessToken) {
          alert('로그인이 필요합니다.');
          return;
        }

        const response = await rateReview(editPostId, newRating, accessToken);
        
        if (response.code === 200) {
          // 성공 메시지는 표시하지 않음 (사용자 경험상)
          console.log('별점 업데이트 성공:', response.message);
        }
      } catch (error: any) {
        console.error('별점 업데이트 오류:', error);
        
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.');
        } else if (error.response?.status === 400) {
          alert('요청 값이 올바르지 않습니다.');
        } else if (error.response?.status === 404) {
          alert('해당 리뷰를 찾을 수 없습니다.');
        } else {
          alert('별점 업데이트 중 오류가 발생했습니다.');
        }
      }
    }
  };

  const handleStarHover = (starIndex: number, isHalf: boolean = false) => {
    const newHoverRating = starIndex + (isHalf ? 0.5 : 1);
    setHoverRating(newHoverRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  // 별점 요소 렌더링 함수
  const renderStarElement = (index: number, currentRating: number) => {
    const starValue = index + 1;
    const halfStarValue = index + 0.5;
    
    if (currentRating >= starValue) {
      // 완전히 채워진 별
      return (
        <img 
          src={starWishFillIcon} 
          alt="별" 
          className="wr-star-img"
          style={{ position: 'relative', zIndex: 1 }}
        />
      );
         } else if (currentRating >= halfStarValue) {
       // 반만 채워진 별
       return (
         <div className="wr-star-half">
           <img 
             src={starWishFillIcon} 
             alt="별" 
             style={{ 
               position: 'absolute', 
               left: 0, 
               top: 0, 
               width: '50%', 
               height: '100%',
               objectFit: 'cover',
               objectPosition: 'left center'
             }}
           />
           <img 
             src={starWishIcon} 
             alt="별" 
             style={{ 
               position: 'absolute', 
               left: 0, 
               top: 0, 
               width: '100%', 
               height: '100%',
               zIndex: -1
             }}
           />
         </div>
       );
    } else {
      // 빈 별
      return (
        <img 
          src={starWishIcon} 
          alt="별" 
          className="wr-star-img"
          style={{ position: 'relative', zIndex: 1 }}
        />
      );
    }
  };

  const handlePublishClick = () => {
    setShowPublishModal(true);
  };

  const handlePublishConfirm = async () => {
    try {
      if (!title.trim()) {
        alert('제목을 입력해주세요.');
        return;
      }
      if (!content.trim()) {
        alert('내용을 입력해주세요.');
        return;
      }
      if (!rating || rating === 0) {
        alert('별점을 입력해주세요.');
        return;
      }

      const accessToken = localStorage.getItem('accessToken') || '';

      if (isEditMode && editPostId) {
        // 수정 모드
        const updateData = {
          boardType: selectedCategory,
          categoryName: selectedCategory,
        title: title.trim(),
          content: content,
        };

        const res = await updateReview(editPostId, updateData, accessToken);
        if (res.status === 200) {
          alert(res.message);
          // 수정 완료 후 상세 페이지로 이동
          navigate(`/review-detail/${editPostId}`);
        } else {
          alert('리뷰 수정에 실패했습니다.');
        }
      } else {
        // 새로 작성 모드
        // 카테고리를 boardType으로 매핑 (백엔드 형식에 맞춤)
        const categoryToBoardType: Record<string, string> = {
          "청춘톡": "청춘톡",
          "MT여정지도": "MT/LT",
          "함께해요-동행구해요": "동행모집",
          "함께해요-번개모임": "모임구인",
          "함께해요-졸업/휴학여행": "졸업/휴학여행",
          "함께해요-국내학점교류": "국내학점교류",
          "함께해요-해외교환학생": "해외교환",
        };

        const boardType = categoryToBoardType[selectedCategory] || selectedCategory;
        
        // 태그들을 categoryName에 포함 (선택된 카테고리는 제외)
        const tagString = tags.length > 0 ? tags.join(', ') : '';
        const categoryNameWithTags = tagString || selectedCategory;
        
        const reviewData = {
          boardType: boardType,
          categoryName: categoryNameWithTags,
          title: title.trim(),
          content: content,
          placeName: selectedLocation?.name || '',
          address: selectedLocation?.address || '',
          kakaoId: selectedLocation?.kakaoId || '',
          categoryGroupName: selectedLocation?.categoryGroupName || '',
          region: selectedLocation?.region || '',
          lat: selectedLocation?.lat || 0,
          lng: selectedLocation?.lng || 0
        };

        const images: File[] = [];
        if (selectedImageFile) {
          images.push(selectedImageFile);
        }
        const res = await postReview(reviewData, images, accessToken);
        if (res.status === 200) {
          alert(res.message);
          // 성공 시 페이지 이동
        switch (selectedCategory) {
          case "청춘톡":
            navigate('/youth-talk');
            break;
          case "MT여정지도":
            navigate('/mt-journey');
            break;
          case "함께해요-동행구해요":
            navigate('/together?category=동행구해요');
            break;
          case "함께해요-번개모임":
            navigate('/together?category=번개모임');
            break;
          case "함께해요-졸업/휴학여행":
            navigate('/together?category=졸업/휴학여행');
            break;
          case "함께해요-국내학점교류":
            navigate('/together?category=국내학점교류');
            break;
          case "함께해요-해외교환학생":
            navigate('/together?category=해외교환학생');
            break;
          default:
            navigate('/youth-talk');
        }
      } else {
        alert('게시글 등록에 실패했습니다.');
        }
      }
    } catch (error: any) {
      console.error('게시글 처리 오류:', error);
      
      // 백엔드에서 보내는 에러 메시지 확인
      if (error.response) {
        console.error('에러 응답:', error.response.data);
        console.error('에러 상태:', error.response.status);
        alert(`게시글 등록 실패: ${error.response.data?.message || '알 수 없는 오류가 발생했습니다.'}`);
      } else if (error.request) {
        console.error('에러 요청:', error.request);
        alert('서버에 연결할 수 없습니다.');
      } else {
        console.error('에러 설정:', error.message);
        alert(isEditMode ? '리뷰 수정 중 오류가 발생했습니다.' : '게시글 등록 중 오류가 발생했습니다.');
      }
    }
    setShowPublishModal(false);
  };

  const getTravelType = (category: string) => {
    switch (category) {
      case "MT여정지도":
        return "국내";
      case "함께해요-해외교환학생":
        return "해외";
      default:
        return "기타";
    }
  };

  const handlePublishCancel = () => {
    setShowPublishModal(false);
  };

  const handleLocationButtonClick = () => {
    setShowLocationModal(true);
  };

  const handleLocationSelect = (location: { 
    name: string; 
    address: string; 
    lat: number; 
    lng: number;
    kakaoId?: string;
    categoryGroupName?: string;
    region?: string;
  }) => {
    setSelectedLocation(location);
  };

  // textarea 높이 자동 조정 함수
  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const getModalMessage = () => {
    if (selectedCategory === "MT여정지도") {
      return "MT 일정을 입력해주세요";
    } else {
      return "여행 일정을 입력해주세요";
    }
  };

  // 이메일 인증 상태 확인 및 날짜 모달 자동 표시
  useEffect(() => {
    if (isEmailVerified) {
      setShowScheduleModal(true);
    }
  }, [isEmailVerified]);

  // textarea 높이 자동 조정
  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  }, [content]);

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
        .wr-container { max-width: 1200px; margin: 0 auto; padding: 0px; min-height: 100vh; display: flex; flex-direction: column; }
        .wr-main { flex: 1; background: #fff; border-radius: 0; box-shadow: 0 1px 6px #0001; border: 1.5px solid #e0e0e0; padding: 0; min-height: 600px; display: flex; flex-direction: column; }
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
          padding: 0 0 0 0;
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
        .wr-category-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 40px;
          padding: 0 40px;
          margin-bottom: 0px;
        }
        .wr-category-select {
          width: 220px;
          position: relative;
        }
        .wr-category-btn {
          width: 100%;
          background: #fff;
          border: 1px solid #bbb;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 16px;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .wr-category-arrow {
          margin-left: auto;
          transition: transform 0.2s;
        }
        .wr-category-dropdown {
          position: absolute;
          top: 48px;
          left: 0;
          width: 100%;
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
        .wr-content-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .wr-content-input {
          width: 93%;
          min-height: 100px;
          border: none;
          outline: none;
          font-size: 18px;
          color: #black;
          background: none;
          resize: none;
          text-align: left;
          padding-left: 90px;
          word-wrap: break-word;
          white-space: pre-wrap;
          overflow-y: visible;
        }
        .wr-content-input::placeholder {
          color: #bbb;
          text-align: left;
        }
        
        .wr-media-section {
          margin-top: 20px;
          margin-left: 100px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .wr-location-container {
          position: relative;
          margin-bottom: 20px;
          align-self: flex-start;
        }
        .wr-image-container {
          position: relative;
          margin-bottom: 60px;
        }
        .wr-post-image {
          width: 1000px;
          height: 600px;
          object-fit: cover;
        }
        .wr-location-info {
          padding: 15px;
          background-color: #fff;
          min-width: 200px;
          text-align: left;
          margin-right: 0;
        }
        .wr-location-name {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 5px;
          color: #333;
        }
        .wr-location-address {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        }
        .wr-tags-container {
          display: flex;
          gap: 10px;
          margin-bottom: 50px;
        }
        .wr-tag {
          border-radius: 20px;
          padding: 6px 18px;
          font-size: 14px;
          font-weight: 500;
        }
        .wr-tag-main {
          background: #0b0b61;
          color: #fff;
          position: relative;
        }
        .wr-tag-sub {
          background: #fff;
          border: 1.5px solid #0b0b61;
          color: #0b0b61;
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
        .wr-modal.schedule {
          padding: 80px 120px 20px 120px;
          min-width: 400px;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
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
        .wr-modal-btn.schedule {
          width: 150%;
          padding: 12px 80px;
        }
        .wr-schedule-input-container {
          margin-bottom: 50px;
          width: 150%;
        }
        .wr-schedule-label {
          display: block;
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 400;
          color: #bbb;
          text-align: left;
        }
        .wr-schedule-input {
          width: 100%;
          padding: 0px;
          font-size: 10px;
          box-sizing: border-box;
        }
        .wr-schedule-input::placeholder {
          color: #999;
          opacity: 1;
        }
        .wr-date-row {
          display: flex;
          justify-content: center;
        }
        .wr-date-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .wr-modal.tag {
          position: fixed;
          top: 160px;
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          border-radius: 25px;
          box-shadow: 0 4px 32px 0 rgba(0,0,0,0.13);
          padding: 40px;
          z-index: 300;
          min-width: 600px;
        }
        .wr-tag-header {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          gap: 470px;
        }
        .wr-tag-title {
          font-size: 20px;
          font-weight: 700;
          color: #838383;
        }
        .wr-tag-close {
          cursor: pointer;
          width: 20px;
          height: 20px;
          background: none;
          border: none;
          padding: 0;
        }
        .wr-tag-input-container {
          width: 110%;
          padding: 0 20px;
        }
        .wr-tag-input-wrapper {
          margin-bottom: 15px;
          border-radius: 30px;
          background: #dedede;
          padding: 2px;
        }
        .wr-tag-input {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 15px;
          font-size: 16px;
          box-sizing: border-box;
          outline: none;
        }
        .wr-tag-input::placeholder {
          color: #999;
          opacity: 1;
        }
        .wr-tags-display {
          margin-top: 15px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .wr-tag-badge {
          display: inline-flex;
          align-items: center;
          background: #0b0b61;
          color: #fff;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 300;
        }
        .wr-tag-remove {
          background: none;
          border: none;
          color: #fff;
          margin-left: 8px;
          cursor: pointer;
          font-size: 20px;
          font-weight: 200;
          padding: 0;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wr-image-upload-row {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .wr-image-input-wrapper {
          flex: 1;
          position: relative;
          border-bottom: 1px solid #bbb;
          padding-bottom: 10px;
        }
        .wr-image-input {
          width: 100%;
          padding: 10px 0px 0px 10px;
          border: none;
          outline: none;
          font-size: 15px;
          font-weight: 500;
          color: #999;
          background: none;
        }
        .wr-image-remove {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          font-size: 18px;
          padding: 0;
        }
        .wr-file-upload-btn {
          background: #fff;
          border: 2px solid #bbb;
          border-radius: 11px;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 700;
          color: #101010;
          cursor: pointer;
          white-space: nowrap;
        }
        .wr-rating-upload-row {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .wr-rating-input-wrapper {
          flex: 1;
          position: relative;
          border-bottom: 1px solid #bbb;
          padding-bottom: 10px;
        }
        .wr-rating-display {
          display: flex;
          gap: 25px;
          padding: 10px 0px 0px 10px;
        }
        .wr-star-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .wr-star-img {
          width: 40px;
          height: 40px;
          transition: all 0.2s;
        }
        .wr-star-half {
          position: relative;
          overflow: hidden;
          width: 40px;
          height: 40px;
        }
        .wr-star-half::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 50%;
          height: 100%;
          background: url(${starWishFillIcon}) no-repeat left center;
          background-size: 40px 40px;
          z-index: 1;
        }
        .wr-rating-confirm-btn {
          background: #fff;
          border: 2px solid #bbb;
          border-radius: 11px;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 700;
          color: #101010;
          cursor: pointer;
          white-space: nowrap;
        }
        .wr-location-display {
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }
        .wr-location-name {
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 16px;
        }
        .wr-location-address {
          color: #666;
          font-size: 14px;
        }
        .wr-modal.publish {
          padding: 100px 150px 20px 150px;
          min-width: 400px;
          min-height: 350px;
          text-align: center;
        }
        .wr-publish-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 60px;
        }
        .wr-publish-title {
          font-size: 20px;
          font-weight: 700;
          color: #333;
        }
        .wr-publish-close {
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
        .wr-publish-buttons {
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: center;
        }
        .wr-publish-confirm-btn {
          background: #0b0b61;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px 68px;
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
        }

        .wr-publish-cancel-btn {
          background: #fff;
          color: #333;
          border: 2px solid #838383;
          border-radius: 10px;
          padding: 12px 48px;
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
              <Header isLoggedIn={!!localStorage.getItem('accessToken')} username="" profileUrl="" />
      <div className="wr-content-root" style={{ position: 'relative' }}>
        <div className={isEmailVerified ? undefined : "wr-disabled-area"}>
          <div className="wr-left">

          </div>
          <div className="wr-container">
            <div className="wr-main">
              <div className="wr-toolbar">
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><b>B</b></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><b><u>U</u></b></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><b><s>S</s></b></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={list1Icon} alt="리스트1" style={{ width: 33, height: 40, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={list2Icon} alt="리스트2" style={{ width: 33, height: 40, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified} onClick={handleTagButtonClick}><img src={tagIcon} alt="태그" style={{ width: 25, height: 25, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified} onClick={handleImageButtonClick}><img src={imageInsertIcon} alt="이미지삽입" style={{ width: 25, height: 25, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified} onClick={handleLocationButtonClick}><img src={locationIcon} alt="장소정보" style={{ width: 25, height: 25, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified} onClick={handleRatingButtonClick}><img src={starIcon} alt="즐겨찾기" style={{ width: 25, height: 25, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={leftlistIcon} alt="왼쪽정렬" style={{ width: 40, height: 40, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={middlelistIcon} alt="가운데정렬" style={{ width: 40, height: 40, verticalAlign: "middle" }} /></button>
                <button className="wr-toolbar-btn" disabled={!isEmailVerified}><img src={rightlistIcon} alt="오른쪽 정렬" style={{ width: 40, height: 40, verticalAlign: "middle" }} /></button>
              </div>
              <div className="wr-category-row">
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
              </div>
              <div className="wr-title-row">
                <input 
                  className="wr-title-input" 
                  placeholder="제목을 입력하세요." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={!isEmailVerified} 
                />
              </div>
              

              
              <hr className="wr-divider" />
              <div className="wr-content-area">
                <div className="wr-content-wrapper">
                  <textarea 
                    ref={textareaRef}
                    className="wr-content-input" 
                    placeholder="최근 다녀온 곳을 지도와 함께 기록해 보세요!" 
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      adjustTextareaHeight(e.target);
                    }}
                    disabled={!isEmailVerified} 
                  />
                  
                  {/* 미디어 섹션 (장소, 이미지, 태그) */}
                  {(selectedImage || selectedLocation || tags.length > 0) && (
                    <div className="wr-media-section">
                      {/* 장소 정보 */}
                      {selectedLocation && (
                        <div className="wr-location-container">
                          <div className="wr-location-info">
                            <div className="wr-location-name">
                              <img 
                                src={locationIcon} 
                                alt="위치" 
                                style={{ 
                                  width: '16px', 
                                  height: '16px', 
                                  marginRight: '8px',
                                  verticalAlign: 'middle'
                                }} 
                              />
                              {selectedLocation.name}
                            </div>
                            <div className="wr-location-address">
                              {selectedLocation.address}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* 이미지 */}
                      {selectedImage && (
                        <div className="wr-image-container">
                          <img src={selectedImage} alt="업로드된 이미지" className="wr-post-image" />
                        </div>
                      )}
                      
                      {/* 태그들 */}
                      {tags.length > 0 && (
                        <div className="wr-tags-container">
                          {tags.map((tag, idx) => (
                            <span
                              key={tag}
                              className={idx === 0 ? "wr-tag wr-tag-main" : "wr-tag wr-tag-sub"}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
          {/* 플로팅 버튼 */}
          <button
            className="wr-floating-write-btn"
            onClick={() => isEmailVerified && handlePublishClick()}
            aria-label="게시하기"
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
              <button className="wr-modal-btn" onClick={() => navigate('/youth-drawer')}>인증하기</button>
            </div>
          </>
        )}
        {showScheduleModal && (
          <>
            <div className="wr-overlay" />
            <div className="wr-modal schedule">
              <div className="wr-modal-text">
                {getModalMessage()}
              </div>
              <div className="wr-schedule-input-container">
                <label className="wr-schedule-label">날짜</label>
                <input 
                  type="text" 
                  className="wr-schedule-input"
                  placeholder="YY-MM-DD ~ YY-MM-DD"
                  value={scheduleInput}
                  onChange={handleScheduleInput}
                />
              </div>
              <button className="wr-modal-btn schedule" onClick={() => setShowScheduleModal(false)}>확인</button>
            </div>
          </>
        )}
        {showTagModal && (
          <>
            <div className="wr-overlay" />
            <div className="wr-modal tag">
              <div className="wr-tag-header">
                <span className="wr-tag-title">태그</span>
                <button className="wr-tag-close" onClick={() => setShowTagModal(false)}>
                  <img src={closeIcon} alt="닫기" style={{ width: 25, height: 25 }} />
                </button>
              </div>
              <div className="wr-tag-input-container">
                <div className="wr-tag-input-wrapper">
                  <input 
                    type="text" 
                    className="wr-tag-input"
                    placeholder="태그를 입력해주세요... 입력 후 엔터 또는 콤마"
                    value={tagInput}
                    onChange={handleTagInput}
                    onKeyPress={handleTagSubmit}
                  />
                </div>
                <div className="wr-tags-display">
                  {tags.map((tag, index) => (
                    <span key={index} className="wr-tag-badge">
                      {tag}
                      <button 
                        className="wr-tag-remove" 
                        onClick={() => {
                          setTags(tags.filter((_, i) => i !== index));
                          if (tags.length === 1) {
                            setShowTagModal(false);
                          }
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {showImageModal && (
          <>
            <div className="wr-overlay" />
            <div className="wr-modal tag">
              <div className="wr-tag-header">
                <span className="wr-tag-title">이미지</span>
                <button className="wr-tag-close" onClick={() => setShowImageModal(false)}>
                  <img src={closeIcon} alt="닫기" style={{ width: 25, height: 25 }} />
                </button>
              </div>
              <div className="wr-tag-input-container">
                <div className="wr-image-upload-row">
                  <div className="wr-image-input-wrapper">
                    <input 
                      type="text" 
                      className="wr-image-input"
                      placeholder="이미지를 선택해주세요"
                      value={selectedImage ? "이미지가 선택되었습니다" : ""}
                      readOnly
                    />
                    <button className="wr-image-remove" onClick={handleImageRemove}>×</button>
                  </div>
                  <button className="wr-file-upload-btn" onClick={handleFileUpload}>파일업로드</button>
                </div>
              </div>
            </div>
          </>
        )}

        {showRatingModal && (
          <>
            <div className="wr-overlay" />
            <div className="wr-modal tag">
              <div className="wr-tag-header">
                <span className="wr-tag-title">별점</span>
                <button className="wr-tag-close" onClick={() => setShowRatingModal(false)}>
                  <img src={closeIcon} alt="닫기" style={{ width: 25, height: 25 }} />
                </button>
              </div>
              <div className="wr-tag-input-container">
                <div className="wr-rating-upload-row">
                  <div className="wr-rating-input-wrapper">
                    <div className="wr-rating-display">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                          {/* 왼쪽 반쪽 별 (클릭 시 0.5점) */}
                          <button
                            className="wr-star-btn"
                            style={{ 
                              position: 'absolute', 
                              left: 0, 
                              top: 0, 
                              width: '50%', 
                              height: '100%',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              zIndex: 2
                            }}
                            onClick={() => handleStarClick(index, true)}
                            onMouseEnter={() => handleStarHover(index, true)}
                            onMouseLeave={handleStarLeave}
                          />
                          {/* 오른쪽 반쪽 별 (클릭 시 1점) */}
                          <button
                            className="wr-star-btn"
                            style={{ 
                              position: 'absolute', 
                              right: 0, 
                              top: 0, 
                              width: '50%', 
                              height: '100%',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              zIndex: 2
                            }}
                            onClick={() => handleStarClick(index, false)}
                            onMouseEnter={() => handleStarHover(index, false)}
                            onMouseLeave={handleStarLeave}
                          />
                          {/* 별 이미지 */}
                          {renderStarElement(index, hoverRating || rating)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="wr-rating-confirm-btn" onClick={() => setShowRatingModal(false)}>
                    확인
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {showPublishModal && (
          <>
            <div className="wr-overlay" />
            <div className="wr-modal publish">
              <div className="wr-publish-header">
                <span className="wr-publish-title">게시하시겠습니까?</span>
                <button className="wr-publish-close" onClick={handlePublishCancel}>
                  <img src={closeIcon} alt="닫기" style={{ width: 25, height: 25 }} />
                </button>
              </div>
              <div className="wr-publish-buttons">
                <button className="wr-publish-confirm-btn" onClick={handlePublishConfirm}>
                  예
                </button>
                <button className="wr-publish-cancel-btn" onClick={handlePublishCancel}>
                  아니요
                </button>
              </div>
            </div>
          </>
        )}
        <LocationModal
          isOpen={showLocationModal}
          onClose={() => {
            console.log('모달 닫기 전 selectedLocation:', selectedLocation);
            setShowLocationModal(false);
            console.log('모달 닫기 후 selectedLocation:', selectedLocation);
          }}
          onLocationSelect={handleLocationSelect}
        />
      </div>
    </div>
  );
};

export default WriteReviewPage; 