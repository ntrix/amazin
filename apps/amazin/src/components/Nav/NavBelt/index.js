import { memo } from 'react';
import NavLogo from './NavLogo';
import NavLocator from './NavLocator';
import NavSearch from '../NavSearch';
import NavDropdownBtn from './NavDropdownBtn';
import NavCurrency from './NavCurrency';
import NavUser from './NavUser';
import NavCart from './NavCart';

function NavBelt({ currency }) {
  return (
    <div className="nav-belt row">
      <NavLogo to="/" />
      <NavLocator to="/map" />
      <NavSearch />
      <NavCurrency currency={currency} />
      <NavUser />
      <NavDropdownBtn disabled={!!'TODO'} wrapClass="nav__return tablet--off" labels="Return^& Orders" />
      <NavCart to="/cart" />
    </div>
  );
}
export default memo(NavBelt);
