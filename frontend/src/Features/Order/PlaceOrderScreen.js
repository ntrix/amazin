import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { orderCreateActions } from "./OrderSlice";
import { createOrder } from "../../Controllers/orderActions";

import CheckoutSteps from "../Checkout/CheckoutSteps";
import { TAX } from "../../constants";
import { getImgUrl, pipe } from "../../utils";
import LoadingOrError from "../../components/LoadingOrError";

export default function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();
  //fixes cart object is not extensible
  const cart = { ...useSelector((state) => state.cart) };
  if (!cart.paymentMethod) history.push("/payment");

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

      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card__body">
                <h2>Shipping</h2>

                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
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
                              item.image.split("^")[0]
                            )}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>

                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x {pipe.showPrice(item.price)} =
                          {" " + pipe.showPrice(item.qty * item.price)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card__body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>

              <li>
                <div className="row">
                  <div>Items</div>
                  <div>{pipe.showPrice(cart.itemsPrice)}</div>
                </div>
              </li>

              {cart.cartItems.length > 0 && (
                <>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>
                        {cart.shippingPrice
                          ? pipe.showPrice(cart.shippingPrice)
                          : "Free Ship"}
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="row">
                      <div>Before {TAX * 100}% MwSt.</div>
                      {pipe.showPrice(cart.taxPrice)}
                    </div>
                  </li>

                  <li>
                    <div className="row">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>{pipe.showPrice(cart.totalPrice)}</strong>
                      </div>
                    </div>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={placeOrderHandler}
                      className="primary block"
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </button>
                  </li>
                </>
              )}

              <LoadingOrError xl statusOf={orderCreate} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
