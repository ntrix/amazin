import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { detailsOrder } from '../../../Controllers/orderActions';
import { orderDeliverActions, orderPayActions } from '../OrderSlice';

import { getImgUrl, pipe } from '../../../utils';
import axiosClient from '../../../utils/axiosClient';

function OrderItemCard({ orderId, hook: [sdkReady, setSdkReady] }) {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const orderDeliver = useSelector((state) => state.orderDeliver);

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

  return (
    <li className="card card__body">
      <div className="p-1">
        <h2>Order Items</h2>

        <ul>
          {order?.orderItems?.map((item, id) => (
            <li key={id}>
              <div className="row">
                <div>
                  <img
                    src={getImgUrl(item.product, item.image.split('^')[0])}
                    alt={item.name}
                    className="small"
                  ></img>
                </div>

                <div className="min-20">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
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
  );
}

export default OrderItemCard;
