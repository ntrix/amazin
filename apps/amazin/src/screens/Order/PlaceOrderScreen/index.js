import { useCart } from './useCart';
import OrderItemsCard from '../components/OrderItemsCard';
import ShippingAddressCard from '../components/ShippingAddressCard';
import PaymentMethodCard from '../components/PaymentMethodCard';
import CheckoutSteps from '../../Checkout/CheckoutSteps';
import OrderSumCard from '../OrderSumScreen/OrderSumCard';
import LoadingOrError from 'src/components/LoadingOrError';
import Header from 'src/layouts/Header';

export default function PlaceOrderScreen({ history }) {
  const { cart, orderCreate, placeOrderHandler } = useCart(history);
  return (
    <div className="screen--light">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <Header p1 label="Place Order" />
      <div className="row top">
        <ul className="col-2">
          <ShippingAddressCard address={cart.shippingAddress} />
          <PaymentMethodCard payment={cart.paymentMethod} />
          <OrderItemsCard items={cart.cartItems} />
        </ul>

        <ul className="col-1">
          <OrderSumCard order={cart} placeOrderHandler={placeOrderHandler}>
            <LoadingOrError xl statusOf={orderCreate} />
          </OrderSumCard>
        </ul>
      </div>
    </div>
  );
}
