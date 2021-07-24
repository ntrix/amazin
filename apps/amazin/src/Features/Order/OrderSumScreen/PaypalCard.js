import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';

import { payOrder } from '../../../Controllers/orderActions';

import LoadingBox from '../../../components/LoadingBox';
import LoadingOrError from '../../../components/LoadingOrError';
import axiosClient from '../../../utils/axiosClient';

function PaypalCard() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);

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

    if (!order?.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, setSdkReady]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return (
    <>
      {!order?.isPaid && (
        <li className="card card__body">
          <div className="min-20">
            <h2>Payment Options</h2>

            {!sdkReady ? (
              <LoadingBox />
            ) : (
              <>
                <LoadingOrError statusOf={orderPay} />

                <PayPalButton
                  amount={order?.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              </>
            )}
          </div>
        </li>
      )}
    </>
  );
}

export default PaypalCard;
