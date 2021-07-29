import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signout } from '../../../Controllers/userActions';
import '../nav.css';

import CartLinkBtn from './CartLinkBtn';
import LocatorLinkBtn from './LocatorLinkBtn';
import LogoLinkBtn from './LogoLinkBtn';
import NavBtnControl from './NavBtnControl';
import NavDropdownBtn from './NavDropdownBtn';
import DropdownMenu from './DropdownMenu';
import DropdownMenuCurrency from './DropdownMenuCurrency';
import {
  signinMenuTemplate,
  userMenuCreator,
  sellerMenuCreator,
  adminMenuTemplate
} from './navBeltTemplate';
import SearchBox from '../SearchBox';
import { useShadow } from '../../../utils/useShadow';
import { savePath, shortName } from '../../../utils';
import { KEY } from '../../../constants';

export function _HeaderNavBelt({ currency }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const { shadowOf, setShadowOf, clearShadow } = useShadow('');

  return (
    <div className="nav-belt row">
      <LogoLinkBtn className="phone--off" to="/" />

      <LocatorLinkBtn to="/map" onClick={savePath()} />

      <SearchBox />

      <NavBtnControl
        classes={[
          'nav__currency mobile--off',
          '',
          'sprite__wrapper',
          `sprite flag ${currency}`
        ]}
        onMouseEnter={() => setShadowOf(KEY.CURRENCY)}
        onMouseLeave={clearShadow}
      >
        <DropdownMenuCurrency currency={currency} />
      </NavBtnControl>

      {!userInfo && (
        <NavBtnControl label={['Hello, Sign in', 'Account', ' & Lists']}>
          <DropdownMenu show={shadowOf} ddMenuList={signinMenuTemplate} />
        </NavBtnControl>
      )}

      {!!userInfo && (
        <NavBtnControl
          label={[`Hello, ${shortName(userInfo, 7)}`, 'Account', ' & Lists']}
        >
          <DropdownMenu
            show={shadowOf}
            ddMenuList={userMenuCreator(userInfo, () => dispatch(signout()))}
          />
        </NavBtnControl>
      )}

      {!!userInfo?.isSeller && (
        <NavBtnControl classes={['nav__seller']} label={['Seller', 'Desk']}>
          <DropdownMenu
            show={shadowOf}
            ddMenuList={sellerMenuCreator(userInfo)}
          />
        </NavBtnControl>
      )}

      {!!userInfo?.isAdmin && (
        <NavBtnControl
          classes={['nav__admin phone--off']}
          label={['Admin', 'Tools']}
        >
          <DropdownMenu show={shadowOf} ddMenuList={adminMenuTemplate} />
        </NavBtnControl>
      )}

      <NavDropdownBtn
        disabled={!!'TODO'}
        classes={['nav__return tablet--off']}
        label={['Return', '& Orders']}
      />

      <CartLinkBtn to="/cart" counter={cartItems.length} />
    </div>
  );
}

const HeaderNavBelt = React.memo(_HeaderNavBelt);
export default HeaderNavBelt;
