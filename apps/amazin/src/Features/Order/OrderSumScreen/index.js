import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ListCard from './ListCard';
import OrderItemCard from './OrderItemCard';
import OrderSumCard from './OrderSumCard';
import LoadingOrError from '../../../components/LoadingOrError';

export default function OrderSumScreen({ match }) {
  const orderId = match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order = {} } = orderDetails;
  const { shippingAddress: ad = {} } = order;

  const [sdkReady, setSdkReady] = useState(false);

  return (
    <div className="screen--light">
      <LoadingOrError xl statusOf={orderDetails} />

      <h1 className="p-1">Order {order?._id || 'No'}</h1>

      {!!order && (
        <div className="row top">
          <ul className="col-3">
            <ListCard
              label="Shipping"
              statusOf={order.isDelivered}
              textOf="Delivered"
              when={order.deliveredAt}
            >
              <strong>Name:</strong> {ad.fullName} <br />
              <strong>Address: </strong> {ad.address},{ad.city}, {ad.postalCode}
              ,{ad.country}
            </ListCard>

            <ListCard
              label="Payment"
              statusOf={order.isPaid}
              textOf="Paid"
              when={order.paidAt}
            >
              <strong>Method:</strong> {order.paymentMethod}
            </ListCard>

            <OrderItemCard orderId={orderId} hook={[sdkReady, setSdkReady]} />
          </ul>

          <OrderSumCard sdkReady={sdkReady} />
        </div>
      )}
    </div>
  );
}
