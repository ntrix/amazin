import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { orderCreateActions } from 'src/slice/OrderSlice';
import { createOrder } from 'src/apis/orderAPI';
import { TAX } from 'src/constants';

export function useCart(history) {
  const dispatch = useDispatch();
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

  const placeOrderHandler = () => dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));

  useEffect(() => {
    if (!orderCreate || !orderCreate.success) return;
    history.push(`/order/${orderCreate.order._id}`);
    dispatch(orderCreateActions._RESET());
  }, [dispatch, history, orderCreate.order, orderCreate.success]);

  return { cart, orderCreate, placeOrderHandler };
}
