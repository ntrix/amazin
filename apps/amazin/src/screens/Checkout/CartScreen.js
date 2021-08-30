import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addToCart, removeFromCart } from 'src/apis/cartAPI';
import { getImgUrl, pipe } from 'src/utils';
import MessageBox from 'src/components/MessageBox';
import Button from 'src/components/Button';

export default function CartScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;

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
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <div className="screen--light row top">
      <div className="col-2">
        <h1 className="p-1">Shopping Cart</h1>
        <MessageBox msg={error} variant="danger" />

        {cartItems.length === 0 ? (
          <MessageBox show>
            Your cart is still empty.{' '}
            <Link to="/">
              <b>Let's go back and shopping something first.</b>
            </Link>
          </MessageBox>
        ) : (
          <table className="table">
            <thead></thead>
            <tbody>
              {cartItems.map((item, id) => (
                <tr className="row" key={id}>
                  <td className="tab__w6">
                    <Link to={`/product/${item.product}`}>
                      <img
                        src={getImgUrl(item.product, item.image.split('^')[0])}
                        alt={item.name}
                        className="small"
                      ></img>
                    </Link>
                  </td>
                  <td className="tab__rest">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </td>
                  <td className="tab__w9">
                    <div className="select-wrapper">
                      <div className="sprite__caret xl"></div>
                      <select
                        className="tab__w6"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, -item.qty + Number(e.target.value)))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="tab__w6">{pipe.showPrice(item.price)}</td>
                  <td className="tab__w9">
                    <Button label="Delete" onClick={() => removeFromCartHandler(item.product)} />
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
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :{' '}
                {pipe.showPrice(cartItems.reduce((a, c) => a + c.price * c.qty, 0))}
              </h2>
            </li>
            <li>
              <Button
                primary
                label="Proceed to Buy"
                className={`block ${cartItems.length ? '' : 'disabled'}`}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
