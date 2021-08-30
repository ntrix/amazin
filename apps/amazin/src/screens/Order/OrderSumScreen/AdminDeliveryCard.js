import { useSelector } from 'react-redux';

import LoadingOrError from 'src/components/LoadingOrError';

export default function AdminDeliveryCard({ deliverHandler }) {
  const { userInfo } = useSelector((state) => state.userSignin);
  const { order } = useSelector((state) => state.orderDetails);
  const orderDeliver = useSelector((state) => state.orderDeliver);

  const isTestSeller = userInfo?.isSeller && process.env.REACT_APP_ENVIRONMENT === 'development';

  if (!order?.isDelivered && ((userInfo?.isAdmin && order?.isPaid) || isTestSeller))
    return (
      <li className="card card__body">
        <div className="min-20">
          <LoadingOrError statusOf={orderDeliver} />

          <button type="button" className="primary block" onClick={deliverHandler}>
            Deliver Order
          </button>
        </div>
      </li>
    );

  return null;
}
