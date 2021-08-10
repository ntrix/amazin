import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../img/a.svg';

function LogoLinkBtn(props) {
  return (
    <Link {...props} className="nav__brand phone--off">
      <div className="logo__wrapper">
        <img className="logo" src={Logo} alt="logo Amazin" />
        <span className="mobile--off">mazin'</span>
      </div>
    </Link>
  );
}

export default LogoLinkBtn;
