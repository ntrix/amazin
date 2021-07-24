import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { orderCreateActions } from './OrderSlice';
import { createOrder } from '../../Controllers/orderActions';

import CheckoutSteps from '../Checkout/CheckoutSteps';
import { TAX } from '../../constants';
import { getImgUrl, pipe } from '../../utils';
import LoadingOrError from '../../components/LoadingOrError';
import ListRow from './components/ListRow';

export default function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();
  //fixes cart object is not extensible
  const cart = { ...useSelector((state) => state.cart) };
  if (!cart.paymentMethod) history.push('/payment');

  const orderCreate = useSelector((state) => state.orderCreate);

  cart.itemsPrice = cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  //max ship price of any items
  const ship = Math.max(...cart.cartItems.map((i) => i.ship));
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
          <li>
            <div className="card card__body">
              <h2>Shipping</h2>

              <p>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address: </strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </p>
            </div>
          </li>

          <li>
            <div className="card card__body">
              <h2>Payment</h2>

              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </li>

          <li>
            <div className="card card__body">
              <h2>Order Items</h2>

              <ul>
                {cart.cartItems.map((item, id) => (
                  <li key={id}>
                    <div className="row">
                      <div>
                        <img
                          src={getImgUrl(
                            item.product,
                            item.image.split('^')[0]
                          )}
                          alt={item.name}
                          className="small"
                        ></img>
                      </div>

                      <div className="min-20">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div>
                        {item.qty} x {pipe.showPrice(item.price)} =
                        {' ' + pipe.showPrice(item.qty * item.price)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
        <div className="col-1">
          <ul className="card card__body">
            <h2>Order Summary</h2>

            <ListRow label="Items" toShow={cart.itemsPrice} />

            {cart.cartItems.length > 0 && (
              <>
                <ListRow label="Shipping" toShow={cart.shippingPrice} />

                <ListRow
                  label={`Before ${TAX * 100}% MwSt.`}
                  toShow={cart.taxPrice}
                />

                <ListRow label="Order Total" toShow={cart.totalPrice} active />

                <button
                  onClick={placeOrderHandler}
                  className="primary block mt-1"
                  disabled={cart.cartItems.length === 0}
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
