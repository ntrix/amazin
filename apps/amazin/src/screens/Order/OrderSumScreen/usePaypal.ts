import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axiosClient from 'src/apis/axiosClient';
import { detailsOrder } from 'src/apis/orderAPI';
import { orderDeliverActions, orderPayActions } from 'src/slice/OrderSlice';

function createScript(data: unknown, setSdkReady: SetStateType<boolean>) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
  script.async = true;
  script.onload = () => {
    setSdkReady(true);
  };
  document.body.appendChild(script);
}

export function usePaypal(match: MatchProp): {sdkReady: error;
}  {
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const { order }: OrderDetailType = useSelector((state: AppState) => state.orderDetails);
  const orderPay: StatusType = useSelector((state: AppState) => state.orderPay);
  const orderDeliver: StatusType = useSelector((state: AppState) => state.orderDeliver);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalSdk = async () => {
      const { data } = await axiosClient.get('/api/config/paypal');
      createScript(data, setSdkReady);
    };

    if (!order || orderPay.success || orderDeliver.success || order._id !== orderId) {
      dispatch(orderPayActions._RESET(''));
      dispatch(orderDeliverActions._RESET(''));
      dispatch(detailsOrder(orderId));
      return;
    }
    if (order?.isPaid) return;
    if (window.paypal) setSdkReady(true);
    else addPayPalSdk();
  }, [dispatch, order, setSdkReady, orderId, orderPay.success, orderDeliver.success]);

  return { sdkReady };
}
