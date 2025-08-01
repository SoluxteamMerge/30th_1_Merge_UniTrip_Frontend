import './ReviewCard.css';
import starIcon from '../../assets/mainpage/star.svg';
import heartIcon from '../../assets/mainpage/heart.svg';
import scrapIcon from '../../assets/mainpage/scrap.svg';
//import fillscrap from '../../assets/mainpage/fillscrap.svg';

interface ReviewCardProps {
  postId: number;
  postTitle: string;
  categoryName: string;
  imageUrl: string;
  nickname: string;
  //createdAt: string;
  rating: number; 
  likeCount: number;
  scrapCount: number; 
  //isLiked: boolean;
  //isScraped: boolean;
}

export const ReviewCardTwo = ({
  postId,
  postTitle,
  categoryName,
  imageUrl,
  nickname,
  //createdAt,
  rating,
  likeCount,
  scrapCount,
  //isLiked,
  //isScraped,
}: ReviewCardProps) => {

  const DEFAULT_IMAGE_URL = "https://unitripbucket.s3.ap-northeast-2.amazonaws.com/board/b5ab4d10-986a-4d86-b31e-386ccf413f67_KakaoTalk_20250717_171047777.png";
  const finalImageUrl = imageUrl?.trim() || DEFAULT_IMAGE_URL;

  return (
    <div className="review-card">
      <img src={finalImageUrl} alt="리뷰 이미지" className="card-img" />

      <div className="card-content">
        <div className="card-author-line">
          <p className="card-author">{nickname}</p>
          <div className="card-icons">
            <div className="icon-button">
              <img src={starIcon} alt="별점" />
              <span>{rating}</span>
            </div>
            <div className="icon-button">
              <img src={heartIcon} alt="좋아요"/>
              <span>{likeCount}</span>
            </div>
            <div className="icon-button">
              <img src={scrapIcon} alt="스크랩" />
              <span>{scrapCount}</span>
            </div>
          </div>
        </div>
        <p className="card-title">{postTitle}</p>
        <p className="card-category">#{categoryName}</p>
      </div>
    </div>
  );
};
