import React, { lazy } from 'react';
import NavBtnControl from '../NavBtnControl';
const DropdownCurrency = lazy(() => import(/* webpackPrefetch: true */ './DropdownCurrency'));

function NavCurrency({ currency }) {
  return (
    <NavBtnControl
      wrapClass="nav__currency mobile--off"
      line2Class="sprite__wrapper"
      line2ExtClass={`sprite flag ${currency}`}
    >
      <DropdownCurrency currency={currency} />
    </NavBtnControl>
  );
}

export default React.memo(NavCurrency);
