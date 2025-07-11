// components/ReviewCard.tsx
import './ReviewCard.css';

interface ReviewCardProps {
  title: string;
  tags: string[];
  imageUrl: string;
  summary: string;
}

export const ReviewCard = ({ title, tags, imageUrl, summary }: ReviewCardProps) => {
  return (
    <div className="review-card">
      <img src={imageUrl} alt="리뷰 이미지" className="card-img" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{summary}</p>
        <div className="tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
