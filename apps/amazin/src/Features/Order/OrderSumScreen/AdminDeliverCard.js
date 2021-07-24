import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deliverOrder } from '../../../Controllers/orderActions';

import LoadingOrError from '../../../components/LoadingOrError';

function AdminDeliverCard() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { order } = useSelector((state) => state.orderDetails);
  const orderDeliver = useSelector((state) => state.orderDeliver);

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return (
    <>
      {((userInfo?.isAdmin && order?.isPaid) ||
        (userInfo?.isSeller &&
          process.env.REACT_APP_ENVIRONMENT === 'development')) &&
        !order?.isDelivered && ( //
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
        )}
    </>
  );
}

export default AdminDeliverCard;
