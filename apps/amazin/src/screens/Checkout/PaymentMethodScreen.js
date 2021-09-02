import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { savePaymentMethod } from 'src/apis/cartAPI';
import CheckoutSteps from './CheckoutSteps';
import CustomRadio from 'src/components/CustomRadio';
import Button from 'src/components/Button';

export default function PaymentMethodScreen({ history }) {
  const dispatch = useDispatch();
  const { shippingAddress, cartItems } = useSelector((state) => state.cart);
  if (!shippingAddress.address) history.push('/shipping');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push(cartItems.length ? '/place-order' : '/cart');
  };

  return (
    <div className="screen--light">
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <h1>Payment Method</h1>

        <CustomRadio name="paymentMethod" checked text="PayPal" hook={['PayPal', setPaymentMethod]} />
        <CustomRadio name="paymentMethod" text="Stripe" hook={['Stripe', setPaymentMethod]} />

        <Button primary fill type="submit" label="Continue" />
      </form>
    </div>
  );
}
