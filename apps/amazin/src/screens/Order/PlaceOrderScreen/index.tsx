import { useCart } from './useCart';
import CheckoutSteps from 'src/components/Checkout/CheckoutSteps';
import Header from 'src/layouts/Header';
import OrderItemsCard from '../components/OrderItemsCard';
import ShippingAddressCard from '../components/ShippingAddressCard';
import PaymentMethodCard from '../components/PaymentMethodCard';
import OrderSumCard from '../OrderSumScreen/OrderSumCard';
import LoadingOrError from 'src/components/LoadingOrError';

export default function PlaceOrderScreen({ history }: RouteProps<MatchParams>) {
  const { cart, orderCreate, placeOrderHandler } = useCart(history);

  return (
    <div className="screen--light">
      <CheckoutSteps step1 step2 step3 step4 />

      <Header p1 label="Place Order" />
      <div className="row top">
        <ul className="col-2">
          <ShippingAddressCard address={cart.shippingAddress} />
          <PaymentMethodCard payment={cart.paymentMethod} />
          <OrderItemsCard items={cart.cartItems} />
        </ul>

        <ul className="col-1">
          <OrderSumCard order={cart as OrderType} placeOrderHandler={placeOrderHandler}>
            <LoadingOrError xl statusOf={orderCreate} />
          </OrderSumCard>
        </ul>
      </div>
    </div>
  );
}
