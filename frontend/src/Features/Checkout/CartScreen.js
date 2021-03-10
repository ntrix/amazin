import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart, removeFromCart } from "../../Controllers/cartActions";

import MessageBox from "../../components/MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Your cart is still empty.{" "}
            <Link to="/">
              <b>Let's go back and shopping something first.</b>
            </Link>
          </MessageBox>
        ) : (
          <table className="table">
            <thead></thead>
            <tbody>
              {cartItems.map((item) => (
                <tr className="row" key={item.product}>
                  <td className="tab__w6">
                    <img
                      src={item.image.split("^")[0]}
                      alt={item.name}
                      className="small"
                    ></img>
                  </td>
                  <td className="tab__rest">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </td>
                  <td className="tab__w9">
                    <select
                      className="tab__w6"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="tab__w6">€{item.price}</td>
                  <td className="tab__w9">
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="col-1">
        <div className="card card__body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : €
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className={
                  "primary block" + (!cartItems.length ? " disabled" : "")
                }
                disabled={cartItems.length === 0}
              >
                Proceed to Buy
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
