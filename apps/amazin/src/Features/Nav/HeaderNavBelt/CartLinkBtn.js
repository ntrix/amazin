import { Link } from 'react-router-dom';

function CartLinkBtn({
  counter,
  LinkTo = (props) => <Link {...props} />,
  ...rest
}) {
  return (
    <LinkTo className="nav__cart flex" tabIndex="2" {...rest}>
      <div>
        <div className="cart__counter">{counter}</div>
        <div className="sprite__cart"></div>
      </div>
      <div className="pc-low--off">
        <div className="nav__line-1">Shopping-</div>
        <div className="nav__line-2">Basket</div>
      </div>
    </LinkTo>
  );
}

export default CartLinkBtn;
