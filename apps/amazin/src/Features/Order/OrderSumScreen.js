import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../utils/axiosClient';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';

import { orderDeliverActions, orderPayActions } from '../Order/OrderSlice';
import {
  deliverOrder,
  detailsOrder,
  payOrder
} from '../../Controllers/orderActions';

import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { getImgUrl, pipe } from '../../utils';
import LoadingOrError from '../../components/LoadingOrError';

export default function OrderSumScreen({ match }) {
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const { userInfo } = useSelector((state) => state.userSignin);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const orderDeliver = useSelector((state) => state.orderDeliver);

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axiosClient.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !order ||
      orderPay.success ||
      orderDeliver.success ||
      order._id !== orderId
    ) {
      dispatch(orderPayActions._RESET());
      dispatch(orderDeliverActions._RESET());
      dispatch(detailsOrder(orderId));
      return;
    }
    if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    orderId,
    sdkReady,
    orderPay.success,
    orderDeliver.success,
    order
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return (
    <div className="screen--light">
      <LoadingOrError xl statusOf={orderDetails} />

      {!!order && (
        <>
          <h1 className="p-1">Order {order._id}</h1>

          <div className="row top">
            <div className="col-3">
              <ul>
                <li>
                  <div className="card card__body">
                    <h2>Shipping</h2>

                    <p>
                      <strong>Name:</strong> {order.shippingAddress.fullName}{' '}
                      <br />
                      <strong>Address: </strong> {order.shippingAddress.address}
                      ,{order.shippingAddress.city},{' '}
                      {order.shippingAddress.postalCode},
                      {order.shippingAddress.country}
                    </p>

                    <MessageBox variant="success" show={order.isDelivered}>
                      Delivered at {order.deliveredAt}
                    </MessageBox>
                    <MessageBox variant="danger" show={!order.isDelivered}>
                      Not Delivered
                    </MessageBox>
                  </div>
                </li>

                <li>
                  <div className="card card__body">
                    <h2>Payment</h2>

                    <p>
                      <strong>Method:</strong> {order.paymentMethod}
                    </p>

                    <MessageBox variant="success" show={order.isPaid}>
                      Paid at {order.paidAt}
                    </MessageBox>
                    <MessageBox variant="danger" show={!order.isPaid}>
                      Not Paid
                    </MessageBox>
                  </div>
                </li>

                <li>
                  <div className="card card__body">
                    <h2>Order Items</h2>

                    <ul>
                      {order.orderItems.map((item, id) => (
                        <li key={id}>
                          <div className="row">
                            <div>
                              <img
                                src={getImgUrl(
                                  item.product,
                                  item.image.split('^')[0]
                                )}
                                alt={item.name}
                                className="small"
                              ></img>
                            </div>

                            <div className="min-30">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>

                            <div>
                              {item.qty} x {pipe.showPrice(item.price)} =
                              {' ' + pipe.showPrice(item.qty * item.price)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div className="col-1">
              <div className="card card__body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>

                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>{pipe.showPrice(order.itemsPrice)}</div>
                    </div>
                  </li>

                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>{pipe.showPrice(order.shippingPrice)}</div>
                    </div>
                  </li>

                  <li>
                    <div className="row">
                      <div>Before 19% MwSt.</div>
                      <div>{pipe.showPrice(order.taxPrice)}</div>
                    </div>
                  </li>

                  <li>
                    <div className="row">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>{pipe.showPrice(order.totalPrice)}</strong>
                      </div>
                    </div>
                  </li>

                  {!order.isPaid && (
                    <li>
                      <LoadingBox hide={sdkReady} />
                      {sdkReady && (
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
          </div>
        </>
      )}
    </div>
  );
}
