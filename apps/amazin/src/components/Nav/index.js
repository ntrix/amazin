import './nav.css';
import NavBelt from './NavBelt';
import NavMain from './NavMain';

function Nav({ currency }) {
  return (
    <header id="nav-bar">
      <NavBelt currency={currency} />
      <NavMain />
    </header>
  );
}
export default Nav;
