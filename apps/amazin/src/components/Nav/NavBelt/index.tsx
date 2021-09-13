import { memo } from 'react';

import NavLogo from './NavLogo';
import NavLocator from './NavLocator';
import NavSearch from '../NavSearch';
import DropdownButton from './NavButton/DropdownButton';
import NavCurrency from './NavCurrency';
import NavUser from './NavUser';
import NavCart from './NavCart';

function NavBelt() {
  return (
    <div className="nav-belt row">
      <NavLogo to="/" />
      <NavLocator to="/map" />
      <NavSearch />
      <NavCurrency />
      <NavUser />
      <DropdownButton disabled={!!'TODO'} wrapClass="nav__return tablet--off" labels="Return^& Orders" />
      <NavCart to="/cart" />
    </div>
  );
}

export default memo(NavBelt);
