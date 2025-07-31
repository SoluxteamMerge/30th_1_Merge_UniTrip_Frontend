import './ReviewCard.css';
import starIcon from '../../assets/mainpage/star.svg';
import heartIcon from '../../assets/mainpage/heart.svg';
import scrapIcon from '../../assets/mainpage/scrap.svg';
import fillscrap from '../../assets/mainpage/fillscrap.svg';

interface ReviewCardProps {
  postId: number;
  title: string;
  categoryName: string;
  thumbnailUrl: string;
  nickname: string;
  //createdAt: string;
  likes: number;
  scrapCount: number;
  rating: number; //백엔드 구현 중
  isLiked: boolean;
  isScraped: boolean;
}

export const ReviewCardTwo = ({
  postId,
  title,
  categoryName,
  thumbnailUrl,
  nickname,
  //createdAt,
  likes,
  scrapCount,
  rating,
  isLiked,
  isScraped,
}: ReviewCardProps) => {

  const DEFAULT_IMAGE_URL = "https://unitripbucket.s3.ap-northeast-2.amazonaws.com/board/b5ab4d10-986a-4d86-b31e-386ccf413f67_KakaoTalk_20250717_171047777.png";
  const finalImageUrl = thumbnailUrl?.trim() || DEFAULT_IMAGE_URL;

  return (
    <div className="review-card">
      <img src={thumbnailUrl} alt="리뷰 이미지" className="card-img" />
      <div className="card-content">
        <div className="card-author-line">
          <p className="card-author">{nickname}</p>
          <div className="card-icons">
            <div className="icon-button">
              <img src={starIcon} alt="별점" />
              <span>{rating}</span>
            </div>
            <div className="icon-button">
              <img src={heartIcon} alt="좋아요" className={isLiked ? 'heart-colored' : ''} />
              <span>{likes}</span>
            </div>
            <div className="icon-button">
              <img src={isScraped? fillscrap : scrapIcon} alt="스크랩" className={isScraped ? 'scrap-colored' : ''}/>
              <span>{scrapCount}</span>
            </div>
          </div>
        </div>
        <p className="card-title">{title}</p>
        <p className="card-category">#{categoryName}</p>
      </div>
    </div>
  );
};
