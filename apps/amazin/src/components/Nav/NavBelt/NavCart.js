import { memo } from 'react';
import { useSelector } from 'react-redux';
import { MAX_2DIGITS, MAX_CART_QTY } from 'src/constants';
import NavBtnFacade from './NavButton/NavBtnFacade';

export function NavCart({ to }) {
  const { cartItems } = useSelector((state) => state.cart);
  const count = Math.min(
    cartItems.reduce((a, c) => a + c.qty, 0),
    MAX_CART_QTY
  );

  return (
    <NavBtnFacade label="cart" to={to} className="pc-low--off" text="Shopping-^Basket">
      <div className={`cart__counter${count > MAX_2DIGITS ? ' --js-3digits' : ''}`}>{count}</div>
    </NavBtnFacade>
  );
}

export default memo(NavCart);
