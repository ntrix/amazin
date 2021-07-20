import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { productReviewCreateActions } from '../ProductSlice';
import {
  createReview,
  detailsProduct
} from '../../../Controllers/productActions';

import MessageBox from '../../../components/MessageBox';
import Rating from '../../../components/Rating';
import LoadingOrError from '../../../components/LoadingOrError';

export default function ProductReview({ productId }) {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userSignin);
  const { product } = useSelector((state) => state.productDetails);
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  return (
    <div className="p-1">
      <h2 id="reviews">Reviews</h2>

      <MessageBox show={product.reviews.length === 0}>
        There is no review
      </MessageBox>

      <ul>
        {product.reviews.map((review, id) => (
          <li key={id}>
            <strong>{review.name}</strong>
            <Rating rating={review.rating} caption=" "></Rating>
            <p>{review.createdAt.substring(0, 10)}</p>
            <p>{review.comment}</p>
          </li>
        ))}

        <li>
          {userInfo ? (
            <form className="form" onSubmit={submitHandler}>
              <div>
                <h2>Write a customer review</h2>
              </div>

              <div>
                <label htmlFor="rating">Rating</label>
                <div className="select-wrapper">
                  <div className="sprite__caret xl"></div>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1- Poor</option>
                    <option value="2">2- Fair</option>
                    <option value="3">3- Good</option>
                    <option value="4">4- Very good</option>
                    <option value="5">5- Exzellent</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="comment">Comment</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label />
                <button className="primary" type="submit">
                  Submit
                </button>
              </div>

              <LoadingOrError statusOf={productReviewCreate} />
            </form>
          ) : (
            <MessageBox show>
              Please <Link to="/signin">Sign In</Link> to write a review
            </MessageBox>
          )}
        </li>
      </ul>
    </div>
  );
}
