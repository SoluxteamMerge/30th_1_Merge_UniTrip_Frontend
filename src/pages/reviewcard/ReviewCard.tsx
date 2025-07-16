// components/ReviewCard.tsx
import './ReviewCard.css';

interface ReviewCardProps {
  title: string;
  tags: string[];
  author: string; // 작성자 추가
}

interface ReviewCardProps {
  title: string;
  tags: string[];
  imageUrl: string;
  author: string;
}

export const ReviewCard = ({ title, tags, imageUrl, author }: ReviewCardProps) => {
  return (
    <div className="review-card">
      <img src={imageUrl} alt="리뷰 이미지" className="card-img" />
      <div className="card-content">
        <p className="card-author">{author}</p>
        <p className="card-title">{title}</p>
        <div className="tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

