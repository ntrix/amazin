import { useHistory } from 'react-router';

import Logo from 'src/img/a.svg';

function NavLogo({ to }: { to: string }) {
  const history = useHistory();

  return (
    <div className="nav__brand phone--off" onClick={() => history.push(to)}>
      <div className="logo__wrapper">
        <img className="logo" src={Logo} alt="logo Amazin" />
        <span className="mobile--off">mazin'</span>
      </div>
    </div>
  );
}

export default NavLogo;
