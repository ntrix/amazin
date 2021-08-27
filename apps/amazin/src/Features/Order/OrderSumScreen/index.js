import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axiosClient from '../../../apis/axiosClient';
import { detailsOrder, payOrder, deliverOrder } from '../../../apis/orderAPI';
import { orderDeliverActions, orderPayActions } from '../OrderSlice';

import StatusBox from './StatusBox';
import OrderItemsCard from '../components/OrderItemsCard';
import OrderSumCard from './OrderSumCard';
import PaypalCard from './PaypalCard';
import AdminDeliveryCard from './AdminDeliveryCard';

import ShippingAddressCard from '../components/ShippingAddressCard';
import PaymentMethodCard from '../components/PaymentMethodCard';
import LoadingOrError from '../../../components/LoadingOrError';

export default function OrderSumScreen({ match }) {
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const orderDeliver = useSelector((state) => state.orderDeliver);

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalSdk = async () => {
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

    if (order?.isPaid) return;
    if (!window.paypal) addPayPalSdk();
    else setSdkReady(true);
  }, [
    dispatch,
    order,
    setSdkReady,
    orderId,
    orderPay.success,
    orderDeliver.success
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

      <h1 className="p-1">Order {order?._id || 'No.'}</h1>

      {!!order && (
        <div className="row top">
          <ul className="col-3">
            <ShippingAddressCard address={order.shippingAddress}>
              <StatusBox
                textOf="Delivered"
                statusOf={order.isDelivered}
                when={order.deliveredAt}
              />
            </ShippingAddressCard>

            <PaymentMethodCard payment={order.paymentMethod}>
              <StatusBox
                textOf="Paid"
                statusOf={order.isPaid}
                when={order.paidAt}
              />
            </PaymentMethodCard>

            <OrderItemsCard items={order.orderItems} />
          </ul>

          <ul className="col-1">
            <OrderSumCard order={order} />

            <PaypalCard
              sdkReady={sdkReady}
              successPaymentHandler={successPaymentHandler}
            />

            <AdminDeliveryCard deliverHandler={deliverHandler} />
          </ul>
        </div>
      )}
    </div>
  );
}
