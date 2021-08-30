import { memo, lazy } from 'react';

import NavButton from '../NavButton';
const DropdownCurrency = lazy(() => import(/* webpackPrefetch: true */ './DropdownCurrency'));

function NavCurrency({ currency }) {
  return (
    <NavButton
      wrapClass="nav__currency mobile--off"
      line2Class="sprite__wrapper"
      line2ExtClass={`sprite flag ${currency}`}
    >
      <DropdownCurrency currency={currency} />
    </NavButton>
  );
}

export default memo(NavCurrency);
