import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { orderCreateActions } from 'src/slice/OrderSlice';
import { createOrder } from 'src/apis/orderAPI';
import OrderItemsCard from './components/OrderItemsCard';
import ShippingAddressCard from './components/ShippingAddressCard';
import PaymentMethodCard from './components/PaymentMethodCard';
import ListRow from './components/ListRow';
import CheckoutSteps from '../Checkout/CheckoutSteps';
import LoadingOrError from 'src/components/LoadingOrError';
import { TAX } from 'src/constants';

export default function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();
  //fixes cart object is not extensible
  const cart = { ...useSelector((state) => state.cart) };
  if (!cart.paymentMethod) history.push('/payment');

  const orderCreate = useSelector((state) => state.orderCreate);
  cart.itemsPrice = cart.cartItems?.reduce((a, c) => a + c.qty * c.price, 0);

  //max ship price of any items
  const ship = Math.max(...cart.cartItems.map((i) => i.ship));
  // TODO shippingPrice utils
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : ship;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
  cart.taxPrice = cart.totalPrice / (1 + TAX);

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (orderCreate.success) {
      history.push(`/order/${orderCreate.order._id}`);
      dispatch(orderCreateActions._RESET());
    }
  }, [dispatch, history, orderCreate.order, orderCreate.success]);

  return (
    <div className="screen--light">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <h1 className="p-1">Place Order</h1>
      <div className="row top">
        <ul className="col-2">
          <ShippingAddressCard address={cart.shippingAddress} />
          <PaymentMethodCard payment={cart.paymentMethod} />
          <OrderItemsCard items={cart.cartItems} />
        </ul>

        <div className="col-1">
          <ul className="card card__body">
            <h2>Order Summary</h2>
            <ListRow label="Items" toShow={cart.itemsPrice} />
            {cart.cartItems?.length > 0 && (
              <>
                <ListRow label="Shipping" toShow={cart.shippingPrice} />
                <ListRow label={`Before ${TAX * 100}% MwSt.`} toShow={cart.taxPrice} />
                <ListRow label="Order Total" toShow={cart.totalPrice} active />
                <button
                  onClick={placeOrderHandler}
                  className="primary block mt-1"
                  disabled={cart.cartItems?.length === 0}
                >
                  Place Order
                </button>
              </>
            )}

            <LoadingOrError xl statusOf={orderCreate} />
          </ul>
        </div>
      </div>
    </div>
  );
}
