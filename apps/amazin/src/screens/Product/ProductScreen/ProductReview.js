import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createReview, detailsProduct } from 'src/apis/productAPI';
import { productReviewCreateActions } from 'src/slice/ProductSlice';
import { RATING_OPTS, REVIEWS_PER_PAGE } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import Form from 'src/layouts/Form';
import MessageBox from 'src/components/MessageBox';
import ReviewCard from 'src/components/ReviewCard';
import CustomSelect from 'src/components/CustomSelect';
import CustomInput from 'src/components/CustomInput';

function ProductReview({ productId, reviews }) {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (productReviewCreate.success) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch(productReviewCreateActions._RESET());
      dispatch(detailsProduct(productId));
    }
  }, [dispatch, productId, productReviewCreate.success]);

  const submitReview = (e) => {
    e.preventDefault();
    if (!comment || !rating) alert('Please enter comment and rating');
    else dispatch(createReview(productId, { rating, comment, name: userInfo.name }));
  };

  return (
    <div className="p-1">
      <h2 id="reviews">Reviews</h2>
      <MessageBox show={reviews.length === 0}>There is no review</MessageBox>
      {/* TODO pagination for review section */}
      <ul>
        {reviews.slice(0, REVIEWS_PER_PAGE).map((review, id) => (
          <ReviewCard key={id} review={review} />
        ))}
      </ul>
      <MessageBox show={!userInfo}>
        Please <Link to="/signin">Sign In</Link> to write a review
      </MessageBox>
      {!!userInfo && (
        <Form header="Write a customer review" statusOf={productReviewCreate} onSubmit={submitReview} btn="Submit">
          <CustomSelect label="Rating" list={RATING_OPTS} value={rating} onChange={(e) => setRating(e.target.value)} />

          <CustomInput textarea text="Comment" rows="5" value={comment} onChange={(e) => setComment(e.target.value)} />
        </Form>
      )}
    </div>
  );
}

export default memo(ProductReview);
