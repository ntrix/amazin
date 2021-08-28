import { memo } from 'react';
import '../nav.css';
import NavLogo from './NavLogo';
import NavLocator from './NavLocator';
import SearchBox from '../SearchBox';
import NavDropdownBtn from './NavDropdownBtn';
import NavCurrency from './NavCurrency';
import NavUser from './NavUser';
import NavCart from './NavCart';

function NavBelt({ currency }) {
  return (
    <div className="nav-belt row">
      <NavLogo to="/" />
      <NavLocator to="/map" />
      <SearchBox />
      <NavCurrency currency={currency} />
      <NavUser />
      <NavDropdownBtn disabled={!!'TODO'} wrapClass="nav__return tablet--off" labels="Return^& Orders" />
      <NavCart to="/cart" />
    </div>
  );
}
export default memo(NavBelt);
