import './ReviewCard.css';
import starIcon from '../../assets/mainpage/star.svg';
import heartIcon from '../../assets/mainpage/heart.svg';
import scrapIcon from '../../assets/mainpage/scrap.svg';

interface ReviewCardProps {
  postId: number;
  postTitle: string;
  categoryName: string;
  imageUrl: string | null;
  nickname: string;
  rating: number;
  likeCount: number;
  scrapCount: number;
}

export const ReviewCard = ({
  postId,
  postTitle,
  categoryName,
  imageUrl,
  nickname,
  rating,
  likeCount,
  scrapCount,
}: ReviewCardProps) => {
  return (
    <div className="review-card">
      {imageUrl ? (
        <img src={imageUrl} alt="리뷰 이미지" className="card-img" />
      ) : (
        <div className="card-img-placeholder">이미지 없음</div>
      )}

      <div className="card-content">
        <div className="card-author-line">
          <p className="card-author">{nickname}</p>
          <div className="card-icons">
            <div className="icon-button">
              <img src={starIcon} alt="별점" />
              <span>{rating}</span>
            </div>
            <div className="icon-button">
              <img src={heartIcon} alt="좋아요" />
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
