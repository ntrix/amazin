import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createReview, detailsProduct } from 'src/apis/productAPI';
import { useShadow } from 'src/hooks/useShadow';
import { productReviewCreateActions } from 'src/slice/ProductSlice';

export function useReview(productId: string) {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();
  const { product }: ProductDetailType = useSelector((state: AppState) => state.productDetails);
  const status: StatusType = useSelector((state: AppState) => state.productReviewCreate);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!status.success) return;
    window.alert('Review Submitted Successfully');
    setRating(0);
    setComment('');
    dispatch(productReviewCreateActions._RESET(''));
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, status.success]);

  const submitReview = (e: EventType) => {
    e.preventDefault();
    if (!comment || !rating) alert('Please enter comment and rating');
    else dispatch(createReview(productId, { name: userInfo?.name, comment, rating }));
  };

  const onComment = (e: EventType) => setComment(e.target.value);

  const onRating = (e: EventType) => setRating(e.target.value);

  return { userInfo, product, status, rating, onRating, comment, onComment, submitReview };
}
