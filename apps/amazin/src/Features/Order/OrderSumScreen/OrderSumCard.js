import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsOrder } from '../../../Controllers/orderActions';

import { orderDeliverActions, orderPayActions } from '../OrderSlice';

import ListRow from '../components/ListRow';

function OrderSumCard({ orderId }) {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);
  const orderDeliver = useSelector((state) => state.orderDeliver);

  useEffect(() => {
    if (
      !order ||
      orderPay.success ||
      orderDeliver.success ||
      order._id !== orderId
    ) {
      dispatch(orderPayActions._RESET());
      dispatch(orderDeliverActions._RESET());
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, orderId, orderPay.success, orderDeliver.success, order]);

  return (
    <li className="card card__body">
      <ul className="min-20">
        <h2>Order Summary</h2>

        <ListRow label="Items" toShow={order?.itemsPrice} />

        <ListRow label="Shipping" toShow={order?.shippingPrice} />

        <ListRow label="Before 19% MwSt" toShow={order?.taxPrice} />

        <ListRow label="Order Total" toShow={order?.totalPrice} active />
      </ul>
    </li>
  );
}

export default OrderSumCard;
