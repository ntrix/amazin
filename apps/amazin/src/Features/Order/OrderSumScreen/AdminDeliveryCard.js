import React from 'react';
import { useSelector } from 'react-redux';

import LoadingOrError from '../../../components/LoadingOrError';

function AdminDeliveryCard({ deliverHandler }) {
  const { userInfo } = useSelector((state) => state.userSignin);
  const { order } = useSelector((state) => state.orderDetails);
  const orderDeliver = useSelector((state) => state.orderDeliver);

  return ((userInfo?.isAdmin && order?.isPaid) ||
    (userInfo?.isSeller &&
      process.env.REACT_APP_ENVIRONMENT === 'development')) &&
    !order?.isDelivered ? (
    <li className="card card__body">
      <div className="min-20">
        <LoadingOrError statusOf={orderDeliver} />

        <button
          type="button"
          className="primary block"
          onClick={deliverHandler}
        >
          Deliver Order
        </button>
      </div>
    </li>
  ) : (
    <></>
  );
}

export default AdminDeliveryCard;
