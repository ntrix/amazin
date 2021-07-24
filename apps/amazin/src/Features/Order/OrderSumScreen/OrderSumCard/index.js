import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';

import { deliverOrder, payOrder } from '../../../../Controllers/orderActions';

import ListRow from './ListRow';
import LoadingBox from '../../../../components/LoadingBox';
import LoadingOrError from '../../../../components/LoadingOrError';

function OrderSumCard({ sdkReady }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { order = {} } = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);
  const orderDeliver = useSelector((state) => state.orderDeliver);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return (
    <div className="col-1">
      <div className="card card__body">
        <ul>
          <li>
            <h2>Order Summary</h2>
          </li>

          <ListRow label="Items" toShow={order.itemsPrice} />

          <ListRow label="Shipping" toShow={order.shippingPrice} />

          <ListRow label="Before 19% MwSt" toShow={order.taxPrice} />

          <ListRow label="Order Total" toShow={order.totalPrice} active />

          {!order.isPaid && (
            <li>
              <LoadingBox hide={sdkReady} />
              {!!sdkReady && (
                <>
                  <LoadingOrError statusOf={orderPay} />

                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  ></PayPalButton>
                </>
              )}
            </li>
          )}

          {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <li>
              <LoadingOrError statusOf={orderDeliver} />

              <button
                type="button"
                className="primary block"
                onClick={deliverHandler}
              >
                Deliver Order
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default OrderSumCard;
