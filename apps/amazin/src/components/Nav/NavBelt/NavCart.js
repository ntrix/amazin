import { memo } from 'react';
import { useSelector } from 'react-redux';
import NavBtnFacade from './NavButton/NavBtnFacade';

const MAX_QTY = 9999; // noway :)

export function NavCart({ to }) {
  const { cartItems } = useSelector((state) => state.cart);
  const count = Math.min(
    cartItems.reduce((a, c) => a + c.qty, 0),
    MAX_QTY
  );

  return (
    <NavBtnFacade label="cart" to={to} className="pc-low--off" text="Shopping-^Basket">
      <div className={`cart__counter${count > 99 ? ' --js-3digits' : ''}`}>{count}</div>
    </NavBtnFacade>
  );
}

export default memo(NavCart);
