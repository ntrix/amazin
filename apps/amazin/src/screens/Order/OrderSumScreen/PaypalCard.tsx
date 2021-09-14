import { useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';

import LoadingBox from 'src/components/LoadingBox';
import LoadingOrError from 'src/components/LoadingOrError';

type PropType = {
  sdkReady: boolean;
  successPaymentHandler: FnType;
};

export default function PaypalCard({ sdkReady, successPaymentHandler }: PropType) {
  const { order } = useSelector((state: AppState) => state.orderDetails);
  const orderPay = useSelector((state: AppState) => state.orderPay);

  if (!order || order.isPaid) return null;

  return (
    <li className="card card__body">
      <div className="min-20">
        <h2>Payment Options</h2>
        {!sdkReady ? (
          <LoadingBox />
        ) : (
          <>
            <LoadingOrError statusOf={orderPay} />

            <PayPalButton amount={order?.totalPrice} onSuccess={successPaymentHandler} />
          </>
        )}
      </div>
    </li>
  );
}
