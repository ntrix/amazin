import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { productReviewCreateActions } from './ProductSlice';
import { createReview, detailsProduct } from '../../Controllers/productActions';

import MessageBox from '../../components/MessageBox';
import Rating from '../../components/Rating';
import { getImgUrl, pipe } from '../../utils';
import LoadingOrError from '../../components/LoadingOrError';
import { STORAGE } from '../../constants';

export default function ProductScreen({ history, match }) {
  const dispatch = useDispatch();
  const productId = match.params.id;

  const { userInfo } = useSelector((state) => state.userSignin);
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);

  const [qty, setQty] = useState(1);
  const [imgActive, setImgActive] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (productReviewCreate.success) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch(productReviewCreateActions._RESET());
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, productReviewCreate.success]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

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
    <div>
      <LoadingOrError xl statusOf={productDetails} />

      {productDetails.success && (
        <div className="col-fill">
          <div>
            <div className="row search__banner">
              <Link
                to={localStorage?.getItem(STORAGE.HISTORY) || '/'}
                className="ml-1"
              >
                Back to result
              </Link>
            </div>
          </div>

          <div className="row top mt-1 p-1">
            <div className="col-2 flex mr-1">
              <div className="tab__w6 flex-col">
                {product?.image?.split('^').map((img, id) => (
                  <img
                    key={id}
                    src={getImgUrl(product._id, img)}
                    alt={`${product.name} small ${id}`}
                    onMouseEnter={() => setImgActive(id)}
                    onClick={() => setImgActive(id)}
                    className={`product__thumbnail ${
                      id === imgActive ? 'active' : ''
                    }`}
                  ></img>
                ))}
              </div>

              <div className="tab__rest">
                <img
                  className="large"
                  src={getImgUrl(
                    product._id,
                    product?.image?.split('^')[imgActive]
                  )}
                  alt={`${product.name} ${imgActive}`}
                ></img>
              </div>
            </div>
            <div className="col-1 mh-2">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>

                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>

                <li>
                  <div>
                    <span className={`price ${product.deal && 'danger'}`}>
                      <sup>{pipe.getSymbol()}</sup>
                      {pipe.getNote(product.price)}
                      <sup>{pipe.getCent(product.price)}</sup>
                    </span>

                    {product.deal > 0 && (
                      <span className="pull-right">
                        <b className="price strike">
                          <sup>{pipe.getSymbol()}</sup>
                          {pipe.getPrice(
                            product.price / (1 - product.deal / 100)
                          )}
                        </b>
                        {'  (' + product.deal}% off)
                      </span>
                    )}
                  </div>
                </li>

                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card m-0 card__body">
                <ul>
                  <li>
                    Seller{' '}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    />
                  </li>

                  <li>
                    <div className="row">
                      <div>Price</div>

                      <div className="price">
                        <sup>{pipe.getSymbol()}</sup>
                        {pipe.getNote(product.price)}
                        <sup>{pipe.getCent(product.price)}</sup>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="row">
                      <div>Status</div>

                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Quantity</div>

                          <div className="select-wrapper">
                            <div className="sprite__caret xl"></div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

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
        </div>
      )}
    </div>
  );
}
