import React from 'react';
import { Link } from 'react-router-dom';

function LocatorLinkBtn(props) {
  return (
    <Link className="nav__locator flex" {...props} aria-label="Address Locator">
      <div className="sprite__locator"></div>
      <div className="tablet--off">
        <div className="nav__line-1">Deliver to your</div>
        <div className="nav__line-2">Location?</div>
      </div>
    </Link>
  );
}

export default LocatorLinkBtn;
