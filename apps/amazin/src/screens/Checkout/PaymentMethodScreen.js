import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { savePaymentMethod } from 'src/apis/cartAPI';
import CheckoutSteps from './CheckoutSteps';
import CustomRadio from 'src/components/CustomRadio';

export default function PaymentMethodScreen({ history }) {
  const dispatch = useDispatch();
  const { shippingAddress, cartItems } = useSelector((state) => state.cart);
  if (!shippingAddress.address) history.push('/shipping');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    if (cartItems.length) history.push('/place-order');
    else history.push('/cart');
  };

  return (
    <div className="screen--light">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>

        <CustomRadio name="paymentMethod" checked text="PayPal" hook={['PayPal', setPaymentMethod]} />

        <CustomRadio name="paymentMethod" text="Stripe" hook={['Stripe', setPaymentMethod]} />

        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
