import { useDispatch, useSelector } from 'react-redux';

import { payOrder, deliverOrder } from 'src/apis/orderAPI';
import { usePaypal } from './usePaypal';
import OrderItemsCard from '../components/OrderItemsCard';
import OrderSumCard from './OrderSumCard';
import PaypalCard from './PaypalCard';
import AdminDeliveryCard from './AdminDeliveryCard';
import ShippingAddressCard from '../components/ShippingAddressCard';
import PaymentMethodCard from '../components/PaymentMethodCard';
import LoadingOrError from 'src/components/LoadingOrError';

export default function OrderSumScreen({ match }) {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { sdkReady } = usePaypal(match);

  const paymentHandler = (paymentResult) => dispatch(payOrder(order, paymentResult));

  const deliverHandler = () => dispatch(deliverOrder(order._id));

  return (
    <div className="screen--light">
      <LoadingOrError xl statusOf={{ loading, error }} />

      <h1 className="p-1">Order {order?._id || 'No.'}</h1>
      {!!order && (
        <div className="row top">
          <ul className="col-3">
            <ShippingAddressCard address={order.shippingAddress} order={order} />
            <PaymentMethodCard payment={order.paymentMethod} order={order} />
            <OrderItemsCard items={order.orderItems} />
          </ul>
          <ul className="col-1">
            <OrderSumCard order={order} />
            <PaypalCard sdkReady={sdkReady} successPaymentHandler={paymentHandler} />
            <AdminDeliveryCard deliverHandler={deliverHandler} />
          </ul>
        </div>
      )}
    </div>
  );
}
