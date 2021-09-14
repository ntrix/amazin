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
import Header from 'src/layouts/Header';

export default function OrderSumScreen({ match }: RouteProps<MatchParams>) {
  const dispatch = useDispatch();
  const { order, loading, error }: OrderDetailType = useSelector((state: AppState) => state.orderDetails);
  const { sdkReady } = usePaypal({ match });

  const paymentHandler = (paymentResult: PaymentResultType) => dispatch(payOrder(order, paymentResult));

  const deliverHandler = () => dispatch(deliverOrder(order._id));

  return (
    <div className="screen--light">
      <LoadingOrError xl statusOf={{ loading, error }} />

      <Header p1>Order {order?._id || 'No.'}</Header>
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
