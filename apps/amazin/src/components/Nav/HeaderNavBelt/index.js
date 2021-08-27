import React, { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signout } from '../../../apis/userAPI';
import '../nav.css';

import LogoLinkBtn from './LogoLinkBtn';
import LocatorLinkBtn from './LocatorLinkBtn';
import SearchBox from '../SearchBox';
import NavBtnControl from './NavBtnControl';
import NavDropdownBtn from './NavDropdownBtn';
import CartLinkBtn from './CartLinkBtn';
import {
  signinMenuTemplate,
  userMenuCreator,
  sellerMenuCreator,
  adminMenuTemplate
} from './navBeltTemplate';
import { useShadow } from '../../../hooks/useShadow';
import { savePath, shortName } from '../../../utils';
import { SHADOW } from 'src/constants';

const DropdownMenu = lazy(() =>
  import(/* webpackPrefetch: true */ './DropdownMenu')
);
const DropdownMenuCurrency = lazy(() =>
  import(/* webpackPrefetch: true */ './DropdownMenuCurrency')
);

export function _HeaderNavBelt({ currency }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const { shadowOf, setShadowOf } = useShadow();
  const isDropped = SHADOW.NAV_DD === shadowOf;

  return (
    <div className="nav-belt row">
      <LogoLinkBtn to="/" />

      <LocatorLinkBtn to="/map" onClick={savePath()} />

      <SearchBox />

      <NavBtnControl
        wrapClass="nav__currency mobile--off"
        line2Class="sprite__wrapper"
        line2ExtClass={`sprite flag ${currency}`}
      >
        <DropdownMenuCurrency currency={currency} />
      </NavBtnControl>

      {!userInfo && (
        <NavBtnControl labels="Hello, Sign in^Account^ & Lists">
          <DropdownMenu
            show={isDropped}
            ddMenuList={signinMenuTemplate}
            clearShadow={setShadowOf}
          />
        </NavBtnControl>
      )}

      {!!userInfo && (
        <NavBtnControl
          labels={`Hello, ${shortName(userInfo?.name, 7)}^Account^ & Lists`}
        >
          <DropdownMenu
            show={isDropped}
            ddMenuList={userMenuCreator(userInfo, () => dispatch(signout()))}
            clearShadow={setShadowOf}
          />
        </NavBtnControl>
      )}

      {!!userInfo?.isSeller && (
        <NavBtnControl wrapClass="nav__seller" labels="Seller^Desk">
          <DropdownMenu
            show={isDropped}
            ddMenuList={sellerMenuCreator(userInfo)}
            clearShadow={setShadowOf}
          />
        </NavBtnControl>
      )}

      {!!userInfo?.isAdmin && (
        <NavBtnControl wrapClass="nav__admin phone--off" labels="Admin^Tools">
          <DropdownMenu
            show={isDropped}
            ddMenuList={adminMenuTemplate}
            clearShadow={setShadowOf}
          />
        </NavBtnControl>
      )}

      <NavDropdownBtn
        disabled={!!'TODO'}
        wrapClass="nav__return tablet--off"
        labels="Return^& Orders"
      />

      <CartLinkBtn to="/cart" counter={cartItems.length} />
    </div>
  );
}

const HeaderNavBelt = React.memo(_HeaderNavBelt);
export default HeaderNavBelt;
