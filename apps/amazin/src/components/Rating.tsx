import { memo } from 'react';

type PropType = {
  rating?: number;
  numReviews?: number;
  caption?: string;
  steps?: number;
};

function Rating({ rating = 0, numReviews = rating ? 1 : 0, caption = '', steps = 5 }: PropType) {
  const isHalf = (test: boolean, className: string) => (test ? className : '');

  return (
    <div className="rating">
      <span>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, steps).map((star) => (
          <i
            className={`fa fa-star${star <= rating + 0.5 ? isHalf(star === rating + 0.5, '-half-o') : '-o'}`}
            key={star}
          />
        ))}
      </span>
      <span>{caption || `${numReviews} review${numReviews > 1 ? 's' : ''}`}</span>
    </div>
  );
}

export default memo(Rating);
