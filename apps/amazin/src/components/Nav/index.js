import './nav.css';
import NavBelt from './NavBelt';
import HeaderNavMain from './HeaderNavMain';

function Nav({ currency }) {
  return (
    <header id="nav-bar">
      <NavBelt currency={currency} />
      <HeaderNavMain />
    </header>
  );
}
export default Nav;
