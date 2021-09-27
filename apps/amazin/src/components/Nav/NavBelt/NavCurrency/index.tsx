import { memo, lazy } from 'react';
import { useShadow } from 'src/hooks/useShadow';

import NavButton from '../NavButton';
const DropdownCurrency: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ './DropdownCurrency'));

function NavCurrency() {
  const { currency } = useShadow();

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
