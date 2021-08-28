import React from 'react';
import { useSelector } from 'react-redux';
import '../nav.css';
import LogoLinkBtn from './LogoLinkBtn';
import LocatorLinkBtn from './LocatorLinkBtn';
import SearchBox from '../SearchBox';
import NavDropdownBtn from './NavDropdownBtn';
import CartLinkBtn from './CartLinkBtn';
import { useShadow } from '../../../hooks/useShadow';
import { savePath } from '../../../utils';
import { SHADOW } from 'src/constants';
import NavCurrency from './NavCurrency';
import NavUser from './NavUser';

function NavBelt({ currency }) {
  const { cartItems } = useSelector((state) => state.cart);
  const { shadowOf, setShadowOf } = useShadow();
  return (
    <div className="nav-belt row">
      <LogoLinkBtn to="/" />
      <LocatorLinkBtn to="/map" onClick={savePath()} />
      <SearchBox />
      <NavCurrency currency={currency} />
      <NavUser show={SHADOW.NAV_DD === shadowOf} clearShadow={setShadowOf} />
      <NavDropdownBtn disabled={!!'TODO'} wrapClass="nav__return tablet--off" labels="Return^& Orders" />
      <CartLinkBtn to="/cart" counter={cartItems.length} />
    </div>
  );
}
export default React.memo(NavBelt);
