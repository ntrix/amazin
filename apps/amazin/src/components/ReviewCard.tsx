import { memo } from 'react';
import Rating from './Rating';

function ReviewCard({ review }: { review: ReviewType }) {
  return (
    <li>
      <strong>{review.name}</strong>
      <Rating rating={review.rating} caption=" " />
      <p>{review.createdAt.substring(0, 10)}</p>
      <p>{review.comment}</p>
    </li>
  );
}

export default memo(ReviewCard);
