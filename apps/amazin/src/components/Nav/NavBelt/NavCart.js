import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export function NavCart({ to }) {
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="nav__cart flex" tabIndex="2" onClick={() => history.push(to)}>
      <div>
        <div className="cart__counter">{cartItems?.length || 0}</div>
        <div className="sprite__cart"></div>
      </div>
      <div className="pc-low--off">
        <div className="nav__line-1">Shopping-</div>
        <div className="nav__line-2">Basket</div>
      </div>
    </div>
  );
}

export default memo(NavCart);
