import { useDispatch, useSelector } from 'react-redux';

import { savePaymentMethod } from 'src/apis/cartAPI';
import CheckoutSteps from './CheckoutSteps';
import Form from 'src/layouts/Form';
import { useSafeState } from 'src/hooks/useSafeState';
import CustomRadio from 'src/components/CustomRadio';

export default function PaymentMethodScreen({ history }: RouteProps<MatchParams>) {
  const dispatch = useDispatch();
  const { shippingAddress, cartItems }: CartType = useSelector((state: AppState) => state.cart);
  if (!shippingAddress.address) history.push('/shipping');
  const [paymentMethod, setPaymentMethod] = useSafeState<PaymentMethodType>('Paypal');

  const submitHandler = (e: EventType) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push(cartItems.length ? '/place-order' : '/cart');
  };

  return (
    <div className="screen--light">
      <CheckoutSteps step1 step2 step3 />
      <Form header="Payment Method" onSubmit={submitHandler} btn="Continue">
        <CustomRadio name="paymentMethod" checked text="Paypal" hook={['Paypal', setPaymentMethod]} />
        <CustomRadio name="paymentMethod" text="Stripe" hook={['Stripe', setPaymentMethod]} />
      </Form>
    </div>
  );
}
