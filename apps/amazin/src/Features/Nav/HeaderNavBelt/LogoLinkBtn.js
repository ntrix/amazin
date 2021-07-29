import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../img/a.svg';

function LogoLinkBtn(props) {
  return (
    <Link {...props}>
      <div className="nav__brand">
        <img className="logo" src={Logo} alt="logo Amazin" />
        <span className="mobile--off">mazin'</span>
      </div>
    </Link>
  );
}

export default LogoLinkBtn;
